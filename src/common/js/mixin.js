import { mapGetters } from 'vuex'

export const Mixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  mounted() {
    this.handlerMiniPlayer(this.playList);
  },
  activated() {
    this.handlerMiniPlayer(this.playList);
  },
  watch: {
    playList(newPlayList) {
      this.handlerMiniPlayer(newPlayList);
    }
  },
  methods: {
    handlerMiniPlayer(newPlayList) {
      throw new Error('组件未实现处理mini播放器方法')
    }
  }
}
