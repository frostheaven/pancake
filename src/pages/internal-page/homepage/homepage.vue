<template>
    <div class="homepage">
      <div class="title">
        信息披露
      </div>
      <div class="display-wrapper clearfix">
        <div class="news-wrapper wow animate__animated animate__fadeInBottomLeft">
          <div class="card-title">
            最新资讯
          </div>
          <div class="news-content card-content">
            <ul class="news-items">
              <li class="news-item">关于开展用电侧偏差电量交易、煤电清洁能源电量置换交易...</li>
              <li class="news-item">2023年3月电力市场化交易快报</li>
              <li class="news-item">关于新能源企业电力市场化交易注册的通知</li>
              <li class="news-item">关于公布2023年电力交易服务费收费标准的通知</li>
              <li class="news-item">关于开展电力交易中心2022年度市场服务满意度测评与...</li>
              <li class="news-item">关于某地有限公司申请注册为售电公司信息公示...</li>
              <li class="news-item">电力市场2022年运行总结及2023年预测分析报告</li>
            </ul>
            <!-- 翻页 -->
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
        </div>

        <div class="pie-chart-wrapper wow animate__animated animate__fadeInBottomRight">
          <div class="card-title">
            日交易信息
          </div>
          <div class="pie-chart-content card-content">
            <div id="pie-chart"></div>
            <div class="data-bottom">
              <div class="data-col">本日需求<span style="color: #fac858;">38.3%</span></div>
              <div class="data-col">本日上市<span style="color: #91cc75;">40.0%</span></div>
              <div class="data-col">本日交易<span style="color: #5470c6;">22.7%</span></div>
            </div>
          </div>
        </div>

        <div class="bar-chart-wrapper wow animate__animated animate__fadeInUp">
          <div class="card-title">
            月交易图表
          </div>
          <div class="bar-chart-content card-content">
            <div id="bar-chart"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: 'homepage',
    data() {
        return {
            
        }
    },
    methods: {
      // 饼图
      createPieChart() {
        let pieChart = this.$echarts.init(document.getElementById('pie-chart'))
        pieChart.setOption({
          title: {
            text: '电量',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              type: 'pie',
              data: [
                {
                  value: 70,
                  name: '本日已交易'
                },
                {
                  value: 120,
                  name: '本日上市电量'
                },
                {
                  value: 118,
                  name: '本日公开需求'
                }
              ],
              radius: ['40%', '80%']
            }
          ]
        })
      },
      //瀑布图
      createBarChart() {
        let data = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203];
        let help = [];
        let positive = [];
        let negative = [];
        for (let i = 0, sum = 0; i < data.length; ++i) {
          if (data[i] >= 0) {
            positive.push(data[i]);
            negative.push('-');
          } else {
            positive.push('-');
            negative.push(-data[i]);
          }

          if (i === 0) {
            help.push(0);
          } else {
            sum += data[i - 1];
            if (data[i] < 0) {
              help.push(sum + data[i]);
            } else {
              help.push(sum);
            }
          }
        }

        let barChart = this.$echarts.init(document.getElementById('bar-chart'))
        barChart.setOption({
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: (function() {
              var list = [];
              for (var i = 1; i <= 11; i++) {
                list.push('Oct/' + i);
              }
              return list;
            })()
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'bar',
              stack: 'all',
              itemStyle: {
                normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
                }
              },
              data: help
            },
            {
              name: 'positive',
              type: 'bar',
              stack: 'all',
              data: positive
            },
            {
              name: 'negative',
              type: 'bar',
              stack: 'all',
              data: negative,
              itemStyle: {
                color: '#f33'
              }
            }
          ]
        })
      }
    },

    mounted() {
      this.createPieChart()
      this.createBarChart()
    },
}
</script>

<style lang="scss" scoped>

html {
  background-color: #f0f0f0;
}
li {
  list-style-type: none;
}

.homepage {
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
.card-title {
  font-weight: bold;
  letter-spacing: 0.2rem;
  font-size: 1.5rem;
  border-left: 0.5rem $theme-color solid;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}
.card-content {
  width: 100%;
  background-color: #fff;
  border-radius: 2rem;
  padding: 5%;
}

.display-wrapper {
  width: 100%;
}
.news-wrapper {
  width: 50%;
  padding: 1rem ;
  float: left;
}
.news-content{
  height: calc(60vh);
}
.news-items {
  padding: 0;
  overflow: hidden;
  height: calc(100% - 54px);
  .news-item {
    padding: 12px 8px 12px 8px;
    width: 100%;
    border-radius: 1rem;
    transition: 0.3s ease;
    &:nth-child(odd){
      background-color: #f1f1f1;
    }
    &:hover {
      cursor: pointer;
      background: $theme-color-lighter;
    }
  }
}
.news-content {
  position: relative;
  overflow: hidden;
  nav{
    width: 90%;
    height: 54px;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
  }
}

.pie-chart-wrapper {
  width: 50%;
  height: calc(60vh);
  padding: 1rem;
  float: left;
}
.pie-chart-content {
  height: calc(60vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  #pie-chart {
    width: 100%;
    height: 60%;
  }
}
.pie-chart-content .data-bottom {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 30%;
  .data-col {
    background-color: #f1f1f1;
    font-weight: bold;
    border-radius: 1rem;
    padding: 5%;
    display: flex;
    flex-direction: column;
    span {
      margin-top: 30%;
      font-size: 1.5rem;
    }
  }
}
.bar-chart-wrapper {
  float: left;
  width: 100%;
  height: calc(40vh);
  margin-top: 3rem;
}
.bar-chart-content {
  height: 100%;
  #bar-chart {
    width: 100%;
    height: 90%;
  }
}


</style>