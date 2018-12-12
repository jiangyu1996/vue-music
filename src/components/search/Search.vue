<template>
    <div>
      <search-box ref="searchBox" @searchTxtChange="searchTxtChange"></search-box>
      <div ref="shortcutWrapper" class="shortcut-wrapper">
      <scroll  ref="shortcut" class="shortcut" :data = "concatData">
        <div v-show="!searchTxt">
          <div class="hot-key" >
            <h1 class="title" >热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKeyArray" :class="{ firstHotKey: index===0 }">
                <span>{{item.k}}</span>
              </li> 
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click = 'showConfirm'>
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list  :searches="searchHistory"  
            @selectItem="addQuery" 
            @deleteItem="deleteSearchTxt">
            </search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="searchTxt" ref="searchResult">
      <suggest  ref="suggest" :query="searchTxt" @beforeScrollStart = "beforeScrollStart" @selectSuggestItem="addSearchTxt"></suggest> 
    </div>
    <confirm ref="confirm"  @confirm="clearSearchTxt" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm> 
    <router-view></router-view>
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/SearchBox';
  import Suggest from 'components/suggest/Suggest';
  import Scroll from 'base/scroll/Scroll';
  import SearchList from 'base/search-list/SearchList';
  import Confirm from 'base/confirm/Confirm';


  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {Mixin} from 'common/js/mixin'
  import {mapGetters,mapActions} from 'vuex'
  export default {
    mixins:[Mixin],
    name: 'Search',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        hotKeyArray:[],
        searchTxt:''
      }
    },
     computed:{
      concatData(){
        return this.hotKeyArray.concat(this.searchHistory);
      },
        ...mapGetters([
          'playList',
          'searchHistory'
          ])
      },
    methods:{
        handlerMiniPlayer(){
        let bottom = this.playList.length?'60px':'';
        this.$refs.searchResult.style.bottom = bottom ;
        this.$refs.suggest.refresh();
        this.$refs.shortcutWrapper.style.bottom = bottom ;
        this.$refs.shortcut.refresh();
      },
      addQuery(txt){
        this.$refs.searchBox.setSearchTxt(txt);
      },
      searchTxtChange(searchTxt){
        this.searchTxt = searchTxt;
      },
      beforeScrollStart(){
        this.$refs.searchBox.outBlur();
      },
      showConfirm(){
        this.$refs.confirm.show();
      },
      ...mapActions([
        'addSearchTxt',
        'deleteSearchTxt',
        'clearSearchTxt'
        ])
    },
    watch:{
      searchTxt(newSearchTxt){
        setTimeout(()=>{
          this.$refs.shortcut.refresh();
        },50)
      }
    },
    created(){
      getHotKey().then(res=>{
        if(res.code === ERR_OK){
           this.hotKeyArray = res.data.hotkey.slice(0, 12);
        }
      })  

    },
    components:{
      SearchBox,
      Scroll,
      Suggest,
      SearchList,
      Confirm
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 8px 10px
            margin: 0 10px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
          .firstHotKey
            color:$color-theme
            border:1px solid $color-highlight-background
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
