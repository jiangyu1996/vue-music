<template>
  <transition name="slide">
    <music-list :songs="topSongList" :title="topTitle" :bgImage="picUrl" :showRank="showRank"></music-list>
  </transition>
</template>
<script>
import { ERR_OK } from 'api/config.js'
import BScroll from 'better-scroll'
import { createSong } from 'common/js/song'
import { getTopListDetail } from 'api/rank.js'
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
export default {
  name: 'TopList',
  components: { MusicList },
  data() {
    return {
      topSongList: [],
      showRank: true
    }
  },
  computed: {
    topTitle() {
      return this.topList.topTitle
    },
    picUrl() {
      return this.topSongList.length?this.topSongList[0].image:this.topList.picUrl
    },
    ...mapGetters(['topList'])
  },
  methods: {
    getTopListDetail() {
      getTopListDetail(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          let topList = res.songlist;
          topList.forEach((song, index) => {
            if (song.data.songid && song.data.albumid) {
              this.topSongList.push(createSong(song.data, 'songVkey'));
            }
          });
        }
      });
    }
  },
  created() {
    this.getTopListDetail();
    if (!this.topList.id)
      this.$router.back();
  },
  mounted() {}
}

</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  
</style>

