<template>
  <div class="singerWrapper" ref="singerWrapper">
    <list-view :data="singerList" ref="list" @selectSinger = "selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import BScroll from 'better-scroll'
import Singer from 'common/js/singer'
import ListView from 'base/listview/ListView'
import {mapMutations} from 'vuex'
import {Mixin} from 'common/js/mixin'


const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  mixins:[Mixin],
  name: 'Singer',
  components: { ListView },
  data() {
    return {
      singerList: []
    }
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this.processSingerList(res.data.list)
        }
      });
    },
    processSingerList(list) {
      let map = {}
      let hot = {
        title: HOT_NAME,
        items: []
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          let singer = new Singer(item.Fsinger_mid, item.Fsinger_name);
          hot.items.push(singer);
        }
        if (!map[item.Findex]) {
          map[item.Findex] = {
            title: item.Findex,
            items: []
          }
          map[item.Findex].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        } else {
          map[item.Findex].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }

      });
      map.hot = hot
      let retArr = []
      let hotArr = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          retArr.push(val)
        } else if (val.title === HOT_NAME) {
          hotArr.push(val)
        }
      }
      retArr.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hotArr.concat(retArr) 
    },
    selectSinger(item){
      //console.log('jianting ',item)
      this.$router.push({
          path: `/Singer/${item.id}`
        })
        this.setSinger(item);
    },
    handlerMiniPlayer(newPlayList){
      let bottom = newPlayList.length>0?'60px':'0px';
      this.$refs.singerWrapper.style.bottom = bottom ;
      //this.$refs.list.refresh();
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  },
  created() {
    this._getSingerList();
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
@import "~common/stylus/mixin"
.singerWrapper 
  position: absolute 
  width: 100% 
  left:0
  right:0
  top: 88px 
  bottom: 0 
  overflow: hidden
</style>
