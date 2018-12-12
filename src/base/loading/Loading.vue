<template>
  <div class="loading">
    <img src="./loading.gif" class="loading-img">
    <p class="title">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  data() {
    return{}
  },
  props: {
    title: {
      type: String,
      default: "正在加载中..."
    },
    mounted() {
      //console.log(this.recommendBanner);
    }
  }
}

</script>
<style scoped lang="stylus">
@import "~common/stylus/variable"
.loading
  width: 100%
  text-align:center
  .loading-img
    width:30px
    height:30px
  .title
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>
