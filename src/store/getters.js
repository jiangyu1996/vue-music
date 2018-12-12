//这个好像是用来定义获取state里的数据的变量名称
export const singer = state => state.singer

export const isPlaying = state => state.isPlaying

export const fullScreen = state => state.fullScreen

export const mode = state => state.mode

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const currentIndex = state => state.currentIndex

export const currentSong = state => state.playList[state.currentIndex] || {};

export const currentUrl = state => state.currentUrl

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playSongCount = state => state.playList.length

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
