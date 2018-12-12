//这和是用来存放公共数据的state仓库
import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  singer: {},
  isPlaying: false,
  fullScreen: false,
  mode: playMode.sequence,
  playList: [],
  sequenceList: [],
  currentIndex: -1,
  currentUrl: "",
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
