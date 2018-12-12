var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function(req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/getPlayMusicKey', function(req, res) {
    var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/getMusicLyric', function(req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      let ret = response.data;
      if (typeof ret === 'string') {
        let reg = /^\w+\(({[^()]+})\)$/
        ret = ret.match(reg)[1]
      }
      res.json(JSON.parse(ret))
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/getDiscDetial', function(req, res) {
    var url = ' https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/getKeyWordResult', function(req, res) {
    var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
