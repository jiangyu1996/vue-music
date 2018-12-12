import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

//banner轮播
export function getRecommendBanner() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const paramObject = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1540774082486
  })
  return jsonp(url, paramObject, options)
}

//推荐歌单
export function getRecommendSongList() {
  const url = '/api/getDiscList';
  const paramObject = Object.assign({}, commonParams, {
    uin: 0,
    _: 1540774082486,
    picmid: 1,
    rnd: 0.28772984625012654,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
  })
  return axios.get(url, { params: paramObject }).then((res) => {
    return res.data;
  })
}




export function getDiscDetial(disstid) {
  const url = '/api/getDiscDetial'
  const paramObject = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format:'json'



  })
  return axios.get(url, { params: paramObject }).then((res) => {
    return res.data;
  })
}
