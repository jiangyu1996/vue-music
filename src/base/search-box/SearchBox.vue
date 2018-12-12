<template>
  <div class="SearchWrapper">
    <i class="icon-search"></i>
    <input class="searchBox" type="text" v-model="searchTxt" ref = "searchTxt" :placeholder="placeholder">
    <i class="icon-dismiss" @click="clear"></i>
  </div>
</template>
<script>
  import { addClass } from 'common/js/dom'
  import { debounce } from 'common/js/util'

import BScroll from 'better-scroll'
export default {
  name: 'SearchBox',
  data() {
    return {
      searchTxt: ''
    }
  },
  props: {
    placeholder:{
      type:String,
      default:"搜索歌手、歌曲"
    }
  },
  methods: {
    clear() {
      this.searchTxt = '';
    },
    setSearchTxt(txt){
      this.searchTxt = txt;
    },
    outBlur(){
    this.$refs.searchTxt.blur();
  }
  },
  created() {
    this.$watch('searchTxt',debounce((newQuery)=>{
      this.$emit('searchTxtChange',newQuery)
    },500))
  }  

}

</script>
<style scoped lang="stylus">
@import "~common/stylus/variable"
.SearchWrapper
  border-radius:6px
  margin:20px
  padding:0 6px
  background-color: $color-highlight-background
  display:flex
  align-items:center
  height:40px
  .icon-search
    font-size: 24px
    color:$color-background
  .searchBox
    height:25px
    background-color: $color-highlight-background
    flex:1
    font-size: $font-size-medium
    outline:none
    margin:0 8px
    color:$color-text
    &::placeholder
      color: $color-text-d
   .icon-dismiss
      font-size: 16px
      color: $color-background
    
</style>
