import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

//热门
export function getHotKey() {

  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const paramObject = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5',
    uin: '0',
    needNewCode: 1,
    _: '1543454979423'


  })
  return jsonp(url, paramObject, options)
}



//关键字
export function getKeyWordResult(keyWord, pageNumber, zhidaqu, perpage) {

  const url = '/api/getKeyWordResult'
  const paramObject = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    w: keyWord,
    zhidaqu: zhidaqu ? 1 : 0,
    catZhida: zhidaqu ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: 20,
    p: pageNumber,
    remoteplace: 'txt.mqq.all'

  })
  return axios.get(url, { params: paramObject }).then((res) => {
    return res.data;
  })
}
