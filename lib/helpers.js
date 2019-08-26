const querystring = require('querystring');
const converter = require('hex2dec');
const axios = require('axios');
const Adapter = require('./adapter');

class Helpers extends Adapter {
  constructor() {
    super()
  }
  /**
   * Request method
   * @param {string} url
   * @param {object} headers
   * @returns {object} response
   */
  async request(url, headers) {
    try {
      const props = {
        method: 'get',
        url: `${url}?${querystring.encode(headers)}`
      }

      const response = await axios(props);
      const data = response['data'];

      return data;
    } catch (err) {
      this.log(`Error ${url}?${querystring.encode(headers)}`)
      throw new Error(err)
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

  /**
   * Adapter method for response array
   * @param {array} hashes
   * @return {array} hashes
   */
  adapter(blocks) {
    try {
      let blockHash = []
      let transactionsForHash = []

      blocks.forEach((block) => {

        let transactions = block['result']['transactions']

        transactions.forEach((transaction) => {
          // убиваю нулевые транзакции
          if (transaction['value'] != '0x0') {
            let info = {
              'for': transaction['from'],
              'to': transaction['to'],
              'value': transaction['value']
            }
            transactionsForHash.push(info)
          }

        })

        /**
         * формируем хеш без лишних полей
         * { number: '0x8043ee',
         *   transactions:
         *   [
         *    { form: '0x3b83cd1a8e516b6eb9f1af992e9354b15a6f9672',
         *      to: '0x0b104e04423c962b2853f4a8ac62f7d47a28df18',
         *      value: '0x53444835ec580000'
         *    }
         *   ]
         */
        let hash = {
          'number': block['result']['number'],
          'transactions': transactionsForHash
        }
        blockHash.push(hash)
      })

      this.log('Formatting has done!')
      return blockHash
    } catch (e) {
      this.log('Error with parsing')
    }
  }

  /**
   * Flatter Adapter
   * @param {array} array
   * @param {array} flat_array
   */
  flatter(array) {
    let flatArray = []
    array.forEach((block) => {
      block['transactions'].forEach((info) => {
        flatArray.push(info)
      })
    })
    return flatArray
  }

  /**
   * Log wrapper
   * @param {string} message
   * @return {stdout} message
   */
  log(message) {
    console.log(`[${new Date()}] ${message}`);
  }

  absolute(transactions) {
    this.absoluteSum(transactions)
  }


}

module.exports = Helpers