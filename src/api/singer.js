import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

//歌手列表
export function getSingerList() {
  //const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const paramObject = Object.assign({},commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 50,
    pagenum: 1,
    hostUin: '0',
    needNewCode: '0',
    platform: 'yqq',
    g_tk: 2001751543
  })
  return jsonp(url, paramObject, options)
}

//推荐歌单
export function getRecommendSongList() {
  const url = '/api/getDiscList';
  const paramObject = Object.assign({},commonParams, {
    uin: 0,
    _: 1540774082486,
    picmid: 1,
    rnd: 0.28772984625012654,
    loginUin: 0,
    hostUin: '0',
    format: 'json',
    platform: 'yqq',
    needNewCode: '0',
    categoryId: 10000000,
    sortId: 5,
    sin: '0',
    ein: 29,
  })
  return axios.get(url, { params: paramObject }).then((res) => {
    return res.data;
  })
  //return jsonp(url, paramObject, options)
}

//歌手个人资料
export function getSingerDetial(singermid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const paramObject = Object.assign({},commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singermid,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1  
  })
  return jsonp(url, paramObject, options)
}





