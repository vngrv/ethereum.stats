const rp = require('request-promise');
const config = require('../config/urls.json');
const querystring = require('querystring');
const converter = require('hex2dec'); 

class Helpers {
  /**
   * Request method
   * @param {string} url 
   * @param {object} headers 
   * @returns {object} response
   */
  async request(url, headers) {
    try {
      let props = `${url}?${querystring.encode(headers)}`
      console.log(props);
      
      // let response = await rp(url+props); 
      // return response;
    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Method for parsing last block number
   * @param {object} body 
   * @returns {string} number
   */
  parseLastTransaiction(body) {
    let result = JSON.parse(body)
    return result['result']
  }

  /**
   * Method to convert hex to dic num
   * @param {string} num (hex)
   * @returns {number} num (dicimal)
   */
  toDic(num) {
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

class Main extends Helpers{
	constructor() {
    super();
    this.lastBlock;
    this.lastHandredBlocks = [];
  }

  async call() {
    await this.getLastBlock();
    await console.log(this.lastBlock);
    await this.getLastBlocks();
    await this.getBlocks();
  }

  /**
   * Method to get Last block in Ethereum blockchain
   */
  async getLastBlock() {
    let headers = {
      'module': 'proxy',
      'action': 'eth_blockNumber'
    };
    let resp = await this.request(config['url'], headers);
    let resl = await this.parseLastTransaiction(resp);
    let dicNum = await this.toDic(resl);
    
    this.lastBlock = dicNum;
  }

  /**
   * Get informanion from 100 blocks
   */
  async getBlocks() {
    let promiseArr = [];
    let promiseResp = [];
    console.log(this.lastHandredBlocks)
    this.lastHandredBlocks.forEach((tag) => {
      let headers = {
        'module': 'proxy',
        'action': 'eth_getBlockByNumber',
        'tag': tag,
        'boolean': true
      }
      promiseArr.push(this.request(config['url'], headers))
    })    
  }
  /**
   * Method for generage last handred numbers
   */
  getLastBlocks() {
    let temp = this.lastBlock;
    for(let i = 0; i < 15; i++) {
      console.log(this.toHex((temp - i).toString()), ' ', temp -i)
      this.lastHandredBlocks.push( this.toHex((temp - i).toString()) );
    }        
  }
}

let main = new Main();
main.call()







