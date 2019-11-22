// Questions aray
const questions = [
  { question: 'Enter your first name' },
  { question: 'Enter your last name' },
  { question: 'Enter your email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create a password', type: 'password' }
]
// Transition times
const shakeTime = 100;
const switchTime = 200;
// Initial position at first question
let position = 0;
// DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Get questions on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);
// Button clicks
nextBtn.addEventListener('click', validate);
prevBtn.addEventListener("click", back);
// Input field enter click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});
// Get question from array & add to markup
function getQuestion() {
  // Get current question
  inputLabel.innerHTML = questions[position].question;
  // Get current type
  inputField.type = questions[position].type || 'text';
  // Get current answer
  inputField.value = questions[position].answer || '';
  // Focus on element
  inputField.focus();
  // Set progress bar
  progress.style.width = (position * 100) / questions.length + '%';
  // Add user icon for first question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
  // Display the question
  showQuestion();
}
// Display question to user
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.width = '100%';
  inputProgress.style.transition = '';
}
// Hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
}
// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}
// Validate input field
function validate() {
  // Check email pattern or empty field
  if (!inputField.value.match(questions[position].pattern || /.+/))
    inputFail();
  else
    inputPass();
}
// Go to previous input field
function back() {
  if (position > 0) {
    formBox.className = '';
    setTimeout(transform, 0, 0, 10);
    setTimeout(transform, shakeTime, 0, 0);
    hideQuestion();
    position = position - 1;
    getQuestion();
  }
}
// Field input fail
function inputFail() {
  formBox.className = 'error';
  // Go 20px left for even i and right for odd i
  for (let i = 0; i < 6; i++)
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
  // Go back to initial position
  setTimeout(transform, shakeTime * 6, 0, 0);
  inputField.focus();
}
// Field input pass
function inputPass() {
  formBox.className = '';
  setTimeout(transform, 0, 0, 10);
  setTimeout(transform, shakeTime, 0, 0);
  // Store answer in array
  questions[position].answer = inputField.value;
  // Increment position
  position++;
  // Hide current question
  hideQuestion();
  // If new question, get next
  if (questions[position])
    getQuestion();
  // Close form if no more questions
  else {
    formBox.className = 'close';
    progress.style.width = '100%';
    formComplete();
  }
}
// All fields complete - show h1 end
function formComplete() {
  console.log(questions);
  const h1 = document.createElement('h1');
  h1.className = 'end';
  h1.textContent = `Thanks ${questions[0].answer}! You are registered and will get an email shortly.`;
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => h1.style.opacity = 1, 50);
  }, 1000);
}
