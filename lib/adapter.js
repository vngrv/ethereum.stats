const converter = require('hex2dec');

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

class Adapter {
  constructor() {
    this.bills = {}
  }

  absoluteSum(array) {
    let tempArr = []
    let maxNum
    let address
    /**
     * инициализирую массивы
     */
    array.forEach((info) => {
      this.bills[info['for']] = []
      this.bills[info['to']] = []
    })

    /**
     * заполняю оные
     */
    array.forEach((info) => {
      this.bills[info['for']].push(parseInt(this.toDec(info['value']), 10))
      this.bills[info['to']].push(parseInt(`-${this.toDec(info['value'])}`, 10))
    })

    /**
     * высчитываю сумму всех элементов
     */
    Object.keys(this.bills).forEach((item) => {
      this.bills[item] = this.bills[item].reduce(this.sumElements,0)
    })

    /**
     * фильтрация отрицательного баланса
     */
    Object.keys(this.bills).forEach((item) => {
      if(this.signDefinition(this.bills[item])) {
        delete this.bills[item]
      }

      if(this.bills[item]) {
        tempArr.push(this.bills[item])
      }
    })

    maxNum = tempArr.max()

    /**
     * поиск самого большого перевода денег
     */
    Object.keys(this.bills).forEach((item) => {
      if(this.bills[item] == maxNum) {
        address = item
      }
    })

    return address 
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
   * Method for sum all elements in array
   */
  sumElements(accumulator, element) {
    return accumulator + element;
  }

  /**
   * Method for sign definition
   */
  signDefinition(number) {
    if(number < 0) {
      return true
    } 
  }
}
module.exports = Adapter
