<template>
  <scroll class="suggest" ref="scroll" :data="searchList" :pullup="pullup" @scrollToEnd="searchMore" 
  :beforeScrollStart = "beforeScrollStart" @beforeScrollStart = "listenScrollBeforeStart">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) of searchList" @click="selectItem(item)">
        <div class="icon">
          <i :class="isSingOrSong(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="processItem(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title="加载中"></loading>
    </ul>
    <div class="noResultWrapper" v-show="!hasMore&&!searchList.length">
      <no-result :title="title"></no-result>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/Scroll'
  import Loading from 'base/loading/Loading'
  import Singer from 'common/js/singer'
  import NoResult from 'base/no-result/NoResult'

  import { getKeyWordResult } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import { mapMutations, mapActions } from 'vuex'

const PER_PAGE = 20
const TYPE_SINGER = 'singer'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      pageNumber: 1, 
      searchList: [],
      pullup: true,
      hasMore: false,
      title: '抱歉，暂无查询结果',
      beforeScrollStart:true
    }
  },
  methods: {
    _processSearchResult(data) {
      this.searchList = [];
      this.$refs.scroll.scrollTo(0, 0)
      let ret = this.proCessSearchList(data);
      return ret;
    },
    searchMore() {
      if (!this.hasMore)
        return;
      this.pageNumber++; 
      getKeyWordResult(this.query, this.pageNumber, false, PER_PAGE).then(res => {
        if (ERR_OK === res.code) {
          this.searchList = this.searchList.concat(this.proCessSearchList(res.data));
          this.checkMore(res);
        }
      })
    },
    checkMore(res) {
      if (res.data.song.curpage * PER_PAGE >= res.data.song.totalnum) {
        this.hasMore = false;
      } 

    },
    processItem(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    isSingOrSong(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer(item.singermid, item.singername);
        this.setSinger(singer);
        this.$router.push({
          path: `/Search/${item.singerid}`
        })
      } else {
        this.insertSong(item);
      }
      this.$emit('selectSuggestItem',this.query)
    },
    listenScrollBeforeStart(){
      this.$emit('beforeScrollStart')
    },
    proCessSearchList(data){
      let ret = [];
      if (data.zhida.singername && data.zhida.singermid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song.list) {
        data.song.list.forEach(function(song, index) {
          if (song.songid && song.albumid) {
            ret.push(createSong(song));
          }
        });
      }
      return ret;

    },
    refresh(){
      this.$refs.scroll.refresh();
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newQuery) {
      if (newQuery) {
        this.hasMore = true;
        this.pageNumber = 1;
        getKeyWordResult(newQuery, this.pageNumber, this.showSinger, PER_PAGE).then(res => {
          if (ERR_OK === res.code) {
            this.searchList = this._processSearchResult(res.data);
            this.checkMore(res);
          }
        })

      }
    },
    searchList(newSearchList){
      //console.log('newSearchList',newSearchList)
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .noResultWrapper
      position:absolute
      width:100%
      top:50%
      text-align:center
      transform:translateY(-50%)
    
</style>