<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songs" @click="selectItem(song,index)">
        <div class="songlist-rank" v-show="showRank">
          <span :class="getRankImg(index)">{{getRankTxt(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{song.singer+"."+song.album}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: []
    },
    showRank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selectItem', item, index)
    },
    getRankImg(index) {
      if (index <= 2) {
        return ` topIcon topIcon_${index}`
      }
    },
    getRankTxt(index) {
      if (index > 2)
        return index + 1;
    }
  },
  watch:{
    songs(newSongs){
      //console.log('newSongs',newSongs)
    }
  },
  mounted() {
    //console.log(this.recommendBanner);
  }
}

</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.song-list
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    font-size: $font-size-medium
    .content
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        no-wrap()
        font-size: 100%;
        color: $color-text
      .desc
        no-wrap()
        margin-top: 4px
        font-size: 100%;
        color: $color-text-d
    .songlist-rank
      width:25px
      height:24px
      margin-right:25px
      background-size: 25px 24px;
      text-align: center
      .topIcon
        display: inline-block;
        width: 25px;
        height: 24px;
        margin:auto 0;
        background-size: 25px 24px;
      .topIcon_0
        bg-image('first')
      .topIcon_1
        bg-image('second')
      .topIcon_2
        bg-image('third')
          
</style>
