const converter = require('hex2dec');

class Adapter {
  constructor() {
    this.bills = {}
  }

  absoluteSum(array) {
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
      console.log(this.bills[item]);
      
    })
    
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
}

module.exports = Adapter
