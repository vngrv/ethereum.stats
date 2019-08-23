const config = require('../config/urls.json');
const Helpers = require('./helpers');

class Main extends Helpers{
	constructor() {
    super();
    this.lastBlockHex;
		this.lastBlockDec;
    this.lastHandredBlocks = [];
  }

	get lastBlock() {
		console.log(`Last Ethereum block`)
		console.log(`${this.lastBlockHex} => ${this.lastBlockDec}\n`)
	}

	get handredBlocks() {
		console.log(`\nLast Handred blocks`)
		console.log(this.lastHandredBlocks)
	}

	blockHexDec(hex, dec) {
		console.log(`${hex} => ${dec}`)
	}

  async call() {
    await this.getLastBlock();
		// getter
    // await this.lastBlock;
    await this.getLastBlocks();
		// getter
		// await this.handredBlocks;
    await this.getBlocks();
  }

  /**
   * Method to get Last block in Ethereum blockchain
   */
  async getLastBlock() {
    const headers = {
      'module': 'proxy',
      'action': 'eth_blockNumber'
    };
    const resp = await this.request(config['url'], headers);
    const resl = await this.parseLastTransaiction(resp);
		const hexNum = resl;
    const decNum = await this.toDec(hexNum);

		this.lastBlockHex = hexNum;
    this.lastBlockDec = decNum;
  }

  /**
   * Get informanion from 100 blocks
   */
  async getBlocks() {
    let promiseArr = [];
    let promiseResp = [];

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
    const temp = this.lastBlockDec;

    for(let i = 0; i < 100; i++) {
			this.blockHexDec(this.toHex((temp - i).toString()), temp - i)
      this.lastHandredBlocks.push(this.toHex((temp - i).toString()) );
    }
  }
}

let main = new Main();
main.call()
