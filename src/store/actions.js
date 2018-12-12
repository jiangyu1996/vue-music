//这个是调用mutation的方法的action文件
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { getRandomArr } from 'common/js/util'
import { saveSearchHistory, deleteSearchHistory, clearSearchHistory, addPlayHistory, addFavoriteItem, deleteFavoriteItem } from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id == song.id;
  })
}

export const selectPlay = function({ commit, state }, { list, index }) {
  let song = list[index];
  if (state.mode == playMode.random) {
    list = getRandomArr(list);
    index = findIndex(list, song)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const setRandomPlay = function({ commit, state }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  let playList = getRandomArr(list);
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
}


export const insertSong = function({ commit, state }, song) {
  let playList = state.playList.slice();
  let seqList = state.sequenceList.slice();
  let findExistIndex = findIndex(playList, song);
 
  let currentIndex = state.currentIndex;
  let currentSong = playList[state.currentIndex];
  currentIndex++;
  playList.splice(currentIndex, 0, song);
  if (findExistIndex > -1) { //本来已经存在
    if (findExistIndex < currentIndex) {
      playList.splice(findExistIndex, 1);
      currentIndex--;
    } else {
      playList.splice(findExistIndex+1, 1);
    }
  }
  let seqCurrentIndex = findIndex(seqList, currentSong);
  let findSqExistIndex = findIndex(seqList, song);
  seqCurrentIndex++;
  seqList.splice(seqCurrentIndex, 0, song);

  if (findSqExistIndex > -1) { //本来已经存在
    if (findSqExistIndex < seqCurrentIndex)
      seqList.splice(findSqExistIndex, 1);
    else
      seqList.splice(findSqExistIndex + 1, 1);
  }
  console.log(findIndex(playList,song)+'......')
  console.log(findIndex(seqList,song)+'......')
  console.log(playList[2])
  console.log(seqList[2])

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, seqList)
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  console.log('********************************')

}


export const addSearchTxt = function({ commit, state }, searchTxt) {
  commit(types.SET_SEARCH_HISTORY, saveSearchHistory(searchTxt))
}

export const deleteSearchTxt = function({ commit, state }, deleteSearchTxt) {
  commit(types.SET_SEARCH_HISTORY, deleteSearchHistory(deleteSearchTxt))
}

export const clearSearchTxt = function({ commit, state }) {
  commit(types.SET_SEARCH_HISTORY, clearSearchHistory())
}


export const deleteSong = function({ commit, state }, song) {
  let playList = state.playList.slice();
  let seqList = state.sequenceList.slice();
  let findPIndex = findIndex(playList, song);
  let currentIndex = state.currentIndex;

  playList.splice(findPIndex, 1);
  if (findPIndex < currentIndex || currentIndex === playList.length) {
    currentIndex--;
  }

  let findSeqIndex = findIndex(seqList, song);
  seqList.splice(findSeqIndex, 1);

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, seqList)
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAYING_STATE, playList.length)

}


export const clearSongList = function({ commit, state }) {

  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, false)

}


export const savePlayHistory = function({ commit, state }, song) {
  commit(types.SET_PLAY_HISTORY, addPlayHistory(song))
}


export const addFavoriteSong = function({ commit, state }, song) {
  commit(types.SET_FAVORITE_LIST, addFavoriteItem(song))
}

export const deleteFavoriteSong = function({ commit, state }, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavoriteItem(song))
}
