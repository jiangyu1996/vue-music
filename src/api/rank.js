import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

//top 缩略
export function getTopList() {

  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const paramObject = Object.assign({},commonParams, {
    needNewCode: 1,
    platform: 'h5',
    uin: '0'
  })
  return jsonp(url, paramObject, options)
}

//top 榜单
export function getTopListDetail(topId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  const paramObject = Object.assign({},commonParams, {
    page: 'detail',
    uin: 0,
    platform: 'platform',
    needNewCode: 1,
    tpl: 3,
    type: top,
    topid: topId,
    g_tk: 5381,
    _: 1543325414247
  })
  return jsonp(url, paramObject, options)
}





