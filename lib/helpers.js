const querystring = require('querystring');
const converter = require('hex2dec');
const axios = require('axios');

class Helpers {
  /**
   * Request method
   * @param {string} url
   * @param {object} headers
   * @returns {object} response
   */
  async request(url, headers) {
    try {
      const uri = `${url}?${querystring.encode(headers)}`
      const response = await axios.get(uri);
      const data = response['data'];
      return data;
    } catch(err) {
      const uri = `${url}?${querystring.encode(headers)}`
      console.log(uri);
      // throw new Error(err);
    }
  }

  /**
   * Method for parsing last block number
   * @param {object} body
   * @returns {string} number
   */
  parseLastTransaiction(body) {
    return body['result']
  }

  /**
   * Method to convert hex to dic num
   * @param {string} num (hex)
   * @returns {number} num (dicimal)
   */
  toDec(num) {
    return converter.hexToDec(num);
  }

  /**
   * Method to convert dic to hex num
   * @param {number} num (dicimal)
   * @returns {string} num (hex)
   */
  toHex(num) {
    return converter.decToHex(num)
  }
}

module.exports = Helpers
