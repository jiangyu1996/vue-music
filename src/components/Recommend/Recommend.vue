<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recommendSongList">
      <div>
      <div v-if="recommendBanner.length" class="slider-wrapper" ref="sliderWrapper">
        <slider :recommendBanner="recommendBanner" @imgLoaded = "imgLoaded">
        </slider>
      </div>
      <!-- 歌单专辑列表 -->
      <h1 class="list-title">热门歌单推荐</h1>
      <ul class="jiange">
        <li v-for="(item,index) of recommendSongList" :key="item.dissid" class="recommendAlbum" @click = "selectItem(item)">
          <div class="item-left">
            <img v-lazy="item.imgurl" class="item-left-img">
          </div>
          <div class="item-right">
              <p class="item-title" v-html="item.creator.name"></p>
              <p class="item-desc" v-html="item.dissname"></p>
          </div>  
        </li>
      </ul>
    </div>
  </scroll>
  <div class="loadingIcon" v-show = "!recommendSongList.length">
    <loading></loading>
  </div>
  <router-view></router-view>
  </div>
</template>
<script>
import { getRecommendBanner,getRecommendSongList } from 'api/recommend.js'
import { ERR_OK } from 'api/config.js'
//import BScroll from 'better-scroll' 
import Scroll from 'base/scroll/Scroll'
import Slider from 'base/slider/Slider'
import Loading from 'base/loading/Loading'
import {mapMutations} from 'vuex'
import {Mixin} from 'common/js/mixin'

export default {
  mixins:[Mixin],
  name: 'Recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommendBanner: [],
      recommendSongList:[]
    }
  },
  methods: {
    getRecommend() {
      getRecommendBanner().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendBanner = res.data.slider;
        }
      });
    },
    getSongList() {
      getRecommendSongList().then(res=>{
        this.recommendSongList = res.data.list;
      });
    },
    imgLoaded(){
      this.$refs.scroll.refresh();
    },
    selectItem(item){
      this.$router.push({
          path: `/Recommend/${item.dissid}`
        })
        this.setDisc(item);
    },
    handlerMiniPlayer(newPlayList){
      let bottom = newPlayList.length>0?'60px':'0px';
      this.$refs.recommend.style.bottom = bottom ;
      this.$refs.scroll.refresh();
    },
    ...mapMutations({
      'setDisc':'SET_DISC'
    })
  },
  created() {
    this.getRecommend();
    this.getSongList(); 
  } 
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.recommend 
  position: absolute 
  width: 100% 
  left:0
  right:0
  top: 88px 
  bottom: 0 
  overflow: hidden
  .recommend-content
    height: 100%
    overflow: hidden
    .list-title
      height: 65px
      line-height: 65px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
    .jiange
      padding-bottom:10px
      .recommendAlbum
        margin:0 auto 20px  
        width:90%
        height:60px
        overflow:hidden
        display:flex
        //border:1px solid red
        box-sizing:border-box;
        .item-left
          width:60px
          height:60px
          overflow:hidden
          //border:1px solid yellow
          .item-left-img
            width:100%
        .item-right
          padding-top:5px
          padding-left:15px
          line-height:25px
          position:relative
          //border:1px solid blue
          .item-title
            margin-bottom: 5px
            color: $color-text
            font-size:15px
          .item-desc
            color: $color-text-d
            font-size:14px
.loadingIcon
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
      
    
</style>
