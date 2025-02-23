import { gameState, elements, initElements } from './variables.js';
import { save } from './storage.js';
import { allBubbles, triggerAnim, text } from './ui.js';
import { outOfEasy, intoMedium, outOfMedium, intoHard, gameFinish, level2Responsiveness, level3Responsiveness } from './dynamicCssChanges.js';
const fadeOutAudio = (audio, duration) => {
    const initialVolume = audio.volume;
    const step = initialVolume / (duration / 100);
    const fade = setInterval(() => {
        if (audio.volume > step) {
            audio.volume -= step;
        } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(fade);
        }
    }, 100);
};
const fadeInAudio = (audio, duration) => {
    const initialVolume = audio.volume;
    const step = initialVolume / (duration / 100);
    const fade = setInterval(() => {
        if (audio.volume < initialVolume - step) {
            audio.volume += step;
        } else {
            audio.volume = initialVolume;
            clearInterval(fade);
        }
    }, 100);
};
const initializeTable = () => {
    gameState.tableContent = document.getElementById('content');
    gameState.cellRow = document.createElement('tr');
    gameState.pExercise = document.createElement('td');
    gameState.tableContent.appendChild(gameState.cellRow);
    gameState.cellRow.appendChild(gameState.pExercise);
    return gameState.cellRow;
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const fillTable = () => {
    const formattedQuestion = gameState.question.split(' ').map(part => {
        const num = parseInt(part);
        return isNaN(num) ? part : formatNumber(num);
    }).join(' ');

    if (gameState.pExercise.innerText === '') {
        gameState.pExercise.innerText = formattedQuestion;
    }
    const width = window.innerWidth;
    if (width <= 480) {
        if (gameState.mode === 10) {
            gameState.tableContent.style.fontSize = '7px';

        } else if (gameState.mode === 100) {
            gameState.tableContent.style.fontSize = '8px';

        } else {
            gameState.tableContent.style.fontSize = '8px';
        }
    } else if (width <= 768) {
        gameState.tableContent.style.fontSize = '8px';
        gameState.tableContent.style.letterSpacing = '1.5px';

        gameState.cellRow.style.height = '8px';
    } else {
        gameState.tableContent.style.fontSize = '10px';
        gameState.tableContent.style.letterSpacing = '1.5px';
        gameState.cellRow.style.height = '8px';
    }
    if (gameState.uAnswer !== null) {
        gameState.rightAnswer = document.createElement('td');
        gameState.rightAnswer.innerText = formatNumber(gameState.correctAnswer);

        gameState.userAnswer = document.createElement('td');
        gameState.userAnswer.innerText = formatNumber(gameState.uAnswer);

        gameState.points = document.createElement('td');
        if (gameState.uAnswer === gameState.correctAnswer) {
            gameState.points.innerText = '1';
        } else {
            gameState.points.innerText = '0';
        }
        gameState.cellRow.appendChild(gameState.rightAnswer);
        gameState.cellRow.appendChild(gameState.userAnswer);
        gameState.cellRow.appendChild(gameState.points);

        document.getElementById('exercise').innerText = formattedQuestion;

        gameState.uAnswer = null;
        gameState.cellRow = initializeTable();

    }
};
const randExercise = (operator, isEasy) => {

    const randIndex = (Math.floor(Math.random() * elements.operators.length));
    if (isEasy) {
        gameState.selectedOperator = operator;
    } else {
        operator = elements.operators[randIndex];
    }

    let minRange, maxRange;
    switch (gameState.mode) {
        case 10:
            minRange = 1;
            maxRange = 10;
            break;
        case 100:
            minRange = 10;
            maxRange = 100;
            break;
        case 1000:
            minRange = 100;
            maxRange = 1000;
            break;
        default:
            minRange = 1;
            maxRange = 10;
    }

    let num1 = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    let num2 = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    if (num1 < num2 || num1 % num2 !== 0) {
        return randExercise(operator, isEasy);
    }

    gameState.question = `${num1} ${operator} ${num2}`;

    document.getElementById('exercise').innerText = gameState.question;

    fillTable();

    return gameState.question;
};

document.addEventListener('DOMContentLoaded', () => {
    elements.actions.onchange = (e) => {
        gameState.selectedOperator = e.target.value;
        randExercise(gameState.selectedOperator, true);

    };

    elements.submit.onclick = () => {
        document.getElementById('send').animate(
            [
                { transform: 'translate(2%, 2%)' },

            ],
            {
                duration: 150,
                iterations: 1

            }
        )

        checkAnswer();
        if (gameState.mode === 10) {
            elements.actions.value = elements.actions.options[0].value;
            elements.uInput.value = "";
            document.getElementById('exercise').innerText = '';
            gameState.cellRow = initializeTable();

        } else {
            elements.uInput.value = "";
        }
    };
    elements.uInput.addEventListener('keypress', (e) => {
        if (!/[\d]/.test(e.key) && e.key !== 'Enter') {
            e.preventDefault();
        }
    });

    elements.uInput.addEventListener('paste', (e) => {
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
        }
    });
});
let i = 0;

const checkAnswer = () => {

    gameState.correctAnswer = eval(gameState.question);
    const userInput = elements.uInput.value;
    gameState.uAnswer = Number(userInput);

    if (gameState.uAnswer === gameState.correctAnswer) {

        gameState.score++
        setTimeout(() => { elements.pointsCount.innerText = gameState.score; }, 600);
        document.getElementById("points").classList.remove("pointUp");
        void document.getElementById("points").offsetHeight;
        document.getElementById("points").classList.add("pointUp");
        elements.uInput.value = "";

        if (gameState.score === 1) {

            confetti({ particleCount: 1500, spread: 100, angle: 135, startVelocity: 70, ticks: 200, shapes: ["star", "circle", "square"], scalar: .8, origin: { x: 1, y: 1 }, drift: -1 });
            confetti({ particleCount: 1500, spread: 150, angle: 50, startVelocity: 70, ticks: 200, shapes: ["star", "circle", "square"], scalar: .8, origin: { x: 0, y: 1 }, drift: 1 });


            if (gameState.mode === 10) {
                outOfEasy();
                intoMedium();
                gameState.mode = 100;

            } else if (gameState.mode === 100) {
                outOfMedium();
                intoHard();

                gameState.mode = 1000;

            } else if (gameState.mode === 1000) {
                gameFinish();
            }
        } else if (gameState.mode !== 10) {
            randExercise(gameState.selectedOperator, false);
        }



    } else {
        gameState.negScore++
        setTimeout(() => { elements.negPoints.innerText = gameState.negScore; }, 600);
        document.getElementById("negPoints").classList.remove("pointUp");
        void document.getElementById("negPoints").offsetHeight;
        document.getElementById("negPoints").classList.add("pointUp");
        document.getElementById("uInput").value = "";

        if (gameState.mode !== 10) {
            randExercise(gameState.selectedOperator, false);

        }
    }

    save();
    if (gameState.score === 1) {
        localStorage.clear();
    }

    return gameState.uAnswer;
}


export { initializeTable, randExercise, fillTable, checkAnswer, fadeInAudio, fadeOutAudio };






