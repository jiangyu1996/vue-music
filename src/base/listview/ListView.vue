<template>
  <scroll ref="scroll" class="recommend-content" 
  :data="data" 
  :listenScroll="listenScroll" 
  :probeType="probeType"
  @scroll="scroll">
    <div>
      <ul>
        <li v-for="(itemGroup,index) of data" :itemGroup="itemGroup" class="list-group" ref="itemGroup">
          <h2 class="list-group-title">{{itemGroup.title}}</h2>
          <ul>
            <li v-for="(item,index) of itemGroup.items" class="list-group-item" @click = "selectSinger(item)">
              <img class="avatar" v-lazy="item.avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ul class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" >
      <li v-for="(item,index) of alpahbet" 
      :key="index" class="item" 
      :class="{ currentAlphabet: index===currentIndex }" 
      :data-index="index">{{item}}
     </li>
    </ul> 
    <div class="fixedTitle" v-show = "fixedTitle" ref= "fixedTitle">
      {{fixedTitle}}
    </div>
    <div class="loadingIcon" v-show = "!data.length">
      <loading></loading>
    </div>
  </scroll>

</template>
<script>
import { ERR_OK } from 'api/config.js'
import Scroll from 'base/scroll/Scroll'
import {getData} from 'common/js/dom.js'

import Loading from 'base/loading/Loading'
const HOT_SINGER_LEN = 100
const TITLE_HEIGHT = 30
const HOT_NAME = '热门'
export default {
  name: 'ListView',
  data() {
    return {
      currentIndex: 0,
      scrollY : -1,
      //title:''
      offSetTopTitle:-1
    }
  },
  components: { Scroll,Loading},
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let touchIndex = parseInt(getData(e.target,'index'));
      this.touch.y1 = e.touches[0].clientY; 
      this.touch.startIndex = touchIndex; 
      this.scrollToElement(touchIndex);

    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].clientY; 
      let passIndex = Math.floor((this.touch.y2-this.touch.y1)/18);
      this.scrollToElement(this.touch.startIndex+passIndex)

    },
    scrollToElement(index){
      if(!index&&index!=0)
        return 
       else if(index<0)
        index = 0
      else if(index>this.grouplist.length-2)
        index=this.grouplist.length-2
      this.scrollY = -this.grouplist[index];
      this.$refs.scroll.scrollToElement(this.$refs.itemGroup[index], 0)
    },
    calcGroupHeight() {
      this.grouplist = [];
      let groupListHeight = 0;
      this.grouplist.push(0);
      let list = this.$refs.itemGroup;
      list.forEach( (element, index) =>{
        groupListHeight+=element.clientHeight;
        this.grouplist.push(groupListHeight);
      });
    },
    scroll(pos){
      this.scrollY = pos.y;
    },
    selectSinger(item){
      this.$emit('selectSinger',item)
    }
   
  },
  watch:{
    data(){
      setTimeout(()=>{
        this.calcGroupHeight();
      },20)
    },
    scrollY(newScrollY) { 
      var that = this;
      if(newScrollY>0) return 
      const listHeight = this.grouplist;
      for (var i = 0; i < listHeight.length; i++) {
        if(-newScrollY>=listHeight[i]&&-newScrollY<listHeight[i+1]){
          this.offSetTopTitle = newScrollY + listHeight[i+1]
          that.currentIndex = i;
          return
        }
      }
       // 当滚动到底部，且-newY大于最后一个元素的上限
       this.currentIndex = listHeight.length - 2
    },
    offSetTopTitle(newVal){
      //console.log('offSetTopTitle',newVal)
      if(newVal>0&&newVal<TITLE_HEIGHT){
        let fixedTop = newVal-TITLE_HEIGHT;
        //console.log('fixedTop',fixedTop)
        this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }else {
        this.$refs.fixedTitle.style.transform = `translate3d(0, 0px, 0)`
        //console.log('fixedTitle在原位置！！！')
      }
    }
  },
  computed: {
    alpahbet() {
      return this.data.map(item=>item.title.substr(0, 1))
    } ,
    fixedTitle(){
    if (this.scrollY > 0) {
          return ''
        }
        if(this.data[this.currentIndex])
        //console.log('现在的title标题是',this.data[this.currentIndex].title)

        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
  }
},
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.probeType = 3;
    this.grouplist=[]
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
.recommend-content
  height: 100%
  overflow: hidden
  background: $color-background
  .list-shortcut
    //border:1px solid white
    position: absolute
    z-index: 1
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 10px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
    .currentAlphabet
      color:$color-theme
  .list-group
    padding-bottom:20px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left:6%
      margin-bottom:15px
      //border:1px solid blue
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      //border:1px solid red
      display:flex
      align-items:center
      padding:10px 6%
      .avatar
        border-radius:50%
        width: 50px
        height: 50px
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
.loadingIcon
  position: absolute
  width:100%
  top:50%
  transform:translateY(-50%)
.fixedTitle
  position: absolute
  width:100%
  top:0
  padding-left:6%
  height: 30px
  line-height: 30px
  font-size: $font-size-small
  color: $color-text-l
  background: $color-highlight-background
</style>

