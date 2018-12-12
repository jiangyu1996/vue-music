<template>
<!--   <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in recommendBanner">
        <a :href="item.linkUrl">
        <img class="needsclick" :src="item.picUrl">
      </a>
      </div>
    </div>
  </div>
<div> -->
<div class="wrapper">
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="item in recommendBanner" :key="item.id">
        <a class="swiper-href" :href="item.linkUrl">
          <img class="swiper-img" @load="imgLoaded"  :src="item.picUrl">
        </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
 
  
</template>
<script>
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  data() {
    return {
      swiperOption: { //swiper3
        autoplay: 3000,
        speed: 1000,
        loop: true,
        pagination: '.swiper-pagination',
        observeParents: true,
        observer: true
    },
    isLoaded:false
  }
},
  props: {
    recommendBanner: Array
  },
  methods: {
    imgLoaded(){
      if(!this.isLoaded){
        this.isLoaded = true;
        this.$emit('imgLoaded');
      }
    }
  },
  mounted() {
    //console.log(this.recommendBanner);
  }
}

</script>
<style scoped lang="stylus">
@import "~common/stylus/variable"
.wrapper
  width: 100%
  height: 0
  padding-bottom: 40% 
  overflow:hidden
  background-color:#fff
  .swiper-img
    width:100%
    
</style>
