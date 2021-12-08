const problemElement = document.querySelector('.problem')
const ourForm = document.querySelector('.our-form')
const ourField = document.querySelector('.our-field')
const pointsNeeded = document.querySelector('.points-needed')
const mistakesAllowed = document.querySelector('.mistakes-allowed')
const endMessage = document.querySelector('.end-message')
const resetButton = document.querySelector('.reset-button')
const progressBar = document.querySelector('.progress-inner')
const maxOne = document.getElementById('maxOne')
const maxTwo = document.getElementById('maxTwo')
const updateButton = document.querySelector('.update-button')
const returnButton = document.querySelector('.return-button')

let state = {
  score: 0,
  wrongAnswers: 0,
}

updateProblem()

function updateProblem() {
  state.currentProblem = generateProblem(
    Number.parseInt(maxOne.value),
    Number.parseInt(maxTwo.value)
  )
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = ''
  ourField.focus()
}

function generateProblem(maxOne, maxTwo) {
  return {
    numberOne: generateNumber(maxOne),
    numberTwo: generateNumber(maxTwo),
    operator: ['+', '-', 'x'][2],
  }
}

function generateNumber(max) {
  return Math.floor(Math.random() * (max - 1)) + 2
}

ourForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == '+') correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == '-') correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == 'x') correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    renderProgressBar()
    updateProblem()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add('animate-wrong')
    setTimeout(() => problemElement.classList.remove('animate-wrong'), 451)
    ourField.value = ''
  }
  updateQuestion()
  checkLogic()
}

function checkLogic() {
  if (state.score === 10) {
    endMessage.textContent = 'Congrats! You Won.'
    document.body.classList.add('overlay-is-open')
    returnButton.style.display = 'none'
    resetButton.style.display = 'block'
    setTimeout(() => resetButton.focus(), 331)
  }

  if (state.wrongAnswers === 3) {
    endMessage.textContent = 'Sorry, You Lost.'
    document.body.classList.add('overlay-is-open')
    returnButton.style.display = 'none'
    resetButton.style.display = 'block'
    setTimeout(() => resetButton.focus(), 331)
  }
}

updateButton.addEventListener('click', updateQuestion)

function updateQuestion() {
  if (Number.parseInt(maxOne.value) < 3 || Number.parseInt(maxTwo.value) < 3) {
    resetQuestion()
  } else {
    updateProblem()
  }
}

function resetQuestion() {
  endMessage.innerHTML = 'Set maximum<br>numbers above 2'
  document.body.classList.add('overlay-is-open')
  maxOne.value = 12
  maxTwo.value = 12
  updateProblem()
  returnButton.style.display = 'block'
  resetButton.style.display = 'none'
  setTimeout(() => returnButton.focus(), 331)
}

returnButton.addEventListener('click', returnToNewQuestion)

function returnToNewQuestion() {
  document.body.classList.remove('overlay-is-open')
  updateProblem()
}

resetButton.addEventListener('click', resetGame)

function resetGame() {
  document.body.classList.remove('overlay-is-open')
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}
