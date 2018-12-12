<template>
  <transition name="center">
    <div class="center" @click.stop>
      <div class="shortcut">
        <div class="switchesWrapper">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        </div>
       
        <div class="randomPlay" @click="randomPlay">
          <i class="icon-play"></i>
          <span>全部随机播放</span>
        </div> 
        <div class="list-wrapper" ref="listWrapper">
          <scroll :refreshDelay="refreshDelay" ref="favoriteList" v-if="currentIndex===0" class="list-scroll" :data="favoriteList">
            <div class="list-inner">
              <song-list :songs="favoriteList" @selectItem="selectSongItem">
              </song-list>
            </div>
          </scroll>
          <scroll ref="playHistory" v-if="currentIndex===1" class="list-scroll" :data="playHistory" :refreshDelay="refreshDelay">
            <div class="list-inner">
              <song-list :songs="playHistory" @selectItem="selectSongItem">
              </song-list>
            </div>
          </scroll>
        </div>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </top-tip>
      <div class="NoResult" v-show="isNoRecords">
        <no-result :title="title"> 
        </no-result>
      </div>
    </div>
  </transition>
</template>
<script>
import SearchBox from 'base/search-box/SearchBox'
import SongList from 'base/song-list/SongList'
import SearchList from 'base/search-list/SearchList'
import Scroll from 'base/scroll/Scroll'
import Switches from 'base/switches/Switches'
import TopTip from 'base/top-tip/TopTip'
import NoResult from 'base/no-result/NoResult'

import Suggest from 'components/suggest/Suggest'
import { Mixin } from 'common/js/mixin'
import { mapGetters, mapActions } from 'vuex'
import Song from 'common/js/song'

export default {
  mixins: [Mixin],
  data() {
    return {
      showSinger: false,
      currentIndex: 0,
      refreshDelay: 50,
      songs: [],
      query: '',
      switches: [{
          name: '我喜欢的'
        },
        {
          name: '最近听的'
        }
      ]
    }
  },
  computed: {
    title(){
      return this.currentIndex===0?'暂无收藏歌曲':'最近没有听过歌曲呦'
    },
    isNoRecords(){
      return this.currentIndex===0?this.favoriteList.length<=0:this.playHistory.length<=0
    },
    ...mapGetters([
      'playHistory',
      'favoriteList',
      'playList'
    ])
  },
  methods: {
    handlerMiniPlayer() {
      let bottom = this.playList.length > 0 ? '60px' : 0;
      this.$refs.listWrapper.style.bottom = bottom;

      this.currentIndex === 0 && this.favoriteList && this.$refs.favoriteList.refresh();
      this.currentIndex === 1 && this.playHistory && this.$refs.playHistory.refresh();
    },
    show() {
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    searchTxtChange(newQuery) {
      this.query = newQuery;
    },
    selectSongItem(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
        this.$refs.topTip.show();
      }
    },
    switchItem(index) {
      this.currentIndex = index
    },
    addQuery(newQuery) {
      this.$refs.searchBox.setSearchTxt(newQuery);
    },
    selectSuggestItem() {
      this.addSearchTxt();
      this.$refs.topTip.show();
    },
    back() {
      this.$router.back();
    },
    randomPlay(){
      let list = this.currentIndex ===0?this.favoriteList:this.playHistory;
      list=list.map((item)=>{
        return new Song(item)
      })
      this.setRandomPlay({list})//注意，这里是对象属性，因为action之前定义的是对象。。
    },
    ...mapActions([
      'insertSong',
      'addSearchTxt',
      'deleteSearchTxt',
      'setRandomPlay'
    ])
  },
  components: {
    SearchBox,
    SongList,
    SearchList,
    Scroll,
    Suggest,
    Switches,
    TopTip,
    NoResult
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .center
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 100
    background: $color-background
  .center-enter-active, &.center-leave-active
      transition: all 0.3s
  .center-enter, &.center-leave-to
      transform: translate3d(100%, 0, 0)
    .shortcut
      margin-top:20px
      position:relative
      .switchesWrapper
        position:relative
      .back
        position:absolute
        left:15px
        top:50%
        transform:translate(0,-50%)
        font-size: 20px
      .randomPlay
        padding: 8px 0px;
        text-align: center;
        border: 1px solid $color-text-l;
        width: 140px;
        font-size: 12px;
        color: #fff;
        border-radius: 100px
        margin:20px auto
        color:$color-text-l
        font-size:$font-size-medium
        line-height: 100%;
      .list-wrapper
        position: fixed
        top: 100px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .tip-title
      text-align: center
      padding: 15px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text 
    .NoResult
      position: fixed;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      text-align: center;
</style>