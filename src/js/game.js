const questions = shuffleArray([
    {
        q: "Who was the king of the Greek gods?",
        options: shuffleArray(["Zeus", "Apollo", "Hermes"]),
        answer: "Zeus"
    },
    {
        q: "Where did the first Olympics take place?",
        options: shuffleArray(["Athens", "Olympia", "Sparta"]),
        answer: "Olympia"
    },
    {
        q: "Which city was famous for warriors?",
        options: shuffleArray(["Athens", "Sparta", "Delphi"]),
        answer: "Sparta"
    },
    {
        q: "Who was the goddess of wisdom?",
        options: shuffleArray(["Athena", "Aphrodite", "Hera"]),
        answer: "Athena"
    },
    {
        q: "What was the Greek god of the underworld called?",
        options: shuffleArray(["Elysium", "Hades", "Tartarus"]),
        answer: "Hades"
    },
    {
        q: "Who was the messenger of the gods?",
        options: shuffleArray(["Hermes", "Apollo", "Ares"]),
        answer: "Hermes"
    },
    {
        q: "Which Greek hero fought in the Trojan War and was invulnerable except for his heel?",
        options: shuffleArray(["Achilles", "Odysseus", "Hercules"]),
        answer: "Achilles"
    },
    {
        q: "What was the name of the marketplace in Greek cities?",
        options: shuffleArray(["Agora", "Acropolis", "Stoa"]),
        answer: "Agora"
    },
    {
        q: "Which Greek philosopher taught Alexander the Great?",
        options: shuffleArray(["Plato", "Aristotle", "Socrates"]),
        answer: "Aristotle"
    },
    {
        q: "Which goddess was born from the sea foam?",
        options: shuffleArray(["Aphrodite", "Artemis", "Demeter"]),
        answer: "Aphrodite"
    },
    {
        q: "What was the name of the temple dedicated to Athena in Athens?",
        options: shuffleArray(["Parthenon", "Pantheon", "Colosseum"]),
        answer: "Parthenon"
    },
    {
        q: "Who was the god of the sea?",
        options: shuffleArray(["Poseidon", "Zeus", "Hades"]),
        answer: "Poseidon"
    },
    {
        q: "Which Greek city was known for its navy and democracy?",
        options: shuffleArray(["Athens", "Sparta", "Corinth"]),
        answer: "Athens"
    },
    {
        q: "Who was the god of war?",
        options: shuffleArray(["Ares", "Apollo", "Hephaestus"]),
        answer: "Ares"
    },
    {
        q: "What was the name of the half-man, half-bull creature in Greek mythology?",
        options: shuffleArray(["Minotaur", "Centaur", "Satyr"]),
        answer: "Minotaur"
    },
    {
        q: "Which oracle was the most famous in Ancient Greece? The Oracle of...",
        options: shuffleArray(["Delphi", "Dodona", "Olympia"]),
        answer: "Delphi"
    },
    {
        q: "Who was the goddess of the harvest?",
        options: shuffleArray(["Demeter", "Hera", "Artemis"]),
        answer: "Demeter"
    },
    {
        q: "Which Greek hero devised the Trojan Horse?",
        options: shuffleArray(["Odysseus", "Achilles", "Perseus"]),
        answer: "Odysseus"
    },
    {
        q: "What was the name of the winged horse in Greek mythology?",
        options: shuffleArray(["Pegasus", "Chimera", "Cerberus"]),
        answer: "Pegasus"
    },
    {
        q: "Who was condemned to roll a boulder up a hill for eternity in the underworld?",
        options: shuffleArray(["Sisyphus", "Tantalus", "Ixion"]),
        answer: "Sisyphus"
    }
])


let current = 0
let score = 0

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    document.getElementById("quiz").style.pointerEvents = "auto"
    if (current >= questions.length) {
        document.getElementById("quiz").querySelectorAll("*:not(canvas)").forEach(element => element.style.display = "none")
        const chart = document.getElementById("chart")
        chart.style.display = "block"
        const ctx = chart.getContext("2d")
        const total = questions.length
        const percentage = ((score / total) * 100).toFixed(0)
        const centerTextPlugin = {
            id: 'centerText',
            beforeDraw(chart) {
                const {ctx, chartArea: {width, height}} = chart;
                ctx.save();
                ctx.font = 'bold 32px Comic Sans MS, sans-serif';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`Score - ${percentage}%`, width / 2, height / 2);
                ctx.restore();
            }
        };


        const doughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    `Correct (${percentage}%)`,
                    `Wrong (${100 - percentage}%)`
                ],
                datasets: [{
                    data: [score, total - score],
                    backgroundColor: ['#4CAF50', '#F44336'],
                    borderWidth: 2,
                    borderRadius: 100
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Comic Sans MS, sans-serif',
                                size: 16
                            },
                            color: 'black',
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        usePointStyle: true,
                        callbacks: {
                            label: function (context) {
                                return ` ${context.parsed || 0}`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000,
                    easing: 'easeInOutQuad'
                }
            },
            plugins: [centerTextPlugin]
        });
        return;
    }
    const q = questions[current]
    document.getElementById("question").textContent = `${current + 1}. ${q.q}`
    document.getElementById("option1").textContent = q.options[0]
    document.getElementById("option1").className = ""
    document.getElementById("option2").textContent = q.options[1]
    document.getElementById("option2").className = ""
    document.getElementById("option3").textContent = q.options[2]
    document.getElementById("option3").className = ""
    document.getElementById("chart").style.display = "none"
    document.getElementById("feedback").textContent = ""
    document.getElementById("feedback").style.animation = ""
}

function checkAnswer(option) {
    const q = questions[current]
    const feedback = document.getElementById("feedback")
    if (option === q.answer) {
        feedback.textContent = "✅ Correct!"
        feedback.style.color = "green"
        feedback.style.animation = "bounce 1s"
        score += 1
    } else {
        feedback.textContent = `❌ Wrong - ${q.answer}!`
        feedback.style.color = "red"
        feedback.style.animation = "shake 0.5s"
    }
    document.querySelectorAll("button").forEach(button => {
        if (button.textContent === q.answer) {
            button.className = "correct"
        } else {
            button.className = "wrong"
        }
    })
    document.getElementById("quiz").style.pointerEvents = "none"
    current += 1
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
