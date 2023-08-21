<template>
    <div class="search-discover">
        <div class="title">
            搜 索
            <br><span>
                {{ searchInfo? '“'+ searchInfo+'”'+ ' '+'的搜索结果':'亲，您还没有搜索过内容哦~' }}
            </span>
        </div>
        <div class="result-display">
            {{ searchResult }}
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'search-discover',
    data() {
        return {
            searchInfo: '',
            searchResult: ''
        }
    },
    methods: {
        async updateSearch(){
            await this.$bus.$on('update-search', searchInfo => {
                if(searchInfo){
                    this.searchInfo = searchInfo
                }
                axios({
                    method: "get",
                    url: `http://www.baidu.com/s`,
                    params: {
                        wd: searchInfo,
                        pn: 1,
                        cl: 3
                    }
                }).then((res) => {
                    // this.searchResult = res
                    console.log(res)
                }).catch((err) => {
                    this.searchResult = '唔，很抱歉发生了一些错误T-T'
                    console.log(err)
                })
            })

        }
    },
    async mounted() {
        await this.updateSearch()
    },
}
</script>

<style lang="scss" scoped>
.search-discover {
  color: #696969;
  font-family: 'Roboto','Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  width: 100%;
}
.title {
  display: inline-block;
  width: 100%;
  margin-top: -10px;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  span {
    border-left: $theme-color solid 0.8rem;
    padding-left: 0.5rem;
    font-size: 0.8rem;
    font-weight: 300;
    margin-left: 2rem;
  }
}
.result-display {
    width: 100%;
}
</style>