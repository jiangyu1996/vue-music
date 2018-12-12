<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import jsonp from 'common/js/jsonp.js'

import MHeader from 'components/m-header/MHeader'
import Tab from 'components/tab/Tab'
import Player from 'components/player/player'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

#app {
  color: $color-theme
}

</style>
