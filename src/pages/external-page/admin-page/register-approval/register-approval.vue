<template>
    <div class="register-approval">
        <div class="title-wrapper">
            <div class="title-content">
                <div class="title">注册列表</div>
                <!-- <div class="history"><span>查看所有历史</span></div> -->
            </div>
        </div>
        <div class="main-display">
            <div class="list-wrapper">
                <div class="accordion">
                    <!-- 注册审核 -->
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="register-heading">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#register-collapse" aria-expanded="true" aria-controls="register-collapse">
                            注册审核
                            </button>
                        </h2>
                        <div id="register-collapse" class="accordion-collapse collapse show" aria-labelledby="register-heading">
                            <div class="accordion-body">
                                <ul class="register">
                                    <li class="register-every" v-for="(item, index) in sellConfirmArr" :key="index">
                                        <div class="item-content">
                                            <div class="item-name">
                                            名称：{{ item.name }}
                                            </div>
                                            <div class="item-id">
                                            ID：{{ item.id }}
                                            </div>
                                        </div>
                                        <div class="item-content item-content-second">
                                            <div class="item-price">
                                            交易价格：{{ item.price }}
                                            </div>
                                            <div class="item-quantity">
                                            交易量：{{ item.quantity }}
                                            </div>
                                        </div>
                                        <div class="item-content item-content-third">
                                            <div class="item-total-price">
                                            总金额：￥{{ item.price*item.quantity }}
                                            </div>
                                            <div class="item-status">
                                            状态：{{ item.status }}
                                            </div>
                                        </div>
                                        <div class="btn-wrapper">
                                            <div class="pass-btn">
                                                <button>通 过</button>
                                            </div>
                                            <div class="reject-btn">
                                                <button>驳 回</button>
                                            </div>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
                
    </div>
</template>

<script>
export default {
    name: 'register-approval',
    data() {
        return {
            sellConfirmArr: [{name: '***', id: '123456', price: '999', quantity: '3,000,000', status: '待确认'}],
        }
    },
    methods: {
        // getUserTrade(){
        // }
    },
    async mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
$font-color: #696969;
button {
  border: none;
  color: $font-color;
}
input {
  color: $font-color;
  outline: none;
}
li {
    list-style: none;
}
.register-approval {
    width: 100%;
    min-height: calc(100vh);
    background-color: lighten($theme-color, 5);
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-display {
    width: 100%;
    min-height: calc(90vh);
    background-color: #fff;
    .list-wrapper {
        width: 100%;
    }
}
}
.title-wrapper {
    width: 100%;
    height: calc(10vh);
    .title-content{
        width: 100%; height: 100%;
        position: relative;
        .title {
            padding-left: 5%;
            height: 100%;
            display: flex;
            align-items: center;
            font-weight: bolder;
            font-size: 2rem;
            letter-spacing: 0.2rem;
            color: #fff;
        }
    }
}
// 主体列表
.accordion-collapse {
    width: 100%;
    .accordion-body {
        ul {
            li {
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item-logo {
                    height: 4rem;
                    width: 4rem;
                    overflow: hidden;
                    display: flex;
                    img{
                        border-radius: 999px;
                        height: 100%;
                    }
                }
                .btn-wrapper {
                    display: flex;
                    justify-content: space-around;
                    button {
                        color: #fff;
                        font-weight: 700;
                        margin: 0 4px;
                        padding: 0.4rem 0.4rem;
                        border-radius: 0.5rem;
                        transition: 0.3s ease;
                    }
                    .pass-btn  button{
                        background-color: rgb(45, 110, 45);
                        &:hover {
                            background-color: rgb(10, 189, 10);
                        }
                    }
                    .reject-btn button {
                        background-color: rgb(186, 67, 67);
                        &:hover {
                            background-color: red;
                        }
                    }
                }
            }
        }
    }
}

</style>