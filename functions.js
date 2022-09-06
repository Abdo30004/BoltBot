const jimp = require("jimp");

class Image {
  constructor(data) {
    this.image = data;
}

  async blur(p=10) {
    const jimage = await jimp.read(this.image);
    jimage.blur(p);
    const buffer = await jimage.getBufferAsync("image/png");
    return buffer;
  }
  async greyscale() {
    const jimage = await jimp.read(this.image);
    jimage.greyscale();
    const buffer = await jimage.getBufferAsync("image/png");
    return buffer;
  }

}
module.exports = Image;
