<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop ref="listwrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="modeIcon" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContent" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay" :beforeScrollStart="beforeScrollStart" @beforeScrollStart="beforeScroll">
          <transition-group name="list" tag="ul">
            <li :key="item.id" ref="listItem" class="item" v-for="(item,index) in sequenceList" @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span  class="delete" @click.stop = "deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click.stop="showAddSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="confirm"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { playMode } from 'common/js/config'
import { getRandomArr } from 'common/js/util'
import Scroll from 'base/scroll/Scroll'
import Confirm from 'base/confirm/Confirm'
import AddSong from 'components/add-song/AddSong'

import { playerMixin } from 'common/js/mixin'
export default {
  //mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      refreshDelay: 120,
      beforeScrollStart: true
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '循环播放' : '随机播放'
    },
    modeIcon() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'playList',
      'sequenceList',
      'currentSong',
      'mode',
      'favoriteList'

    ])
  },
  methods: {
    beforeScroll() {
      this.$refs.listContent.refresh();
    },
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrentSong(this.currentSong);
      }, 20)
    },
    changeMode() {
      this.setPlayMode((this.mode + 1) % 3);
      let randomArr = null;
      if (this.mode == playMode.random) {
        randomArr = getRandomArr(this.sequenceList);
      } else {
        randomArr = this.sequenceList;
      }
      this.resetIndex(randomArr);
      this.setPlayList(randomArr);
    },
    resetIndex(randomArr) {
      let index = randomArr.findIndex((item) => {
        return item.id == this.currentSong.id;
      })
      this.setCurrentIndex(index);
    },
    selectItem(song, index) {
      if (this.mode == playMode.random) {
        index = this.playList.findIndex((item) => {
          return song.id == item.id;
        })
      }
      this.setCurrentIndex(index);
      this.setPlayState(true);
    },
    deleteOne(item) {
      this.deleteSong(item);
      if (!this.playList.length)
        this.hide();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    hide() {
      this.showFlag = false;
    },
    getCurrentIcon(item) {
      return item.id == this.currentSong.id ? 'icon-play' : ''
    },
    getFavoriteIcon(song) {
      let index = this.favoriteList.findIndex((item) => {
        return item.id == song.id
      });
      return index == -1 ? 'icon-not-favorite' : 'icon-favorite'
    },
    scrollToCurrentSong(currentSong) {
      let index = this.sequenceList.findIndex((item) => {
          return item.id === this.currentSong.id;
        })
     let dom 
      this.$nextTick(() => {
        //console.log('this.$refs',this.$refs)
        let dom = this.$refs.listItem[index];
        //console.log('dom',dom)
      })
      this.$refs.listContent.scrollToElement(this.$refs.listContent.$children[0].$vnode.elm.childNodes[index], 500)
      //this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 500)


    },
    confirm() {
      this.clearSongList();
      this.hide();
    },
    showAddSong() {
      this.$refs.addSong.show();
    },
    toggleFavorite(song) {
      let index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      if (index == -1)
        this.addFavoriteSong(song)
      else
        this.deleteFavoriteSong(song)
    },
    ...mapActions([
      'deleteSong',
      'clearSongList',
      'addFavoriteSong',
      'deleteFavoriteSong'
    ]),
    ...mapMutations({
      'setCurrentIndex': 'SET_CURRENT_INDEX',
      'setPlayState': 'SET_PLAYING_STATE',
      'setPlayMode': 'SET_PLAY_MODE',
      'setPlayList': 'SET_PLAYLIST'

    })
  },
  mounted() {
    this.$refs.listContent.$el.style.maxHeight = window.innerHeight * 0.7 * 0.63 + "px";
    this.$refs.listContent.refresh();
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id)
        return;
      this.$refs.listContent.refresh();
      this.scrollToCurrentSong(newSong);
    }
  },
  components: {
    Scroll,
    Confirm,
    AddSong
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>