import storage from 'good-storage'

const SEARCH_KEY = 'SearchHistory'
const SEARCH_MAX_LENGTH = 15;

const PLAY_HISTORY = 'PlayHistory'
const PLAY_MAX_LENGTH = 50;

const FAVORITE_LIST = 'FavoriteList'



function insertArray(arr, key, compareFun, MAX_LENGTH) {
  let index = arr.findIndex(compareFun);
  if (index == 0)
    return;
  if (index > 0)
    arr.splice(index, 1);
  arr.unshift(key);
  if (MAX_LENGTH && arr.length > MAX_LENGTH)
    arr.pop();
}

function unshiftArray(arr, key, compareFun) {
  let index = arr.findIndex(compareFun);
  if (index >= 0) {
    arr.splice(index, 1);
  }
}

//SearchHistory
export function saveSearchHistory(key) {
  //storage.clear();
  let searchHistroy = storage.get(SEARCH_KEY, []).slice();
  insertArray(searchHistroy, key, (item) => item == key, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, searchHistroy)
  return searchHistroy
}

export function deleteSearchHistory(key) {
  //storage.clear();
  let searchHistroy = storage.get(SEARCH_KEY, []).slice();
  unshiftArray(searchHistroy, key, (item) => item == key);
  storage.set(SEARCH_KEY, searchHistroy)
  return searchHistroy
}

export function clearSearchHistory() {
  storage.remove(SEARCH_KEY);
  return [];
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}


//PlayHistory
export function addPlayHistory(key) {
  //storage.clear(); 
  let playHistroy = storage.get(PLAY_HISTORY, []).slice();
  insertArray(playHistroy, key, (item) => item.name == key.name, PLAY_MAX_LENGTH);
  storage.set(PLAY_HISTORY, playHistroy)
  return playHistroy
}

export function clearPlayHistory() {
  storage.remove(PLAY_HISTORY);
  return [];
}

export function loadPlay() {
  return storage.get(PLAY_HISTORY, [])
}



//favoriteList
export function addFavoriteItem(song) {
  //storage.clear(); 
  let favoriteList = storage.get(FAVORITE_LIST, []).slice();
  insertArray(favoriteList, song, (item) => item.id == song.id);
  storage.set(FAVORITE_LIST, favoriteList)
  return favoriteList
}

export function deleteFavoriteItem(song) {
  //storage.clear();
  let favoriteList = storage.get(FAVORITE_LIST, []).slice();
  unshiftArray(favoriteList, song, (item) => item.id == song.id);
  storage.set(FAVORITE_LIST, favoriteList)
  return favoriteList
}

export function loadFavorite() {
  return storage.get(FAVORITE_LIST, [])
}
