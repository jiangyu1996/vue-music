webpackJsonp([6],{BRgg:function(t,i,n){"use strict";i.a=function(){var t=o()({},s.b,{needNewCode:1,platform:"h5",uin:"0"});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",t,s.c)},i.b=function(t){var i=o()({},s.b,{page:"detail",uin:0,platform:"platform",needNewCode:1,tpl:3,type:top,topid:t,g_tk:5381,_:1543325414247});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",i,s.c)};var e=n("woOf"),o=n.n(e),s=n("T452"),a=n("Gak4"),c=n("mtWM");n.n(c)},Q4HJ:function(t,i){},ZSaC:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=n("Dd8w"),o=n.n(e),s=n("T452"),a=(n("GQaK"),n("PvFA")),c=n("BRgg"),r=n("kvay"),p=n("NYxO"),u={name:"TopList",components:{MusicList:r.a},data:function(){return{topSongList:[],showRank:!0}},computed:o()({topTitle:function(){return this.topList.topTitle},picUrl:function(){return this.topSongList.length?this.topSongList[0].image:this.topList.picUrl}},Object(p.c)(["topList"])),methods:{getTopListDetail:function(){var t=this;Object(c.b)(this.topList.id).then(function(i){i.code===s.a&&i.songlist.forEach(function(i,n){i.data.songid&&i.data.albumid&&t.topSongList.push(Object(a.a)(i.data,"songVkey"))})})}},created:function(){this.getTopListDetail(),this.topList.id||this.$router.back()},mounted:function(){}},f={render:function(){var t=this.$createElement,i=this._self._c||t;return i("transition",{attrs:{name:"slide"}},[i("music-list",{attrs:{songs:this.topSongList,title:this.topTitle,bgImage:this.picUrl,showRank:this.showRank}})],1)},staticRenderFns:[]};var l=n("VU/8")(u,f,!1,function(t){n("Q4HJ")},"data-v-03b4f8e3",null);i.default=l.exports}});
//# sourceMappingURL=6.3c14bb549f98746404c5.js.map