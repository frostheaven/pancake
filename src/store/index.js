import Vue from 'vue'
import Vuex from 'vuex'
//后端地址注册
import axios from '@/common/axios/axios'
//引入popUp弹窗
import popUp from '@/common/pop-up-settings/pop-up-settings'
//引入路由
import router from '@/router/index'
// 考虑到vuex刷新后会初始化，导致页面渲染数据丢失，故引入此插件，将vuex数据存在本地
import createPersistedState from "vuex-persistedstate";
//引入sm2加密算法
import sm2 from 'sm-crypto'
//引入同态加密算法
import * as paillierBigint from 'paillier-bigint'
// 引入哈希函数
import { sha256 } from 'js-sha256'
//引入bigInt
import bigInt from 'big-integer'
//引入bcrypt
import bcrypt from 'bcryptjs'
//引入标准加密库
import CryptoJS from 'crypto-js'
import crypto from 'crypto'
//引入bigint-crypto-utils库
import * as bcu from 'bigint-crypto-utils'
//引入elliptic
import elliptic from 'elliptic'


Vue.use(Vuex)

//交易密码系统
const tradeCryptogram = {
    namespace: true,
    state: {
        //双线性配对初始阶
        q: bigInt('8780710799663312522437781984754049815806883199414208211028653399266475630880222957078625179422662221423155858769582317459277713367317481324925129998224791'),
        //生成元G
        G: bigInt('19019691675762435998103146649295918376082454195432890775992508201172058058691535876294989858313560238199174941642968582405365532300545127124346729818476928713872282170877572792182139879442603108806548455217959715861407208920964225259529397268458667789434965739956545733509193740163438855632454656819393138504'),
        //Px, Py, PT为监管方公钥
        Px: bigInt('28ce84486b8f8aa4fb19959e97415635d7c98186e798929b0b595e1dafc1d047c130a15650d407d80742ba27ab3cf481ba5ce054405190ac30fc76a7ad7061cd', 16),
        Py: bigInt('2f78bf069bc96ef44506b878cbbb8af7c620116ead92cf63f212ea0c7e35db91ac5d8a64a43e622f2c9f1663802edb3eebec21c14894b73df66df2c2b73cf87c', 16),
        PT: bigInt('644725d4d18723c3faef19a8fb6feb030c38aa680d1ea4a1e8369344bf0301b4602e4a9e7d92d30c4e218b0a5e14ab98a25acf395f249aae70179d93673318f9', 16),
        //paillier同态加密算法数据
        paillierPairing: {
            gA: '', gB: '',
            nA: '', nB: '',
            priceA: '', priceB: '',
            countA: '', countB: '',
        },
        //加密临时变量
        tempVariables: {
            k1: '',
            k2: '',
            t_B: ''
        },
        //双线性配对算法数据（类型：string，16进制）
        billinearPairing: {
            publicKeyA: '', publicKeyB: '', //买卖双方公钥
            addrA: '', addrB: '',
            Rtx: '',
            C1: '', C2: '', C3: '',
            h: '',
            Wk1: '', Wk2: '', Wt: ''
        },
        //解密临时数据
        /**
         * 
         * @param {Array} RtxArr addrA, addrB, id, rtx [实际上是Rtx]
         * @param {String} pk 用户自己的公钥
         * @param {Array} correspondMyPurchaseArrID 验证通过的购买
         * @param {Array} correspondSellArrID 验证通过的我的出售
         * 
        */
        decryptVariables: {
            RtxArr: [],
            pk: '',
            listID: {
                correspondMyPurchaseArrID: [],
                correspondSellArrID: []
            },
        }
    },
    mutations: {
        //清空加密数据
        clearEncryptData(state) {
            state.paillierPairing = {
                gA: '', gB: '',
                nA: '', nB: '',
                priceA: '', priceB: '',
                countA: '', countB: '',
            }
            state.tempVariables = {
                k1: '',
                k2: '',
                t_B: ''
            }
            state.billinearPairing = {
                publicKeyA: '', publicKeyB: '', //买卖双方公钥
                addrA: '', addrB: '',
                Rtx: '',
                C1: '', C2: '', C3: '',
                h: '',
                Wk1: '', Wk2: '', Wt: ''
            }
        },
        //清空解密数据
        clearDecryptData(state) {
            state.decryptVariables = {
                RtxArr: [], 
                pk: '',
                listID: {
                    correspondMyPurchaseArrID: [],
                    correspondSellArrID: []
                },
            }
        },
    },
    actions: {
        //验证私钥（判断用户余额是否支持购买）
        async checkPrivKeyToPurchase({dispatch}, project) {
            if(localStorage.getItem('mixSk') === null){
                popUp.install().popMsgOnlyConfirm('获取私钥失败，请尝试重新登录！')
            }else {
                const mixSk = localStorage.getItem('mixSk')
                const lambda = mixSk.split('||')[1]
                const mu = mixSk.split('||')[2]
                const hsk = sha256(lambda + '||' + mu) //应当与注册时传入一致
                await axios({
                    method: 'get',
                    url: 'checkSk',
                    params: {
                        hsk: hsk
                    }
                }).then((res) => {
                    if(res.data.code === 200){
                        const data = res.data.data
                        const encryptedBalance = data.balance //获取用户同态加密的余额
                        if(encryptedBalance == null)popUp.install().popMsgOnlyConfirm('余额获取失败，请稍后重试！')
                        else {
                            const n = bigInt(data.n, 16)
                            const g = bigInt(data.g, 16)
                            //同态解密
                            const publicKey = new paillierBigint.PublicKey(n.value, g.value)
                            const privateKey = new paillierBigint.PrivateKey(bigInt(lambda, 16).value, bigInt(mu, 16).value, publicKey)

                            const balance = Number(privateKey.decrypt(bigInt(encryptedBalance, 10).value)) / 1000
                            const totalPrice = project.price * project.count
                            if(balance < totalPrice){
                                popUp.install().popMsgOnlyConfirm('用户余额不足！当前余额：' + balance)
                            }else dispatch('getMutualPubKey', project)
                        }
                        // console.log('skCheckDecryptBalance', balance)
                    }else{
                        popUp.install().popMsgOnlyConfirm('用户私钥错误，请重试！')
                    }
                    // console.log('skCheck',res)
                }).catch((err) => {
                    popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后重试！')
                    console.log(err)
                })
            }
        },
        /**
         * @method getMutualPubKey 此后会连续调用加密函数并提交交易订单
         * 
         * @param {object} project 购电项目信息
         */
        //获取买卖双方公钥
        async getMutualPubKey({state, dispatch}, project) {
            await axios({
                method: "get",
                url: "getPk",
                params: {
                    projectName: project.projectName
                }
            }).then((res) => {
                const data = res.data.data
                state.billinearPairing.publicKeyA = data.pkA
                state.billinearPairing.publicKeyB = data.pkB
                state.paillierPairing.gA = data.gA
                state.paillierPairing.gB = data.gB
                state.paillierPairing.nA = data.nA
                state.paillierPairing.nB = data.nB
                dispatch('GenOTA', project)
                // console.log('changedState',state.billinearPairing, state.paillierPairing)
                // console.log('getMutualPubKey', res)
            }).catch((err) => {
                popUp.install().popMsgOnlyConfirm('获取公钥失败，请稍后再试！')
                console.log(err)
            })
        },
        //一次性地址生成，产生addrA,addrB，分别由A,B的公钥加密
        async GenOTA({state, dispatch}, project) {
            const G = bigInt(state.G)
            const q = bigInt(state.q)
            const rtx = bigInt.randBetween(1, q.minus(1))
            let Rtx = G.times(rtx).mod(q)
            //A公钥加密
            const A = bigInt(state.billinearPairing.publicKeyA, 16)
            let t_A = bigInt(sha256.create(rtx.times(A)), 16).mod(q) //此处应当与一次性地址验证的sha256匹配
            let P_A = G.times(t_A).add(A).mod(q)

            state.billinearPairing.addrA = P_A.toString(16)

            // console.log('pkB' ,state.billinearPairing.publicKeyB)
            //B公钥加密
            const B = bigInt(state.billinearPairing.publicKeyB, 16)    
            let t_B = bigInt(sha256.create(rtx.times(B)), 16).mod(q) //此处应当与一次性地址验证的sha256匹配
            state.tempVariables.t_B = t_B.toString(16)
            let P_B = G.times(t_B).add(B).mod(q)

            state.billinearPairing.addrB = P_B.toString(16)
            state.billinearPairing.Rtx = Rtx.toString(16)
            
            //#region
            // console.log('A', A.toString(16))
            // console.log('B',B.toString(16))
            // console.log('rtx', rtx.toString(16))
            // console.log('Rtx', Rtx.toString(16))
            // console.log('t_A', t_A.toString(16))
            // console.log('P_A',P_A.toString(16))
            // console.log('t_B', t_B.toString(16))
            // console.log('P_B',P_B.toString(16))
            // console.log('generalAddress A&B', state.billinearPairing.addrA, state.billinearPairing.addrB)
            //#endregion

            await dispatch('encryptPriceAndCount', project)

        },
        //同态加密price, count
        async encryptPriceAndCount({state, dispatch}, project) {
            const nA = bigInt(state.paillierPairing.nA, 16)
            const nB = bigInt(state.paillierPairing.nB, 16)
            const gA = bigInt(state.paillierPairing.gA, 16)
            const gB = bigInt(state.paillierPairing.gB, 16)
            // console.log('nA',state.paillierPairing.nA)
            // console.log('gA',state.paillierPairing.gA)
            // console.log('bigInt gA', gA)
            // console.log('type', typeof(nA.value))

            //通过bigInt库构造的nA,gA,nB,gB是一个对象，其value值为bigint类
            const publicKeyA = new paillierBigint.PublicKey(nA.value, gA.value)
            const publicKeyB = new paillierBigint.PublicKey(nB.value, gB.value)

            //price, count均精确到小数点后3位，乘10的立方以保留这些小数
            //price计算成为总价传给后端！！！
            const totalPrice = (project.price * project.count).toFixed(3)
            //生成随机数r
            function generateR(n) {
                let r;
                do {
                r = bcu.randBetween(n);
                } while (bcu.gcd(r, n) !== 1n);
                // console.log('r', r)
                return r;
            }
            //协商公共r
            function negotiateSharedR(rA, rB) {
                const hash = crypto.createHash('sha256');
                hash.update(rA.toString());
                hash.update(rB.toString());
                const sharedR = hash.digest('hex');
                // console.log('sharedR', sharedR)
                return bigInt(sharedR, 16);
            }
            //类同态加密，对总价
            /**
             * 
             * @param {bigInt} n 某一方的同态加密公钥n，可以是nA或nB
             * @param {bigInt} g 某一方的同态加密公钥g，可以是gA或gB
             * @param {bigInt} r 由generateR生成的随机数，需要经过Diffie-Hellman协商一个公共值
             * @param {bigInt} m 交易金额，这里是交易总价
             */
            function encryptPrice(n, g, r, m) {
                const modNum = nA.pow(2).times(nB.pow(2))
                const rn = bigInt(r).modPow(n, modNum);
                const res = (g.modPow(bigInt(m), modNum).times(rn)).mod(modNum)
                // console.log('encryptPriceRes', res)
                return res
            }

            const rA = generateR(BigInt(nA))
            const rB = generateR(BigInt(nB))
            const r = negotiateSharedR(rA, rB)

            state.paillierPairing.priceA = encryptPrice(nA, gA, r, totalPrice * Math.pow(10, 3)).toString(16)
            state.paillierPairing.priceB = encryptPrice(nB, gB, r, totalPrice * Math.pow(10, 3)).toString(16)

            // console.log('priceA, priceB', state.paillierPairing.priceA, state.paillierPairing.priceB)

            //原生paillier同态加密【已停止使用】
            // state.paillierPairing.priceA = publicKeyA.encrypt(totalPrice * Math.pow(10, 3)).toString(16)
            // state.paillierPairing.priceB = publicKeyB.encrypt(totalPrice * Math.pow(10, 3)).toString(16)

            state.paillierPairing.countA = publicKeyA.encrypt(project.count * Math.pow(10, 3)).toString(16)
            state.paillierPairing.countB = publicKeyB.encrypt(project.count * Math.pow(10, 3)).toString(16)

            // console.log('paillierPairing', state.paillierPairing)

            //零知识验证
            const ec = new elliptic.ec('p256'); // 创建SM2曲线实例
            // 创建生成元 G
            const ec_G = ec.curve.g
            // 生成随机字节数
            const randomBytes = crypto.randomBytes(32); // 32字节（256位）随机数
            const r1 = crypto.randomBytes(32).toString('hex')
            const r2 = crypto.randomBytes(32).toString('hex')
            const r3 = crypto.randomBytes(32).toString('hex')
            const r4 = crypto.randomBytes(32).toString('hex')
            const r5 = crypto.randomBytes(32).toString('hex')
            // 将随机字节数转换为十六进制字符串
            const ec_a = randomBytes.toString('hex')
            // 计算 H = a*G
            const ec_H = ec_G.mul(ec_a)
            //删除二进制最后一位（相当于log2）
            function DelBinaryLastBit(bigInt) {
                // 将 BigInt 转换为二进制字符串
                const binaryStr = bigInt.toString(2);
                // 删除二进制字符串的最后一位
                const truncatedBinaryStr = binaryStr.slice(0, -1);
                // 将新的二进制字符串转换为十进制
                const decimalValue = parseInt(truncatedBinaryStr, 2);
                // 将十进制转换为十六进制
                const hexValue = decimalValue.toString(16);
                return hexValue;
            }

            function PedersenCommit(encryptData, r) {
                let log2Data = DelBinaryLastBit(encryptData.toString(16))
                const mul_res1 = ec_H.mul(log2Data)
                const mul_res2 = ec_G.mul(r.toString(16))
                const res_point = mul_res1.add(mul_res2)
                return res_point.x.toString(16) + res_point.y.toString(16)
            }
            // 输出结果
            // console.log('a*G:', ec_H)
            const money = totalPrice * Math.pow(10, 3)
            const nC = bigInt('fadf3c2489a666159ffa3163af7f7a92c412ec0bf66f5b7c2156d5abd3b6d58f751c6c1f482ed941d14082117ed61e48f2b1eebb7db49eb9456cf58fa29b783086d2d5e2457fd2359076de1a7bf5be17fec4e5e0c4ca234eeed5884a19cd390997b38b26c12ec646a74828541724d8781bc11ddaa54c79cdce9de91dff025e4b', 16)
            const gC = bigInt('fadf3c2489a666159ffa3163af7f7a92c412ec0bf66f5b7c2156d5abd3b6d58f751c6c1f482ed941d14082117ed61e48f2b1eebb7db49eb9456cf58fa29b783086d2d5e2457fd2359076de1a7bf5be17fec4e5e0c4ca234eeed5884a19cd390997b38b26c12ec646a74828541724d8781bc11ddaa54c79cdce9de91dff025e4c', 16)
            const admin_Pk = bigInt('11a3f6e6fe8f190a8c9154c75b27a8492eea5787bcb41f060b1eb6318b0771e10e0ce4980462df0b874fa8b1e271a12185298a660c2bca8cd6cc0d842b339487', 16)
            const admin_modNum = nA.pow(2).times(nC.pow(2))
            const admin_rn = bigInt(r).modPow(nC, admin_modNum);
            const admin_com = ((gC.modPow(bigInt(money), admin_modNum).times(admin_rn)).mod(admin_modNum)).toString(16)
            let encryptPrice_A = state.paillierPairing.priceA
            let encryptPrice_B = state.paillierPairing.priceB
            const max_g_reflectionToPrice = gA>gB?(gA>gC? encryptPrice_A: (gB>gC? encryptPrice_B:admin_com)):(gB>gC?encryptPrice_B:admin_com)
            const sec_g_reflectionToPrice = gA>gB?(gA>gC? (gB>gC? encryptPrice_B:admin_com):encryptPrice_A):(gB>gC?(gA>gC?encryptPrice_A:admin_com):encryptPrice_B)
            const thi_g_reflectionToPrice = gA>gB?(gA>gC? (gB>gC? admin_com:encryptPrice_B): encryptPrice_B):(gB>gC?(gA>gC?admin_com:encryptPrice_A):encryptPrice_A)
            const max_g_reflectionToN = gA>gB?(gA>gC? nA: (gB>gC? nB:nC)):(gB>gC?nB:nC)
            const sec_g_reflectionToN = gA>gB?(gA>gC? (gB>gC? nB:nC):nA):(gB>gC?(gA>gC?nA:nC):nB)
            const thi_g_reflectionToN = gA>gB?(gA>gC? (gB>gC? nC:nB): nB):(gB>gC?(gA>gC?nC:nA):nA)
            const Com1 = PedersenCommit(max_g_reflectionToPrice, r1)
            const Com2 = PedersenCommit(sec_g_reflectionToPrice, r2)
            const Com3 = PedersenCommit(thi_g_reflectionToPrice, r3)
            const Com4 = PedersenCommit(r.modPow(max_g_reflectionToN.minus(sec_g_reflectionToN), max_g_reflectionToN.pow(2).times(sec_g_reflectionToN.pow(2))), r4)
            const Com5 = PedersenCommit(r.modPow(max_g_reflectionToN.minus(thi_g_reflectionToN), max_g_reflectionToN.pow(2).times(thi_g_reflectionToN.pow(2))), r5)
            // console.log('ec_G', ec_G.x.toString(16) + ec_G.y.toString(16))
            // console.log('Com', Com1, Com2, Com3, Com4, Com5)
            const zeroKnowledgeProofParams = {
                project: project,
                Com1: Com1, Com2: Com2, Com3: Com3, Com4: Com4, Com5: Com5,
                r1: r1, r2: r2, r3: r3, r4: r4, r5: r5,
                n1: (max_g_reflectionToN.pow(2)).times(sec_g_reflectionToN.pow(2)).toString(16),
                n2: (max_g_reflectionToN.pow(2)).times(thi_g_reflectionToN.pow(2)).toString(16)
            }
            // console.log('zeroKnowledgeProofParams', zeroKnowledgeProofParams)
            await dispatch('zeroKnowledgeProof', zeroKnowledgeProofParams)
        },
        //零知识验证算法
        async zeroKnowledgeProof({dispatch}, zeroKnowledgeProofParams) {
            const {project, Com1, Com2, Com3, Com4, Com5, r1, r2, r3, r4, r5, n1, n2} = {...zeroKnowledgeProofParams}
            await axios({
                method: 'post',
                url: 'zeroKnowledgeProof',
                data: {
                    com1: Com1, com2: Com2, com3: Com3, com4: Com4, com5: Com5,
                    r1: r1, r2: r2, r3: r3, r4: r4, r5: r5,
                    n1: n1, n2: n2
                }
            }).then((res) => {
                console.log('zeroKnowledgeProof', res)
                if(res.data.code === 200){
                    dispatch('Enc', project)
                    // popUp.install().popMsgOnlyConfirm('零知识验证通过。')
                }
                else popUp.install().popMsgOnlyConfirm('零知识验证错误，请重试！')
            }).catch((err) => {
                popUp.install().popMsgOnlyConfirm('网络错误，请稍后再试！')
                console.log(err)
            })
        },
        //双线性配对加密算法
        async Enc({state, dispatch}, project) {
            const q = bigInt(state.q)
            const Px = bigInt(state.Px)
            const Py = bigInt(state.Py)
            const PT = bigInt(state.PT)
            
            const k1 = bigInt.randBetween(1, q.minus(1))
            const k2 = bigInt.randBetween(1, q.minus(1))
            state.tempVariables.k1 = k1.toString(16)
            state.tempVariables.k2 = k2.toString(16)

            const B = bigInt(state.billinearPairing.publicKeyB, 16)
            let C1 = k1.times(Px).mod(q)
            let C2 = k2.times(Py).mod(q)
            let k = (k1.add(k2)).mod(q)
            let C3 = k.times(PT).add(B).mod(q)
            // console.log('(C1, C2, C3)', {C1, C2, C3})
            state.billinearPairing.C1 = C1.toString(16)
            state.billinearPairing.C2 = C2.toString(16)
            state.billinearPairing.C3 = C3.toString(16)
            // console.log('C', state.billinearPairing)

            await dispatch('GenProof', project)

        },
        //生成撤销匿名参数
        async GenProof({state, dispatch}, project) {
            const G = bigInt(state.G)
            const q = bigInt(state.q)
            const Px = bigInt(state.Px)
            const Py = bigInt(state.Py)
            const PT = bigInt(state.PT)
            const P_B = bigInt(state.billinearPairing.addrB, 16)
            const C1 = bigInt(state.billinearPairing.C1, 16)
            const C2 = bigInt(state.billinearPairing.C2, 16)
            const C3 = bigInt(state.billinearPairing.C3, 16)
            const k1 = bigInt(state.tempVariables.k1, 16)
            const k2 = bigInt(state.tempVariables.k2, 16)
            const t = bigInt(state.tempVariables.t_B, 16)

            const rk1 = bigInt.randBetween(1, q.minus(1))
            const rk2 = bigInt.randBetween(1, q.minus(1))
            let Q1 = rk1.times(Px).mod(q)
            let Q2 = rk2.times(Py).mod(q)
            let rk = (rk1.add(rk2)).mod(q)

            // console.log('rk',rk.toString())

            const rt = bigInt.randBetween(1, q.minus(1))
            let Q3 = (PT.times(rk).subtract(G.times(rt))).mod(q)
            if (Q3.lesser(0)) Q3 = Q3.add(q)

            // console.log('Q3',Q3.toString())
            //16进制哈希值转成bigInt计算
            let h = bigInt(sha256(G.toString(16)+'||'+P_B.toString(16)+'||'+Px.toString(16)+'||'+Py.toString(16)+'||'+PT.toString(16)+'||'+C1.toString(16)+'||'+C2.toString(16)+'||'+C3.toString(16)+'||'+Q1.toString(16)+'||'+Q2.toString(16)+'||'+Q3.toString(16)), 16)
            // console.log('h', h.toString())

            let wk1 = k1.times(h).add(rk1).mod(q)
            let wk2 = k2.times(h).add(rk2).mod(q)
            let wt = t.times(h).add(rt).mod(q)
            // let Pi_cp = {h, wk1, wk2, wt}
            // console.log('证明参数 Pi_cp', Pi_cp) 

            state.billinearPairing.h = h.toString(16)
            state.billinearPairing.Wk1 = wk1.toString(16)
            state.billinearPairing.Wk2 = wk2.toString(16)
            state.billinearPairing.Wt = wt.toString(16)

            // console.log('state', state)
            await dispatch('sendPurchaseRequest', project)

        },

        //验证私钥（判断用户能否合法获取交易信息，同时获取用户余额）
        async checkPrivKeyToGetTrade({commit, dispatch}) {
            if(localStorage.getItem('mixSk') === null){
                popUp.install().popMsgOnlyConfirm('获取私钥失败，请尝试重新登录！')
            }else {
                const mixSk = localStorage.getItem('mixSk')
                const lambda = mixSk.split('||')[1]
                const mu = mixSk.split('||')[2]
                const hsk = sha256(lambda + '||' + mu) //应当与注册时传入一致
                await axios({
                    method: 'get',
                    url: 'checkSk',
                    params: {
                        hsk: hsk
                    }
                }).then((res) => {
                    // console.log('checkToGetTrade',res)
                    if(res.data.code === 200){
                        const data = res.data.data
                        const encryptedBalance = data.balance //获取用户同态加密的余额
                        if(data.balance === null){
                            popUp.install().popMsgOnlyConfirm('余额获取失败，请稍后重试！')
                            console.log('data.balance is null, error in checkPrivKeyToGetTrade() method')
                        }
                        else {
                            const n = bigInt(data.n, 16)
                            const g = bigInt(data.g, 16)

                            //同态解密
                            const publicKey = new paillierBigint.PublicKey(n.value, g.value)
                            const privateKey = new paillierBigint.PrivateKey(bigInt(lambda, 16).value, bigInt(mu, 16).value, publicKey)
                            const balance = Number(privateKey.decrypt(bigInt(encryptedBalance, 10).value))

                            commit('userBalanceInit')
                            store.state.tradeCheck.userBalance = balance/Math.pow(10, 3)

                            // console.log('publicKey n, g', publicKey.n.toString(16), publicKey.g.toString(16))
                            // console.log('privateKey lambda, mu', privateKey.lambda.toString(16), privateKey.mu.toString(16))
                            // console.log('balance', balance)
                            dispatch('getTradeCheckKey')
                        }
                    }else{
                        popUp.install().popMsgOnlyConfirm('用户私钥错误，请重试！')
                    }
                }).catch((err) => {
                    popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后重试！')
                    console.log(err)
                })
            }
        },
        //交易合约获取，交易核验所需数据获取
        async getTradeCheckKey({state, commit, dispatch}) {
            //调用tradeCheck中函数，重新挂载数据
            await commit('tradeCheckInit')

            //获取id，Rtx，addrB和B的公钥
            await axios({
                method: 'get',
                url: 'showMyTransactionCheck',
            }).then((res) => { 
                if(res.data.code === 200){
                    const data = res.data.data
                    state.decryptVariables.RtxArr = [...data.Rtx]
                    state.decryptVariables.pk = data.pk
                    dispatch('VerAddr')
                    // console.log('showMyTransactionCheck', data)
                }else {
                    popUp.install().popMsgOnlyConfirm('获取数据失败，请稍后再试！')
                }
                // console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        },
        //一次性地址验证算法（需要用户私钥）
        async VerAddr({state, commit, dispatch}) {
            const q = bigInt(state.q)
            const G = bigInt(state.G)
            const pk = bigInt(state.decryptVariables.pk, 16)
            const mixSk = localStorage.getItem('mixSk')
            //获取双线性配对私钥
            const sk = bigInt(mixSk.split('||')[0], 16)

            // console.log('RtxArr', state.decryptVariables.RtxArr)
            await state.decryptVariables.RtxArr.forEach(obj => {
                let Rtx = bigInt(obj.rtx, 16)
                let t_check = bigInt(sha256.create(Rtx.times(sk)), 16).mod(q) //此处应当与一次地址生成中的sha256匹配
                let P_check = G.times(t_check).add(pk).mod(q)
            
                if(P_check.toString(16).toLowerCase().padStart(128, '0') === obj.addrA.toLowerCase()){
                    state.decryptVariables.listID.correspondMyPurchaseArrID.push(obj.id)
                    // console.log('correspondPurchase', obj)
                }
                if(P_check.toString(16).toLowerCase().padStart(128, '0') === obj.addrB.toLowerCase()){
                    state.decryptVariables.listID.correspondSellArrID.push(obj.id)
                    //此处将匹配的Rtx与对应的id存入tradeCheck的模块中【在一次私钥计算中使用】
                    store.state.tradeCheck.sellRtxWithID.push({Rtx: obj.rtx, id: obj.id})
                    // console.log('correspondSell', obj)
                }
                // console.log('sk',sk.toString(16))
                // console.log('skToPk_check', bigInt(G.times(sk).mod(q)).toString(16))
                // console.log('pk', pk.toString(16))
                // console.log('Rtx_check', Rtx.toString(16))
                // console.log('t_check',t_check.toString(16))
                // console.log('P_check', P_check.toString(16))
            })
            // console.log('listID', state.decryptVariables.listID)

            //获取加密后出售
            await dispatch('getEncryptedSell', state.decryptVariables.listID) 
            //获取加密后购买
            await dispatch('getEncryptedPurchase', state.decryptVariables.listID)
            
            commit('clearDecryptData') //清空解密数据

        },
        //一一次性私钥计算算法
        async CalOTPrivKey({state, dispatch}, project) {
            const q = bigInt(state.q)
            if(localStorage.getItem('mixSk')){
                const mixSk = localStorage.getItem('mixSk')
                const sk = bigInt(mixSk.split('||')[0], 16)
                let Rtx = 0
                //获取project.id对应的Rtx
                store.state.tradeCheck.sellRtxWithID.forEach((item) => {
                    if(item.id === project.id)Rtx = bigInt(item.Rtx, 16)
                })
                if(Rtx !== 0){
                    let hash = bigInt(sha256.create(sk.times(Rtx)), 16).mod(q)
                    let d = hash.add(sk).mod(q)
                    // console.log('d', d.toString(16))
                    project.d = d.toString(16) //为目标添加签名
                    await dispatch('passOrRejectTrade', project)
                    
                }else {
                    popUp.install().popMsgOnlyConfirm('未检查到这笔交易，请检查您的私钥是否正确并重试！')
                }
            }else {
                popUp.install().popMsgOnlyConfirm('无法获取您的私钥，请尝试重新登录！')
            }
            
        }
        
    }
}

// 电力购买&搜索
const itemPurchaseAndSearch = {
    namespace: true,
    state: {
        allProArr: [],
        selectedArr: [],
        selectCount: '',
        sm2PublicKey: '04D63E90983C25F39532440BE35CB1C94FF50DAF5733CAABC6AC1C7C81088BA60D0E1149F5BB8089822BD548F38D8D9FE2D585A4F4A3D8683361ED89C755EC6BE3',

    },
    mutations: {
        purchaseSucceed(){
            popUp.install().popMsgOnlyConfirm('发起购买成功，请在“买卖明细”中查看！')
        },
        purchaseFailed(){
            popUp.install().popMsgOnlyConfirm('发起购买失败，请稍后再试！')
        },
        clearSelected(state) {
            state.selectCount = ''
            state.selectedArr = []
        }
        
    },
    actions: {
        //获取所有可购买项目
        async getAllItems({state}){
            await axios({
                method: "get",
                url: "showSaleProjects",
            }).then((res) => {
                state.allProArr = res.data.data
                // console.log('allItems', res.data.data)
            }).catch((e) => {
                console.log(e)
            })
        },
        //获取最优匹配项目
        async getSelectedItems({state, commit}, selectCount){
            commit('clearSelected')
            // let count = sm2.sm2.doEncrypt(selectCount, state.sm2PublicKey)
            await axios({
                method: "get",
                url: "showBestProjects",
                params: {
                    count: selectCount
                }
            }).then((res) => {
                if(res.data.code === 200) {
                    state.selectedArr = res.data.data
                    state.selectCount = selectCount
                }else popUp.install().popMsgOnlyConfirm(res.data.message)
                console.log(res)
            }).catch((err) => {
                console.log(err)
                popUp.install().popMsgOnlyConfirm('网络错误，请稍后再试！')
            })
        },
        //直接购买
        async sendPurchaseRequest({state, commit}, project){
            const mixSk = localStorage.getItem('mixSk')
            //用户私钥加密传输，使用sm2公钥加密
            let sk = sm2.sm2.doEncrypt(mixSk, state.sm2PublicKey)
            const cryptoData = store.state.tradeCryptogram
            await axios({
                method: 'get',
                url: 'transfer',
                params: {
                    projectName: project.projectName,
                    //在验证地址时也需要加上padStart，来确保验证到addrA,addrB！！
                    addrA: cryptoData.billinearPairing.addrA.padStart(128,'0'), addrB: cryptoData.billinearPairing.addrB.padStart(128,'0'),
                    //price,count在加密/解密时均转换为bigInt类，因此加入前导0不影响结果
                    priceA: cryptoData.paillierPairing.priceA.padStart(512,'0'), priceB: cryptoData.paillierPairing.priceB.padStart(512,'0'),
                    countA: cryptoData.paillierPairing.countA.padStart(512,'0'), countB: cryptoData.paillierPairing.countB.padStart(512,'0'),
                    //以下数据均为bigInt类转为16进制传输，加入前导0不影响bigInt大小
                    Rtx: cryptoData.billinearPairing.Rtx.padStart(128,'0'),
                    C1: cryptoData.billinearPairing.C1.padStart(128,'0'), C2: cryptoData.billinearPairing.C2.padStart(128,'0'), C3: cryptoData.billinearPairing.C3.padStart(128,'0'),
                    h: cryptoData.billinearPairing.h.padStart(64,'0'),
                    Wk1: cryptoData.billinearPairing.Wk1.padStart(128,'0'), Wk2: cryptoData.billinearPairing.Wk2.padStart(128,'0'), Wt: cryptoData.billinearPairing.Wt.padStart(128,'0'),
                    
                    sk: sk
                }
            }).then((res) => {
                // console.log('transfer', res)
                if(res.data.code === 200){
                    commit('purchaseSucceed')
                }
                else commit('purchaseFailed')
            }).catch((err) => {
                commit('purchaseFailed')
                console.log(err)
            })
            commit('clearEncryptData') //调用tradeCryptogram中函数，清除加密数据
        }
    }
}

//电力出售
const itemSell = {
    namespace: true,
    state: {
       
    },
    mutations: {
        
    },
    actions: {
        async powerSell({}, sellInfo) {
            await axios({
                method: 'get',
                url: 'uploadSaleProject',
                params: {
                    projectName: sellInfo.projectName,
                    price: sellInfo.price,
                    stock: sellInfo.stock,
                    contractTerm: sellInfo.contractTerm
                }
            }).then((res) => {
                if(res.data.code === 200) {
                    popUp.install().popMsgOnlyConfirm('上传售电项目成功！请到“交易详情”页中查看。')
                }else {
                    popUp.install().popMsgOnlyConfirm(res.data.message)
                }
                // console.log(res)
            }).catch((err) => {
                console.log(err)
                popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后再试！')
            })
        }
    }
}

//交易明细
const tradeCheck = {
    namespace: true,
    state: {
        sellRtxWithID: [], //与ID相匹配Rtx
        myPurchaseApplyArr: [],
        confirmToSellArr: [],
        userBalance: '',
        // 加密数组
        encryptedPurchaseArr: [],
        encryptedSellArr: []
    },
    mutations: {
        //初始化用户余额，在checkPrivKeyToGetTrade函数中
        userBalanceInit(state) {
            state.userBalance = ''
        },
        //初始化/清空
        tradeCheckInit(state) {
            state.myPurchaseApplyArr = []
            state.confirmToSellArr = []
            state.encryptedPurchaseArr = []
            state.encryptedSellArr = []
        },
        clearEncryptedData(state) {
            state.encryptedPurchaseArr = [],
            state.encryptedSellArr = []
        }
    },
    actions: {
        //由VerAddr函数调用
        async getEncryptedPurchase({state, dispatch}, listID){
            // console.log('list', listID.correspondMyPurchaseArrID)
            await axios({
                method: 'post',
                url: 'showMyTransactionA',
                data: listID.correspondMyPurchaseArrID
            }).then((res) => {
                if(res.data.code === 200) {
                    state.encryptedPurchaseArr = res.data.data
                    dispatch('decryptPurchase')
                }
                // console.log(res)
            }).catch((err) => {
                popUp.install().popMsgOnlyConfirm('加密数据获取错误，请稍后再试！')
                console.log(err)
            })
        },
         //由VerAddr函数调用
        async getEncryptedSell({state, dispatch}, listID) {
            await axios({
                method: 'post',
                url: 'showMyTransactionB',
                data: listID.correspondSellArrID
            }).then((res) => {
                if(res.data.code === 200) {
                     state.encryptedSellArr = res.data.data
                     dispatch('decryptSell')
                }
                // console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        },
        async decryptPurchase({state}) {
            const mixSk = localStorage.getItem('mixSk')
            //获取同态加密私钥，lambda, mu
            const lambda = bigInt(mixSk.split('||')[1], 16)
            const mu = bigInt(mixSk.split('||')[2], 16)
            await state.encryptedPurchaseArr.forEach(item => {
            //item.property包括id, sign, projectName, state, price, count, n, g
                let result = item
                const n = bigInt(item.n, 16)
                const g = bigInt(item.g, 16)
                //同态解密【应当与encryptPriceAndCount中的加密对应】
                const publicKey = new paillierBigint.PublicKey(n.value, g.value)
                const privateKey = new paillierBigint.PrivateKey(lambda.value, mu.value, publicKey)
                let totalPrice = Number(privateKey.decrypt(bigInt(item.price, 16).value))/Math.pow(10, 3)
                result.count = Number(privateKey.decrypt(bigInt(item.count, 16).value))/Math.pow(10, 3)
                result.price = (totalPrice/result.count).toFixed(3)
                state.myPurchaseApplyArr.push(result)
            })
        },
        async decryptSell({state, commit}) {
            const mixSk = localStorage.getItem('mixSk')
            //获取同态加密私钥，lambda, mu
            const lambda = bigInt(mixSk.split('||')[1], 16)
            const mu = bigInt(mixSk.split('||')[2], 16)
            await state.encryptedSellArr.forEach(item => {
            //item.property包括id, sign, projectName, state, price, count, n, g
                let result = item
                const n = bigInt(item.n, 16)
                const g = bigInt(item.g, 16)
                //同态解密【应当与encryptPriceAndCount中的加密对应】
                const publicKey = new paillierBigint.PublicKey(n.value, g.value)
                const privateKey = new paillierBigint.PrivateKey(lambda.value, mu.value, publicKey)
                let totalPrice = Number(privateKey.decrypt(bigInt(item.price, 16).value))/Math.pow(10, 3)
                result.count = Number(privateKey.decrypt(bigInt(item.count, 16).value))/Math.pow(10, 3)
                result.price = (totalPrice/result.count).toFixed(3)
                state.confirmToSellArr.push(result)
            })
            //清空加密数组
            commit('clearEncryptedData')
            // console.log('result!',state)
        },
        //卖方通过/拒绝一笔交易
        async passOrRejectTrade({}, project) {
            let totalPrice = project.price * project.count
            const sm2PublicKey = store.state.itemPurchaseAndSearch.sm2PublicKey
            // const id = sm2.sm2.doEncrypt(project.id, sm2PublicKey)
            // const state = sm2.sm2.doEncrypt(project.state, sm2PublicKey)
            const sign = sm2.sm2.doEncrypt(project.d, sm2PublicKey)
            const detail = sm2.sm2.doEncrypt(totalPrice + '||' + project.count, sm2PublicKey)
            await axios({
                method: 'get',
                url: 'confirmTransaction',
                params: {
                    id: project.id,
                    state: project.tempState,
                    count: parseInt(project.count),
                    sign: sign,
                    detail: detail
                }
            }).then((res) => {
                // console.log('confirmTransaction', res)
                if(res.data.code === 200) {
                    // Object.defineProperty(project, 'state', project.tempState)
                    project.state = project.tempState
                    console.log('project state', project)
                }else {
                    popUp.install().popMsgOnlyConfirm('请求错误，请稍后再试！')
                }
                delete project.d //删除d（一次性签名）
                delete project.tempState
            }).catch((err) => {
                console.log(err)
                popUp.install().popMsgOnlyConfirm('网络错误，请稍后再试！')
            })
        },
        //申诉交易
        async reviewTrade({}, project) {
            await axios({
                method: 'get',
                url: 'appeal',
                params: {
                    id: project.id,
                    reason: project.reason || '无'
                }
            }).then((res) => {
                if(res.data.code === 200) 
                    popUp.install().popMsgOnlyConfirm("申诉成功！")
                else popUp.install().popMsgOnlyConfirm("请求错误，请稍后再试！")
                // console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        
    }
}

//市场监管
const marketSupervision = {
    namespace: true,
    state: {
        reviewItemArr: [],
        C_revoke: {
            C1: '', C2: '', C3: ''
        },
        sm2PrivateKey: '417F17EC7C69A7AB97DC52C6081E9F498D878A66645C4B1D6D018C8F3D6D0361',
        adminSk: '', //监管方私钥
        pkB: '' //计算出的B的公钥   
    },
    mutations: {
        //初始化数据列表
        dataArrInit(state) {
            state.reviewItemArr = []
        },
        //初始化追溯列表
        traceBackInit(state) {
            state.C_revoke = { C1: '', C2: '', C3: '' }
        },
    },
    actions: {
        async getReviewArr({state, commit}) {
            await commit('dataArrInit')
            await axios({
                method: 'get',
                url: 'showAppeal'
            }).then((res) => {
                if(res.data.code == 200) {
                    res.data.data.forEach(item => {
                        item.reviewSignal = false
                        state.reviewItemArr.push(item)
                    })
                }else popUp.install().popMsgOnlyConfirm('列表获取失败，请稍后重试！')
                // console.log(res)
            }).catch((err) => {
                console.log(err)
                popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后再试！')
            })
        },
        //从本地获取管理员私钥【在traceBack中调用并检验】
        async checkAdminSk({state, dispatch}, item) {
            if(localStorage.getItem('adminSk')){
                state.adminSk = localStorage.getItem('adminSk')
            }else{
                // await popUp.install().popMsgToPaste('请提供管理员私钥', '完成')
                // await Vue.prototype.$bus.$on('popConfirm', (adminSk) => {
                //     state.adminSk = adminSk
                //     localStorage.setItem('adminSk', adminSk)
                //     dispatch('calculatePkB', item)
                // })
                const adminSk = localStorage.getItem('mixSk')
                state.adminSk = adminSk
                localStorage.setItem('adminSk', adminSk)
            }
            dispatch('calculatePkB', item)
        },
        //获取交易中的C_revoke(C1, C2, C3)
        async getC_revoke({state, commit, dispatch}, item) {
            commit('traceBackInit')
            await axios({
                method: 'get',
                url: 'getC',
                params: {
                    tid: item.tid
                }
            }).then((res) => {
                if(res.data.code == 200) {
                    const data = res.data.data
                    state.C_revoke = {C1: data.C1, C2:data.C2, C3: data.C3}
                    //获取管理员公钥
                    dispatch('checkAdminSk', item)
                }else{
                    popUp.install().popMsgOnlyConfirm('获取参数失败，请稍后再试！')
                }
                // console.log(res)
            }).catch((err) => {
                popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后再试！')
                console.log(err)
            })
        },
        //使用监管方私钥及C_revoke计算B的公钥(一次性地址匿名性撤销算法)
        async calculatePkB({state, dispatch}, item) {
            // const dx = bigInt(state.adminSk.split('||')[0], 16)
            // const dy = bigInt(state.adminSk.split('||')[1], 16)

            const dx = bigInt('36016ae94feb0c36e2d7996d52e64efce37a3a843b3120d0f1c9c815ae38b49071adccc13fcb97850232c55de72b78f00942097b3dc7ab32d4917c84b440bf7b', 16)
            const dy = bigInt('9b25b0621419db81f8a56aeb201932bdf3750dab4cdb3ce44c5d4ec15f6d024eb2ea32efb5ef45a7724217fe1a30739fb5ad011f0765631049bc2180eaeabaa0', 16)

            const q = bigInt(store.state.tradeCryptogram.q)
            const C1 = bigInt(state.C_revoke.C1, 16)
            const C2 = bigInt(state.C_revoke.C2, 16)
            const C3 = bigInt(state.C_revoke.C3, 16)

            let temp = (dx.times(C1)).add(dy.times(C2)).mod(q)
            let pkB = C3.subtract(temp)>0?C3.subtract(temp).mod(q) : C3.subtract(temp).add(q).mod(q)

            // console.log('pkB', pkB)

            state.pkB = pkB.toString(16)

            dispatch('traceBack', item)

        },
        //溯源/审查
        async traceBack({state, commit}, item) {
            const d = state.adminSk.split('||')[0]
            
            await axios({
                method: 'get',
                url: 'trace',
                params: {
                    tid: item.tid,
                    pkB: state.pkB,
                    d: BigInt('0x' + d) //将d转为bigInt的形式传输
                }
            }).then((res) => {
                if(res.data.code == 200) {
                    popUp.install().popMsgAutoReturn('信息获取成功！', 0.8)
                    const data = res.data.data
                    const detail = sm2.sm2.doDecrypt(data.detail, state.sm2PrivateKey)
                    Object.assign(item, {
                        detail: detail,
                        ida: data.ida,
                        idb: data.idb,
                        userNameA: data.usernameA,
                        userNameB: data.usernameB,

                        reviewSignal: true
                    })
                    // console.log('reviewItemArr', state.reviewItemArr)
                    // console.log(res)
                }else {
                    popUp.install().popMsgOnlyConfirm('请求失败，请检查您的管理员密钥或尝试其他解决方案！')
                    // localStorage.removeItem('adminSk')
                    // state.adminSk = ''
                    commit('traceBackInit')
                }
                // console.log(res)
            }).catch((err) => {
                popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后再试！')
                commit('traceBackInit')
                // localStorage.removeItem('adminSk')
                console.log(err)
            })
        },
        //管理员追溯/拒绝追溯一笔交易&处理结果递交  
        async passOrRejectReport({}, item) {
            await axios({
                method: 'get',
                url: 'processAppeal',
                params: {
                    tid: item.tid,
                    state: item.tempState,
                    process: item.process || '无'
                }
            }).then((res) => {
                if(res.data.code === 200) {
                    popUp.install().popMsgAutoReturn('处理结果上传成功！', 0.8)
                    item.state = item.tempState
                }else {
                    popUp.install().popMsgOnlyConfirm('结果上传失败，请稍后再试！')
                }
                // console.log(res)
            }).catch((err) => {
                popUp.install().popMsgOnlyConfirm('网络请求错误，请稍后再试！')
                console.log(err)
            })
        }
    }
}

//登录与注册
const loginAndRegister = {
    namespace: true,
    state: {
        loginInfo: {
            account: '',
            pass: ''
        },
        /**
         * @param {object} registerInfo 注册信息
         * @param {PropertyKey} identity 注册的用户身份，0（默认）代表电力用户，1代表发电企业
         */
        registerInfo: {
            identity: 0, //注册的用户身份，0（默认）代表电力用户，1代表发电企业
            name: '',
            pass: '',
            email: ''
        },
        rememberCheck: false //记住密码？
    },
    mutations: {
        clearLoginPass(state){
            state.loginInfo.pass = ''
        },
        updateRemember(state, newVal){
            state.rememberCheck = newVal
        },
        //更改用户注册身份（通过点击页面exchange图标）
        changeRegisterIdentity(state) {
            state.registerInfo.identity = !state.registerInfo.identity
        },
        clearRegisterInfo(state){
            state.registerInfo.identity = 0,
            state.registerInfo.name = '',
            state.registerInfo.pass = '',
            state.registerInfo.email = ''
        }
    },
    actions: {
        // 每次登录前读取用户名与密码，自动填充
        loginInit({state}){
            let rememberCheck = JSON.parse(localStorage.getItem('rememberCheck'))
            rememberCheck?state.rememberCheck = rememberCheck : null
            let userName = localStorage.getItem('userName')
            userName?state.loginInfo.account = userName : null
            if(state.rememberCheck){
                let userPass = localStorage.getItem('userPass')
                userPass?state.loginInfo.pass = userPass : null
            }
        },   
        // （登录）输入用户名与密码合法性判断，以及是否记住密码【rememberCheck:true/false】
        async loginCheck({state, dispatch}){
            if(state.loginInfo.account =='' || state.loginInfo.pass == ''){
                await popUp.install().popMsgOnlyConfirm('用户名或密码不能为空！')
            }else {
                localStorage.setItem('rememberCheck',state.rememberCheck)
                await dispatch('login')
            }
        },
        //登录-->通过loginCheck调用登录
        async login({state, commit, dispatch}) {
            localStorage.setItem('userName', state.loginInfo.account)
            const name = state.loginInfo.account
            const pass = state.loginInfo.pass
            const B = sha256(pass)
            const A = sha256(name + B.slice(-2))
            const salt = '$2a$12$' + B.slice(-22)
            const mixLoginHash = bcrypt.hashSync(A.slice(-16) + B.slice(-16), salt)
            await axios({
                method: 'get',
                url: 'login',
                params: {
                    A: A
                }
            }).then(res => {
                if(res.data.code === 200) {
                    let resData = res.data.data
                    const encryptAesRes = resData.ask
                    const decryptAesRes = CryptoJS.AES.decrypt(encryptAesRes, mixLoginHash).toString(CryptoJS.enc.Utf8)
                    if(decryptAesRes.substring(0, 3) == "sk:"){
                        dispatch('checkUserRole', state.loginInfo) //调用userPrivilege中的函数，判断用户身份
                        localStorage.setItem('token',resData.token)
                        localStorage.setItem('userPass', state.loginInfo.pass)
                        localStorage.setItem('mixSk', decryptAesRes.slice(3))
                        commit('clearLoginPass')
                        router.go(-1)
                        Vue.prototype.$bus.$emit('updateLoginStatus')
                    }else {
                        popUp.install().popMsgOnlyConfirm('私钥解密错误，请重新尝试！')
                    }

                    
                }else if(res.data.code === 400) {
                    commit('clearLoginPass')
                    popUp.install().popMsgOnlyConfirm('用户名或密码错误！')
                }
            }).catch(err => {
                commit('clearLoginPass')
                popUp.install().popMsg('登录失败，请稍后再试！')
                console.log(err)
            })
        },
        //注册验证
        async registerCheck({state, dispatch}) {
            if(state.registerInfo.name == '' || state.registerInfo.pass == '' || state.registerInfo.email == '') {
                await popUp.install().popMsgOnlyConfirm('请完善注册信息!')
            }else {
                await dispatch('register')
            }
        },
        //注册-->通过registerCheck调用注册
        async register({state, commit, dispatch}){
            popUp.install().popMsgOnly('正在加密，请稍后...')
            const q = bigInt(store.state.tradeCryptogram.q);
            const di = bigInt.randBetween(1, q.minus(1)) //用户双线性配对私钥生成！
            const G = bigInt(store.state.tradeCryptogram.G)
            let Pi = G.times(di).mod(q)
            // console.log('用户私钥 di', di.toString(16))

            // console.log('用户公钥 Pi',Pi.toString(16))
            let paillierKeyPair = await paillierBigint.generateRandomKeys(1024, true)
            // console.log('总私钥',di.toString(16) + '||' + paillierKeyPair.privateKey.lambda.toString(16) + '||' + paillierKeyPair.privateKey.mu.toString(16))
            const sk = di.toString(16) + '||' + paillierKeyPair.privateKey.lambda.toString(16) + '||' + paillierKeyPair.privateKey.mu.toString(16)
            const name = state.registerInfo.name
            const pass = state.registerInfo.pass
            const B = sha256(pass)
            const A = sha256(name + B.slice(-2))
            const salt = '$2a$12$' + B.slice(-22)
            const mixLoginHash = bcrypt.hashSync(A.slice(-16) + B.slice(-16), salt)
            const encryptAesRes = CryptoJS.AES.encrypt('sk:' + sk, mixLoginHash).toString()
            
            //#region 
            // console.log('A', A)
            // console.log('B', B)
            // console.log('salt', salt)
            // console.log('sk', sk)
            // console.log('mixLoginHash', mixLoginHash)
            // console.log('encryptAesRes', encryptAesRes)
            // console.log('decryptAesRes', decryptAesRes)
            //#endregion

            popUp.install().popRemove()
            await axios({
                method: 'get',
                url: 'register',
                params: {
                    A: A,
                    email: state.registerInfo.email,
                    n: paillierKeyPair.publicKey.n.toString(16),
                    g: paillierKeyPair.publicKey.g.toString(16),
                    pks: Pi.toString(16),
                    hsk: sha256(paillierKeyPair.privateKey.lambda.toString(16) + '||' + paillierKeyPair.privateKey.mu.toString(16)),
                    ask: encryptAesRes
                }
            }).then(res => {
                //注册成功
                if(res.data.code === 200) {
                    // popUp.install().popMsgOnlyConfirmToCopy('注册成功！请复制您的私钥并保存: ', di.toString(16) + '||' + paillierKeyPair.privateKey.lambda.toString(16) + '||' + paillierKeyPair.privateKey.mu.toString(16), '完成')
                    popUp.install().popMsgOnlyConfirm('注册成功！')
                    commit('clearRegisterInfo')
                    Vue.prototype.$bus.$on('popConfirm', () => {
                        router.go(-1)
                    })
                }
                //注册重复
                if(res.data.code === 400) {
                    popUp.install().popMsgOnlyConfirm('账户已存在，请重试！')
                    commit('clearRegisterInfo')
                }
                // commit('clearKey')
                console.log(res)
            }).catch(err => {
                popUp.install().popMsgOnlyConfirm('请求错误，注册失败，请稍后再试！')
                console.log(err)
            })
        }
    }
}

// 用户权限
const userPrivilege = {
    namespace: true,
    state: {
        adminUser: false, //是否为管理员身份
        loginStatus: false //登录状态
    },
    mutations: {
        // 管理员登录
        adminLogin(state){
            state.adminUser = true
            state.loginStatus = true
        },
        //普通用户登录
        generalLogin(state){
            state.loginStatus = true
        },
        //退出登录
        userLogOut(state) {
            state.adminUser = false,
            state.loginStatus = false,
            // 清除token
            localStorage.removeItem('token')
            //清除用户私钥
            localStorage.removeItem('mixSk')
            //清除管理员私钥
            localStorage.removeItem('adminSk')
        }
    },
    actions: {
        checkUserRole({commit}, loginInfo){
            // 判断管理员
            if(loginInfo.account === 'admin' && loginInfo.pass === '123123')commit('adminLogin')
            else commit('generalLogin')
        },
        logOut({commit}){ 
            commit('userLogOut')
            // localStorage.removeItem('store')
            location.reload()
        }
    }
}

const store =  new Vuex.Store({
    modules: {
        tradeCryptogram,
        itemPurchaseAndSearch,
        itemSell,
        tradeCheck,
        marketSupervision,
        loginAndRegister,
        userPrivilege,
    },
    /* vuex数据持久化配置 */
	plugins: [
	    createPersistedState({
            // 存储方式：localStorage、sessionStorage、cookies
			storage: window.localStorage,
            // 存储的 key 的key值
			key: "store",
			render(state) {
            // 要存储的数据
				return { ...state };
			}
		})
	]
})

export default store