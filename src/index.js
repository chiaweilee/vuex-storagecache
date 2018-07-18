const fix = x => (x.toString().split('.')[1] || '').length
const rtl = x => Number(x.toString().split('.').join(''))

class Calculator {
  constructor (x) {
    this.z = fix(x)
    this.x = rtl(x)
  }
  prefix (y) {
    const z = fix(y)
    if (z > this.z) {
      this.x *= Math.pow(10, z - this.z)
      this.y = rtl(y)
      // set this.z at the end
      this.z = z
      return
    } else if (z < this.z) {
      this.y = rtl(y) * Math.pow(10, this.z - z)
      return
    }
    this.y = rtl(y)
  }
  add (y) {
    this.prefix(y)
    return (this.x + this.y) / Math.pow(10, this.z)
  }
  subtract (y) {
    return this.add(-y)
  }
  multiply (y) {
    this.prefix(y)
    return (this.x * this.y) / Math.pow(Math.pow(10, this.z), 2)
  }
  divide (y) {
    this.prefix(y)
    return (this.x / this.y)
  }
}

const calc = x => new Calculator(x)

const install = Vue => { Object.defineProperty(Vue.prototype, '$calc', {value: calc}) }

export default {
  install
}
