const List = document.querySelector('ul')
// 控制台输出，观察是否正确链接到列表
// console.log(List)

let addElement = () =>{
    
    let Text = document.getElementById('input').value
    
    let li = document.createElement('li')
    let inner = document.createTextNode(Text)
    // 增添新内容(无重复)
    if(Text == ''){
        alert('Empty!')
    }else if(localStorage.getItem(JSON.stringify(Text))){
        alert('The same item has existed!')
        //清空输入框中内容（已重复）
        document.getElementById('input').value = ''
    }else{
        List.appendChild(li)
        li.appendChild(inner)
        Count();
        dataAdd(Text);
        //清空输入框中内容（已录入）
        document.getElementById('input').value = ''
    }


    // 每次创建项目,就为其增添一个删除方块(命名其类型为'del')
    let span = document.createElement('span')
    let txt = document.createTextNode('\u00D7')

    span.className = 'del'
    span.appendChild(txt)
    li.appendChild(span)

    //删除操作(为什么拿到外面不行？？)
    let del = document.getElementsByClassName('del')

    for(let i=0; i<del.length; i++){
        del[i].onclick = function(){
            let div = this.parentElement
            List.removeChild(div)
            Count();
            //同时删除本地缓存
            let re = div.innerText.slice(0,-1)
            dataDel(re);
        }
    }

}

//计数实现（在增加/删除项目时刷新）
let Count = () =>{
    const Listnum = document.querySelectorAll('li')
    // console.log(Listnum)
    let div = document.getElementById('explain')
    if(Listnum.length === 0){
        div.innerText = 'Congrat,you have no more tasks to do'
    }else if(Listnum.length === 1){
        div.innerText = Listnum.length + ' ' + 'item left'
    }else{
        div.innerText = Listnum.length + ' ' + 'items left'
    }
}

//本地存储
//用JSON.parse()方法将本地存储处理为JavaScript对象
// let items = JSON.parse(localStorage.getItem('items'))||[];

function dataAdd(text){
    localStorage.setItem(JSON.stringify(text),'none')
}
function dataDel(text){
    localStorage.removeItem(JSON.stringify(text))
}

//浏览器启动时将本地存储挂载至页面
window.onload = () =>{
    for(let i=0; i<localStorage.length; i++){
        let key = JSON.parse(localStorage.key(i))
        let li = document.createElement('li')
        let inner = document.createTextNode(key)
        //增添缓存数据
        List.appendChild(li)
        li.appendChild(inner)
        let span = document.createElement('span')
        let txt = document.createTextNode('\u00D7')

        //添加删除操作，与之前代码相同（copy）
        span.className = 'del'
        span.appendChild(txt)
        li.appendChild(span)
        Count();

        let del = document.getElementsByClassName('del')

        for(let i=0; i<del.length; i++){
            del[i].onclick = function(){
                let div = this.parentElement
                List.removeChild(div)
                Count();
                let re = div.innerText.slice(0,-1)
                dataDel(re);
            }
        }
    }
}

//竣工^-^