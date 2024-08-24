import './main.css'

const previousEL = document.querySelector('#previous')
const currentEL = document.querySelector('#current')
const buttonsEL = document.querySelectorAll('#buttons > button')

class Calculator {
  constructor(previousEL, currentEL) {
    this.previousEL = previousEL
    this.currentEL = currentEL
    this.currentOperation = ''
  }

  addDigit (digit) {
    if (digit === '.' && this.currentEL.innerText.includes('.')) {
      return
    }

    this.currentOperation = digit
    this.updateScreen()
  }

  updateScreen(operationValue = null, operation = null, current = null, previous = null) {
    if (operationValue === null) {
      this.currentEL.innerText += this.currentOperation
    } else {
      if (previous === 0) {
        operationValue = current
      }
      this.previousEL.innerText = `${operationValue} ${operation}`
      this.currentEL.innerText = ''
    }
  }

  processOperator(operation) {
    if (this.currentEL.innerText === '' && operation !== 'C') {
      if (this.previousEL.innerText !== '') {
        this.changeOperation(operation)
      }
      return
    }

    let operationValue
    const previous = +this.previousEL.innerText.split(' ')[0]
    const current = +this.currentEL.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break

      case 'DEL':
        this.currentEL.innerText = this.currentEL.innerText.slice(0, -1)
        break

      case 'CE':
        this.currentEL.innerText = ''
        break

      case 'C':
        this.currentEL.innerText = ''
        this.previousEL.innerText = ''
        break

      case '=':
        const op = this.previousEL.innerText.split(' ')[1]
        this.processOperator(op)
        break

      default:
    }
  }

  changeOperation(operation) {
    const mathOperations = ['*', '/', '-', '+']
    if (!mathOperations.includes(operation)) {
      return
    }
    console.log(this.previousEL.innerText)
    console.log(this.previousEL.innerText.slice(0, -1))
    console.log(this.previousEL.innerText.slice(0, -1) + operation)
    this.previousEL.innerText = this.previousEL.innerText.slice(0, -1) + operation
  }
}

const calculator = new Calculator(previousEL, currentEL)

buttonsEL.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const { innerText } = e.target
    if (+innerText >= 0 || innerText === '.') {
      calculator.addDigit(innerText)
    } else {
      calculator.processOperator(innerText)
    }
  })
})
