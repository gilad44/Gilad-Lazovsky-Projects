
import { gameState, elements } from './variables.js';
import { fillTable } from './game.js';

export const save = () => {

    if (elements.actions.value !== elements.actions.options[0].value ||
        elements.actions.style.display === 'none') {
        fillTable();
    }

    gameState.pExercise = document.createElement('td');
    gameState.pExercise.innerText = gameState.question;

    gameState.rightAnswer = document.createElement('td');
    gameState.rightAnswer.innerText = gameState.correctAnswer;

    gameState.userAnswer = document.createElement('td');
    gameState.userAnswer.innerText = gameState.uAnswer !== null ? gameState.uAnswer : '0';

    gameState.points = document.createElement('td');
    gameState.points.innerText = gameState.uAnswer === gameState.correctAnswer ? '1' : '0';

    gameState.gameData.push([gameState.pExercise.innerText], [gameState.rightAnswer.innerText], [gameState.userAnswer.innerText], [gameState.points.innerText]);
    localStorage.setItem('History', JSON.stringify(gameState.gameData));
};