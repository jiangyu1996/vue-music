import { getMusicVKey, getMusicLyric } from 'api/song.js'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'


export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.url = url,
      this.image = image
  }
  getLyric() {
    if (this.lyric)
      return Promise.resolve(this.lyric);

    return new Promise((resolve, reject) => {
      getMusicLyric(this.mid).then(res => {
        if (res.retcode == ERR_OK) {
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        } else { reject('no lyric'); }
      })
    })


  }

}

export function createSong(musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    //`http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9550970620&vkey=${songVkey}&uin=0&fromtag=38`);
    url: `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9952091920&vkey=${songVkey}&uin=0&fromtag=38`
  })

}
let singerList = [];


function filterSinger(singer) {

  if (!singer)
    return '';
  singerList = [];
  singer.forEach((element, index) => {
    singerList.push(element.name)
  });
  return singerList.join('/');
}
