export default class Sineger {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }

  toString() {
    return '(' + this.id + ', ' + this.name + ', ' + this.avatar + ')';
  }

}

//https://y.gtimg.cn/music/photo_new/T001R300x300M000$5062.jpg?max_age=2592000

//https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000