<template>
  <div>
    <div class="appIconName">
      <div class="appIcon"></div>
      <div class="appName">J-Web-Music</div>
      <router-link to="/User-Center" class="singleCenter" tag ="div">
          <i class="icon-mine"></i>
      </router-link>
    </div>
   
  </div>
    
</template>

<script>
export default {
  name: 'MHeader',
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
.appIconName
  height:44px
  line-height:44px
  //border:1px solid red
  display:flex
  justify-content:center
  align-items:center
  .appIcon
    bg-image('logo')
    width: 30px
    height: 32px
    margin-right: 9px
    background-size: 30px 32px
  .singleCenter
    position:absolute
    top:0
    right:15px
    font-size:20px
    line-height:44px
  
</style>
