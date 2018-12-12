import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp.js'
import axios from 'axios'
//获取歌曲vkey
export function getMusicVKey(songmid) {
  
    const url = '/api/getPlayMusicKey'
    const paramObject = Object.assign({},commonParams, {
      songmid: songmid,
      filename: 'C400' + songmid + '.m4a',
      guid: 9550970620,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      cid: 205361747,
      uid: 0,
      g_tk: 1928111839
    })
    return axios.get(url, { params: paramObject }).then((res) => {
      //console.log('获取vkey的res..', res)
      return res.data;
    }) 
}



export function getMusicLyric(songmid) {
  
    const url = '/api/getMusicLyric'
    const paramObject = Object.assign({},commonParams, {
      songmid: songmid,
      guid: 9550970620,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      cid: 205361747,
      uid: 0,
      g_tk: 5381
    })
    return axios.get(url, { params: paramObject }).then((res) => {
      return res.data;
    })
}


