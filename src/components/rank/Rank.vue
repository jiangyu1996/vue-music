<template>
  <div class="rankWrapper" ref="rank">
    <scroll ref="scroll" class="scroll">
      <ul>
        <li class="item" v-for="(item,key,index) in topList" @click = "selectedItem(item)">
          <div class="rankImgWrapper">
            <img class="rankImg" v-lazy="item.picUrl">
          </div>
            <ul class="songlist">
              <li v-for="(song,index) in item.songList" class="song">
                <span>{{index+1}}</span>
                <span>{{song.songname}} - {{song.singername}}</span>
              </li>
            </ul>
        </li>
      </ul>
    </scroll>
    <div class="loading-container" v-show="!topList.length">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {mapMutations,mapGetters} from 'vuex'
import {Mixin} from 'common/js/mixin'
export default {
  mixins:[Mixin],
  name: 'Rank',
  data() {
    return {
      topList:[]
    }
  },
  methods:{
    selectedItem(item){
      this.setTopList(item);
      this.$router.push({ 
        path:`/Rank/${item.id}`
      })
    },
    handlerMiniPlayer(list){
      let bottom = list.length?'60px':'px'
      this.$refs.rank.style.bottom = bottom ;
      this.$refs.scroll.refresh();
    },
    ...mapMutations({
      setTopList:'SET_TOP_LIST'
      })  
  },
  components: {
    Scroll,
    Loading
  },
  created(){
    //getTopList
    getTopList().then(res=>{
      if(res.code === ERR_OK){
        this.topList = res.data.topList
      }
    })
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.rankWrapper
  position:fixed
  top:88px
  bottom:0
  right:0
  left:0
  .scroll
    height:100%
    overflow:hidden
    .item
      padding-top:20px
      display:flex
      margin:0 20px
      &:last-child
        padding-bottom: 20px
      //background-color:red
      .rankImgWrapper
        width:100px
        height:100px
        .rankImg
          width:100px
      .songlist
        flex:1
        display:flex
        flex-direction: column 
        justify-content: center
        padding:0 20px
        background: $color-highlight-background
        color: $color-text-d
        font-size: $font-size-small
        overflow:hidden
        .song
          line-height: 26px 
          no-wrap()
  .loading-container
    position: absolute;
    top:50%;
    left:50%;
    width:100%;
    transform:translate(-50%,-50%);
    text-align: center;
          
</style>
