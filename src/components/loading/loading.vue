<template>
    <div class="loading" clearfix>
      <div class="content">
        <div class="load-wrapper">
          <div class="loader">
            <div class="loader-ring">
              <div class="ball-holder">
                <div class="ball"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(255, 255, 255, 1);

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  // 蒙板颜色
  background-color: transparent;

  // loading的效果会在任何效果之上
  z-index: 999;

  // 垂直水平居中
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.content {
  padding: 15px;
  overflow: hidden;
  background-color: transparent;
}

.load-wrapper:last-child {
  margin-right: 0;
}

.loader-ring {
  position: relative;
  width: 53px;
  height: 53px;
  margin: 0 auto;
  border: 4px solid $theme-color-light;
  border-radius: 100%;
}

.ball-holder {
  position: absolute;
  width: 12px;
  height: 45px;
  left: 17px;
  top: 0px;
}

.ball {
  position: absolute;
  top: -11px;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: $theme-color;
}

.loader .ball-holder {
  animation: loading 1.3s linear infinite;
}


@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>