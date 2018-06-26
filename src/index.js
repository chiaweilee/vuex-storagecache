const prefix = x => (() => x.toString().split('.')[1] || [])().length

class Calculator {
  constructor (x) {
    this.x = x
    this.z = prefix(x) || 1
  }
  prefix (y) {
    const _z = prefix(y)
    if (_z > this.z) this.z = _z
    return Math.pow(10, this.z)
  }
  add (y) {
    const z = this.prefix(y)
    return (this.x * z + y * z) / z
  }
  subtract (y) {
    return this.add(-y)
  }
  multiply (y) {
    const z = this.prefix(y)
    return ((this.x * z) * (y * z)) / (z * z)
  }
  divide (y) {
    const z = this.prefix(y)
    return (this.x * z) / (y * z)
  }
}

const calc = x => new Calculator(x)

const install = Vue => { Object.defineProperty(Vue.prototype, '$calc', {value: calc}) }

export default {
  install
}
