import './main.css'

const previous = document.querySelector('#previous')
const current = document.querySelector('#current')
const buttons = document.querySelectorAll('#buttons > button')

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const { innerText } = e.target
    console.log(innerText)
  })
})
