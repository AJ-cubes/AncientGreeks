const questions = [
  {
    q: "Who was the king of the Greek gods?",
    options: ["Zeus", "Apollo", "Hermes"],
    answer: "Zeus"
  },
  {
    q: "Where did the first Olympics take place?",
    options: ["Athens", "Olympia", "Sparta"],
    answer: "Olympia"
  },
  {
    q: "Which city was famous for warriors?",
    options: ["Athens", "Sparta", "Delphi"],
    answer: "Sparta"
  },
  {
    q: "Who was the goddess of wisdom?",
    options: ["Athena", "Aphrodite", "Hera"],
    answer: "Athena"
  }
]

let current = 0

function loadQuestion() {
  const q = questions[current]
  document.getElementById("question").textContent = q.q
  document.getElementById("option1").textContent = q.options[0]
  document.getElementById("option2").textContent = q.options[1]
  document.getElementById("option3").textContent = q.options[2]
  document.getElementById("feedback").textContent = ""
}

function checkAnswer(option) {
  const q = questions[current]
  const feedback = document.getElementById("feedback")
  if (option === q.answer) {
    feedback.textContent = "✅ Correct!"
    feedback.style.color = "green"
    feedback.style.animation = "bounce 1s"
  } else {
    feedback.textContent = "❌ Oops, try again!"
    feedback.style.color = "red"
    feedback.style.animation = "shake 0.5s"
  }
  current = (current + 1) % questions.length
  setTimeout(loadQuestion, 1500)
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion()
  document.getElementById("option1").onclick = () => checkAnswer(document.getElementById("option1").textContent)
  document.getElementById("option2").onclick = () => checkAnswer(document.getElementById("option2").textContent)
  document.getElementById("option3").onclick = () => checkAnswer(document.getElementById("option3").textContent)
})

const style = document.createElement("style")
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}`
document.head.appendChild(style)