//这个好像是用来具体执行mutation方法的
import * as types from './mutation-types.js'
import { currentSong } from './getters.js'
const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, boolean) {
    state.isPlaying = boolean
  },
  [types.SET_FULL_SCREEN](state, boolean) {
    state.fullScreen = boolean
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_MUSIC_URL](state, { mid, res }) {
    state.currentUrl = `http://isure.stream.qqmusic.qq.com/C400${mid}.m4a?guid=9550970620&vkey=${res.data.items[0].vkey}&uin=0&fromtag=66`;
    //6F77A8396DA6E07305418498B207BC63D06A8A0CD1EA4B44946F8923B0AA833D2128CCFDEDDE156528F910841A50232EB0B8A47DA2AEF46F
  },
  [types.SET_SONG_DURATION](state, duration) {
    state.currentSong.duration = duration
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_PLAY_HISTORY](state, playHistory) {
    state.playHistory = playHistory
  },
   [types.SET_FAVORITE_LIST](state, favoriteList) {
    state.favoriteList = favoriteList
  }


}

export default matutaions
