<template>
  <transition name="topTip">
    <div ref="topTip" v-show='showFlag' @click.stop="hide" class="tipWrapper">
      <slot></slot>
    </div>
  </transition>
</template>
<script type="text/javascript">
export default {
  name: "TopTip",
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    tipTxt: {
      type: String,
      default: '操作成功！'
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.hide();
      }, 1000)
    },
    hide() {
      this.showFlag = false;
    }
  }
}

</script>
<style type="text/css" lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.tipWrapper 
	position:fixed 
	top:0 
	width:100% 
	text-align:center 
	z-index: 500 
	background: $color-dialog-background
.topTip-enter-active,.topTip-leave-active
	transition:all  0.5s
.topTip-enter,.topTip-leave-to
	transform:translate(0,-100%)
	
</style>
