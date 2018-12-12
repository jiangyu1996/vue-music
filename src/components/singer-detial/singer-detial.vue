<template>
  <transition name="slide">
    <music-list :songs="songList" :title="singName" :bgImage="singImg"></music-list>
  </transition>
</template>
<script>
import { getSingerDetial } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import BScroll from 'better-scroll'
import Singer from 'common/js/singer'
import {createSong} from 'common/js/song'
import { getMusicVKey } from 'api/song.js'
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
export default {
  name: 'SingerDetial',
  components: { MusicList },
  data() {
    return {
      songList: []
    }
  },
  computed: {
    singName() {
      return this.singer.name
    },
    singImg() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  methods: {},
  created() {
    getSingerDetial(this.singer.id).then(res => {
      if (res.code === ERR_OK) {
        res.data.list.forEach((song, index) => {
          if (song.musicData.songid && song.musicData.albummid) { 
              this.songList.push(createSong(song.musicData, 'songVkey')); 
          }

          //this.songList.push(createSong(element.musicData))
        });
      }

    });
    if (!this.singer.id)
      this.$router.back();
  },
  mounted() {
    //let wrapper = this.$refs.singerWrapper
    //this.scroll = new BScroll(wrapper)
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
