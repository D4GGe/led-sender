var Jimp = require('jimp');
var BitBuffer = require('bitbuffer').BitBuffer
const SPI = require('pi-spi');
const getImageData = async (fileName) => {

  var b = new BitBuffer(10)
  let image = (await Jimp.read(fileName)).bitmap.data
  const arr = new Uint8Array(image.length - (image.length / 4));
  var counter = 0;
  let addToArr = (data) => {
    arr[counter] = data;
    counter++;
  }

  for (let index = 0; index < image.length; index = index +4) {
    //adding the red
    addToArr(image[index])
    //adding the green
    addToArr(image[index + 1])
    //adding the blue
    addToArr(image[index + 2])

  }

  const outBuffer = Buffer.from(arr)
  return outBuffer;

}

const main = async() => {
  const ImageBuffer = await getImageData('test3.png');
  var spi = SPI.initialize("/dev/spidev0.0");
  spi.clockSpeed(2048);
  spi.dataMode(SPI.mode.CPHA);
  spi.bitOrder(SPI.order.MSB_FIRST);
  spi.write(ImageBuffer, console.log)


}


main()
  .catch(console.error)
  .then(console.log)