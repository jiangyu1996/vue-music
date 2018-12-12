<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
      >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
          <div class="top">
            <div class="back" @click="back">
              <i class="icon-back"></i>
            </div>
            <h1 class="title" v-html = "currentSong.name"></h1>
            <h2 class="subtitle" v-html = "currentSong.singer"></h2>
          </div>
          <div class="middle" @touchstart.prevent="handletouchstart" @touchmove.prevent="handletouchmove" @touchend="handletouchend">
            <div class="middle-l" ref="middleL">
              <div class="cd-wrapper" ref="cdWrapper">
                <div class="cd" :class="rotate">
                  <img class="image" :src="currentSong.image">
                </div>
                </div>
                <div class="playing-lyric-wrapper">
                  <div class="playing-lyric">{{playingLyric}}</div>
                </div>
              </div>
              <scroll class="middle-r" ref="lyricList" :data="lyric&&lyric.lines">
                <div class="lyric-wrapper">
                  <div v-if="lyric">
                    <p ref="lyricLine" class="text" :class="{'current': currentLineNum ===index}" v-for="(line,index) in lyric.lines">{{line.txt}}</p>
                  </div>
                </div>
              </scroll>
            </div>
            <div class="bottom">
              <div class="favorite-center" ref='favorite' @click.stop="toggleFavorite">
                <i :class="isFavorite"></i>
              </div>
              <div class="dot-wrapper">
                <span class="dot" :class="{'active':currentShow==='cd'}"></span>
                <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
              </div>
              <div class="progress-wrapper">
                <span class="time time-l">{{formatTime(currentTime)}}</span>
                <div class="progress-bar-wrapper">
                  <progress-bar :percent="percent" @progressTouchEnd="progressTouchEnd" @clickToPoint="clickToPoint" @progressMove="progressMove">
                  </progress-bar>
                </div>
                <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
              </div>
              <div class="operators" >
                <div class="icon i-left" @click="changeMode">
                  <i :class="modeicon"></i>
                </div>
                <div class="icon i-left" :class="disable">
                  <i  class="icon-prev" @click = "handlerPre"></i>
                </div>
                <div class="icon i-center" @click="togglePlayState" :class="disable"> 
                  <i :class="playIcon"></i>
                </div>
                <div class="icon i-right" :class="disable">
                  <i class="icon-next" @click="handlerNext"></i>
                </div>
                <!--  <div class="icon i-right">
                  <i class="icon-not-favorite"></i>
                </div> -->
                <div class="icon i-right" @click.stop='showPlayList'>
                  <i class="icon-playlist"></i>
                </div>
              </div>
            </div>
          </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" :class="rotate">
        </div>
          <div class="text">
            <h2 class="name" v-html = "currentSong.name"></h2>
            <p class="desc" v-html="currentSong.singer"></p>
          </div>
          <div class="control">
            <i  class="icon-mini" :class="playMiniIcon"  @click.stop = "togglePlayState"></i>
            <!-- <progress-circle :radius="radius" :percent="percent">
          </progress-circle> -->
          </div>
          <div class="control" @click.stop='showPlayList'>
            <i class="icon-playlist"></i>
          </div>
        </div>
    </transition>
    <play-list ref="playlist"></play-list>
    <audio ref="audio" @play="ready" @timeupdate="timeupdate" @ended="ended" @error="error"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { prefixStyle } from 'common/js/dom'
import { playMode } from 'common/js/config'
import Scroll from 'base/scroll/Scroll'
import animations from 'create-keyframe-animation'
import { getMusicVKey, getMusicLyric } from 'api/song.js'
import ProgressBar from 'base/progress-bar/progress-bar'
import PlayList from 'components/playlist/PlayList'


import { getRandomArr } from 'common/js/util'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
import Lyric from 'lyric-parser'


export default {
  name: "Player",
  data() {
    return {
      currentTime: 0,
      lyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      songReady: false
    }
  },
  components: {
    ProgressBar,
    Scroll,
    PlayList
  },
  methods: {
    enter(el,done){
      let animationInfo = this.getPositionScale();
      let animation = {
        0:{
          transform : `translate3d(${animationInfo.x}px,${animationInfo.y}px,0)  scale(${animationInfo.scale})`
        },
        50:{
          transform : `translate3d(0,0,0)  scale(1.2)`
        },
        100:{
           transform : `translate3d(0,0,0)  scale(1)`
        }
      }
      animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 500,
        easing: 'linear',
      }
    })

    animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter(){
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave(el,done){
      this.$refs.cdWrapper.style.transition =  `all 0.5s`
      let animationInfo = this.getPositionScale();
      this.$refs.cdWrapper.style[transform] =  `translate3d(${animationInfo.x}px,${animationInfo.y}px,0)  scale(${animationInfo.scale})`
      this.$refs.cdWrapper.addEventListener('transitionend',done)
    },
    afterLeave(){
      this.$refs.cdWrapper.removeEventListener('transitionend',()=>{})
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style[transform] = '';

    },
    getPositionScale(){
      let x = -(window.innerWidth*0.8*0.5-40);
      let y = window.innerHeight-30-window.innerWidth*0.8*0.5-80;
      let scale = 40/window.innerWidth*0.8;
      return {x,y,scale}
    },
    toggleFavorite() {
      let index = this.favoriteList.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      if (index == -1)
        this.addFavoriteSong(this.currentSong)
      else
        this.deleteFavoriteSong(this.currentSong)

    },
    handletouchstart(e) {
      this.touch.initialized = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.startY = e.touches[0].pageY;
      this.touch.percent = null;
    },
    handletouchmove(e) {
      if (!this.touch.initialized)
        return
      let changeX = e.touches[0].pageX - this.touch.startX;
      let changeY = e.touches[0].pageY - this.touch.startY;

      if (Math.abs(changeX) <= Math.abs(changeY)) {
        return;
      }
      let left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
      let offsetWidth = Math.min(0, Math.max(-window.innerWidth, changeX + left));

      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);

      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.favorite.style.opacity = (1 - this.touch.percent);
      this.$refs.middleL.style.opacity = (1 - this.touch.percent);

    },
    handletouchend(e) {
      if (!this.touch.percent)
        return
      let offsetWidth = 0;
      let opacity = 0;
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          opacity = 1;
          this.currentShow = 'cd'
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }

      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = '500ms';
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.favorite.style.opacity = opacity;
      this.touch.initialized = false;
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlayState() {
      if(!this.songReady)
        return
      this.setPlayState(!this.isPlaying)
    },
    handlerPre() {
      if(!this.songReady)
        return
      if (this.lyric)
        this.lyric.seek(0);
      this.$refs.audio.currentTime = 0;
      let currentIndex = this.currentIndex;
      currentIndex = currentIndex - 1;
      if (currentIndex == -1)
        currentIndex = this.playList.length - 1;
      this.setCurrentIndex(currentIndex);
      if (!this.isPlaying) {
        this.togglePlayState();
      }
    },
    handlerNext() {
      if(!this.songReady)
        return
      if (this.lyric)
        this.lyric.seek(0);
      this.$refs.audio.currentTime = 0;
      this.currentTime = 0;
      let currentIndex = this.currentIndex;
      currentIndex = currentIndex + 1;
      if (currentIndex >= this.playList.length)
        currentIndex = 0;
      this.setCurrentIndex(currentIndex);
      if (!this.isPlaying) {
        this.togglePlayState();
      }
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime >= this.currentSong.duration ? this.currentSong.duration : e.target.currentTime
    },
    formatTime(currentTime, n = 2) {
      let minutes = (currentTime / 60) | 0;
      let seconds = (currentTime | 0) % 60;
      for (var i = seconds.toString().length; i < n; i++) {
        seconds = "0" + seconds;
      }
      return `${minutes}.${seconds}`;
    },
    progressTouchEnd(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
      if (!this.isPlaying)
        this.setPlayState(true);
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
    ready() {
      this.songReady = true;
      this.savePlayHistory(this.currentSong);
    },
    ended() {
      this.currentTime = 0;
      this.$refs.audio.currentTime = 0;
      this.setSongDuration = 0;
      if (this.mode == playMode.loop) {
        if (this.lyric) {
          this.lyric.stop();
          this.lyric.seek(0);
        }
        this.$refs.audio.play();
      } else {
        this.handlerNext();
      }
    },
    error() {
      if (this.lyric) {
        this.lyric.stop();
        this.lyric.seek(0);
      }
      this.songReady = true
    },
    clickToPoint(percent) {
      if (this.lyric) {
        this.lyric.seek(this.currentSong.duration * 1000 * percent)
      }
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
      if (!this.isPlaying)
        this.setPlayState(true);
    },
    getLyric() {
      this.currentSong.getLyric().then((resLyric) => {
        if(resLyric!=this.currentSong.lyric)
          return
        this.lyric = new Lyric(resLyric, this.handlerLyric);
        if (this.isPlaying) {
          this.lyric.play();
        } 
      }).catch((e) => {
          //console.log('catch lyric exception',e)
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        });
    },
    handlerLyric({ lineNum, txt }) {
      if(!this.lyric) 
        return
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[lineNum - 5], 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    progressMove(percent) {
      this.currentTime = this.currentSong.duration * percent;
      if (this.lyric) {
        this.lyric.seek(this.currentSong.duration * 1000 * percent)
      }
    },
    showPlayList() {
      this.$refs.playlist.show();
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayState: 'SET_PLAYING_STATE',
      setMusicUrl: 'SET_MUSIC_URL',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setSongDuration: 'SET_SONG_DURATION'
    }),
    ...mapActions([
      'savePlayHistory',
      'addFavoriteSong',
      'deleteFavoriteSong'
    ])
  },
  computed: {
    rotate() {
      return this.isPlaying ? 'play' : 'play pause'
    },
    playIcon() {
      return this.isPlaying ? 'icon-pause' : 'icon-play'
    },
    playMiniIcon() {
      return this.isPlaying ? 'icon-pause-mini' : 'icon-play-mini'
    },
    percent() {
      return parseFloat((this.currentTime / this.currentSong.duration).toFixed(9));
    },
    modeicon() {
      return this.mode == 0 ? 'icon-sequence' : this.mode == 1 ? 'icon-loop' : 'icon-random';
    },
    disable(){
      return this.songReady?'':'disable'
    },
    isFavorite() {
      let index = this.favoriteList.findIndex((item) => {
        return item.id == this.currentSong.id
      });
      return index == -1 ? 'icon-not-favorite' : 'icon-favorite'
    },
    ...mapGetters([
      'currentIndex',
      'isPlaying',
      'fullScreen',
      'currentSong',
      'playList',
      'sequenceList',
      'currentUrl',
      'mode',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying(newState) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newState ? audio.play() : audio.pause()
      })
      if (this.lyric)
        this.lyric.togglePlay();
    },
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id == oldSong.id)
        return
      if (this.lyric) {
        this.lyric.stop();
        this.lyric = null;

      }
      clearTimeout(this.timer);
      this.currentTime = 0;
      this.songReady = false;
      let mid = newSong.mid

      this.$nextTick(() => {
        getMusicVKey(mid).then((res) => {
          this.getLyric()
          this.setMusicUrl({ mid, res })
        }).then(() => {
          this.$refs.audio.src = this.currentUrl;
        }).then(() => {
            this.$refs.audio.play()
        })
      })



    }
  },
  mounted() {
    this.touch = {};
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .favorite-center
          text-align: center
          font-size: 30px
          margin-bottom:30px
          .icon-favorite
            color:#d93f30
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 20px 0 0
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
