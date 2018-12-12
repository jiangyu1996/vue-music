<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul" :refreshDelay="120">
      <li :key="index" class="search-item" @click="selectItem(item)" v-for="(item,index) in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteItem(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
     selectItem(item){
      this.$emit('selectItem',item);
     },
     deleteItem(item){
      this.$emit('deleteItem',item);
     }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-list
    .search-item
      display: flex
      align-items: center
      height: 35px
      overflow: hidden
      font-size: 15px;
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
      .icon
        width:25px
        text-align: right
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>