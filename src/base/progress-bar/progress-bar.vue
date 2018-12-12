<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
     <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd" >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
   import {prefixStyle} from 'common/js/dom.js'
   const transform = prefixStyle('transform');
   const progressBtnWidth = 16
export default {
	name :"Progress-bar",
  props:{
    percent:Number
  }, 
 	methods: {
 		progressClick(e){
      this.transMove(e.pageX -  this.$refs.progress.getBoundingClientRect().left);
      let progress = this.$refs.progress.clientWidth;
      let progressBar = this.$refs.progressBar.clientWidth - 16;
      let percent = progress/progressBar;
      this.$emit('clickToPoint',percent)
 		},
		progressTouchStart(e){ 
      this.touch.startX = e.touches[0].pageX;
      this.touch.leftX = this.$refs.progress.clientWidth;
      this.touch.iniaited = true;
		},
		progressTouchMove(e){
      if(!this.touch.iniaited)
        return
 			this.touch.change = e.touches[0].pageX-this.touch.startX;
      //console.log('this.touch.change',this.touch.change)
      let offsetWidth = this.touch.leftX+this.touch.change;
      offsetWidth = Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,Math.max(offsetWidth,0));
      this.$emit('progressMove',offsetWidth/(this.$refs.progressBar.clientWidth - progressBtnWidth));

      this.transMove(offsetWidth);
		},
		progressTouchEnd(){
      let percent = this.$refs.progress.clientWidth/(this.$refs.progressBar.clientWidth-16);
      this.$emit('progressTouchEnd',percent)
 			this.touch.iniaited = false;
      
		},
    transMove(offsetWidth){
      this.$refs.progress.style.width= `${offsetWidth}px`;
      this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`;
    }
	},
  watch:{
    percent(newPercent){
      newPercent = newPercent>=1?1:newPercent
      //console.log(newPercent,(this.$refs.progressBar.clientWidth-progressBtnWidth)*newPercent);
      if(newPercent>0&&!this.touch.iniaited){
        let offsetWidth = (this.$refs.progressBar.clientWidth-progressBtnWidth)*newPercent;
        this.transMove(offsetWidth);
      }
    }
  },
  created(){
    this.touch = {}
  }
}
</script>
<style type="text/css" lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
		  

</style>