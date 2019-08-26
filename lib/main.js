const config = require('../config/urls.json');
const Helpers = require('./helpers');

class Main extends Helpers {
	constructor(num) {
		super();
		this.num = num;
		this.responseArr;
		this.lastBlockHex;
		this.lastBlockDec;
		this.promiseArr = [];
		this.lastHandredBlocks = [];
	}

	get lastBlock() {
		console.log(`\nLast Ethereum block`)
		console.log(`${this.lastBlockHex} => ${this.lastBlockDec}\n`)
	}

	get handredBlocks() {
		console.log(`\nLast Handred blocks`)
		console.log(this.lastHandredBlocks)
	}

	get requestResponse() {
		console.log(`\nLast response`)
		console.log(this.promiseArr)
	}

	get response() {
		console.log(`\nResponse length`)
		console.log(this.responseArr.length)
	}

	blockHexDec(hex, dec) {
		console.log(`${hex} => ${dec}`)
	}

	async call() {
		this.log('Start')
		await this.getLastBlock();
		await this.getLastBlocks();
		await this.getBlocks();
		await this.start();

		const result = await this.adapter(this.responseArr);
		const transactionInfo = this.flatter(result)

		await this.absolute(transactionInfo)
	}

	/**
	 * Method to get Last block in Ethereum blockchain
	 */
	async getLastBlock() {

		const resp = await this.request(config['url'], config['lastBlock']);
		const resl = await this.parseLastTransaiction(resp);
		const hexNum = resl;
		const decNum = await this.toDec(hexNum);

		this.lastBlockHex = hexNum;
		this.lastBlockDec = decNum;
	}

	/**
	 * Generate promise array
	 */
	async getBlocks() {
		this.lastHandredBlocks.forEach((tag) => {
			let headers = {
				'module': 'proxy',
				'action': 'eth_getBlockByNumber',
				'tag': tag,
				'boolean': true
			}
			this.promiseArr.push(this.request(config['url'], headers))
		})
		this.log('Promise array generated');
	}

	/**
	 * Start requesting
	 */
	async start() {
		this.log('Start requesting');
		this.responseArr = await Promise.all(this.promiseArr);
		this.log('Response resived')
	}

	/**
	 * Method for generate last handred hashes
	 */
	getLastBlocks() {
		this.log(`Generate last ${this.num} blocks`)
		const temp = this.lastBlockDec;
		for (let i = 0; i < this.num; i++) {
			this.lastHandredBlocks.push(this.toHex((temp - i).toString()));
		}
	}
}

module.exports = Main