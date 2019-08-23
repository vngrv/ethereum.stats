const converter = require('hex2dec');

class Adapter {
  absoluteSum(array) {
    array.forEach((info) => {
      console.log(info['value']);
    })
    // console.log(array);
  }
}

module.exports = Adapter
