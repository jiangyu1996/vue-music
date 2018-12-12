<template>
  <transition name="slide">
    <music-list :songs="songList" :title="singName" :bgImage="singImg"></music-list>
  </transition>
</template>
<script>
import { getDiscDetial } from 'api/recommend.js'
import { ERR_OK } from 'api/config.js'
import BScroll from 'better-scroll'
import Singer from 'common/js/singer'
import {createSong} from 'common/js/song'

import { getMusicVKey } from 'api/song.js'
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
export default {
  name: 'Disc',
  components: { MusicList },
  data() {
    return {
      songList: []
    }
  },
  computed: {
    singName() {
      return this.disc.dissname
    },
    singImg() {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
  },
  methods: {},
  created() {
    getDiscDetial(this.disc.dissid).then(res => {
      if (res.code === ERR_OK) {
        let recommendList = res.cdlist[0].songlist;
        recommendList.forEach((musicData, index) => {
          if (musicData.songid && musicData.albumid) { 
              this.songList.push(createSong(musicData, 'songVkey')); 
          }
        });
      }

    });
    if (!this.disc.dissid)
      this.$router.back();
  },
  mounted() { 
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  
</style>
