<template>
    <div class="tab">
      <router-link tag="div" to="/Recommend" class="tab-item">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" to="/Singer" class="tab-item">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" to="/Rank" class="tab-item">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link tag="div" to="/Search" class="tab-item">
        <span class="tab-link">搜索</span>
      </router-link>
    </div> 
</template>

<script>
export default {
  name: 'Singer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
body
  color:#fff
.tab
  display:flex
  height:44px
  font-size: $font-size-medium
  height: 44px
  line-height: 44px 
  .tab-item
    flex:1
    text-align:center  
    .tab-link
      color: $color-text-l
  .router-link-active
    .tab-link
      color: $color-theme
      border-bottom: 2px solid $color-theme  
      padding-bottom: 5px
</style>
