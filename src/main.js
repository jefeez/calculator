/* eslint-disable space-before-function-paren */
import { evaluate } from 'mathjs'
import './main.css'

const previous = document.querySelector('#previous')
const current = document.querySelector('#current')
const buttons = document.querySelectorAll('#buttons > button')

class Calculator {
  constructor(previous, current) {
    this.previous = previous
    this.current = current
  }

  digit(digit) {
    this.current.innerText += digit
    this.current.innerText = this.current.innerText
      .replace(/([+\-*/])/g, ' $1 ')
      .replace(/\s{2,}/g, ' ')
      .trim()
  }

  equals() {
    this.previous.innerText = `${this.current.innerText} = `.replace(/([+\-*/])/g, ' $1 ')
    this.current.innerText = evaluate(this.current.innerText)
  }

  clean() {
    this.previous.innerText = ''
    this.current.innerText = ''
  }

  clearEntry() {
    this.current.innerText = this.current.innerText.slice(0, -1)
  }
}

const calculator = new Calculator(previous, current)

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const { innerText } = e.target
    if (!isNaN(innerText) || ['-', '+', '/', '*', '%', '.', '(', ')'].includes(innerText)) {
      calculator.digit(innerText)
    }
    if (innerText === '=') {
      calculator.equals()
    }

    if (innerText === 'C') {
      calculator.clean()
    }

    if (innerText === 'CE') {
      calculator.clearEntry()
    }
  })
})
