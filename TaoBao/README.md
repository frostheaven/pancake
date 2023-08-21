# 淘宝网页仿制demo

## 接口文档
https://www.showdoc.com.cn/128719739414963/

## 其他注意事项：
1.主页用到的所有图片以相对路径存放在img文件夹下；
2.主页的Vue，axios均通过js文件夹下的文件引入；
3.猜你喜欢（个性推荐）中已经设置默认传参 query:推荐，以后可新增“换一批”功能；
4.一个易错点    :style="`background-image: url('${carouselImg[0]}')`"
5.仍有报错 即使将axios请求置于beforeMount()中（函数getAllCate()的触发时间），待改进；       【未解决，尽管在axios.catch中添加方案】
6.slice方法会创建一个新的数组，需要接收返回值
7.sort()接收一个函数参数，可用于乱序 sort(function(){Math.random()-0.5})

...
