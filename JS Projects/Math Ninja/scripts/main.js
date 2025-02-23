import { allBubbles, triggerAnim, text } from './ui.js';
import { randExercise } from './game.js';
import { gameState, elements, } from './variables.js';
import { level2Responsiveness, level3Responsiveness } from './dynamicCssChanges.js';

let i = 0;

elements.pointsCount.innerText = gameState.score;
elements.negPoints.innerText = gameState.negScore;

const initializeTable = () => {

    gameState.tableContent = document.getElementById('content');
    gameState.cellRow = document.createElement('tr');
    gameState.pExercise = document.createElement('td');
    gameState.tableContent.appendChild(gameState.cellRow);
    gameState.cellRow.appendChild(gameState.pExercise);

    return gameState.cellRow;
};

const getHistory = () => {
    try {
        let previousGame = localStorage.getItem('History');

        if (previousGame !== null) {
            gameState.gameData = JSON.parse(previousGame);

            if (!Array.isArray(gameState.gameData)) {
                console.error('gameData is not an array:', gameState.gameData);
                gameState.gameData = [];
                return initializeTable();
            }
            const groupedGameData = [];
            for (let i = 0; i < gameState.gameData.length; i += 4) {
                if (!gameState.gameData[i] || !gameState.gameData[i + 1] ||
                    !gameState.gameData[i + 2] || !gameState.gameData[i + 3]) {
                    console.error('Missing data at index', i);
                    continue;
                }
                gameState.pExercise = gameState.gameData[i] && gameState.gameData[i][0];
                gameState.rightAnswer = gameState.gameData[i + 1] && gameState.gameData[i + 1][0];
                gameState.userAnswer = gameState.gameData[i + 2] && gameState.gameData[i + 2][0];
                gameState.points = gameState.gameData[i + 3] && gameState.gameData[i + 3][0];

                if (gameState.pExercise && gameState.rightAnswer && gameState.userAnswer && gameState.points) {
                    groupedGameData.push([gameState.pExercise, gameState.rightAnswer, gameState.userAnswer, gameState.points]);

                }
            }
            groupedGameData.forEach(row => {
                gameState.tableContent = document.getElementById('content');
                const tableRow = document.createElement('tr');
                row.forEach(cellValue => {
                    const cell = document.createElement('td');
                    cell.innerText = cellValue;
                    tableRow.appendChild(cell)
                });
                gameState.tableContent.appendChild(tableRow)

            });
        }
    } catch (error) {
        console.error('Error getting history:', error);
        return initializeTable();
    }
};

elements.easy.onclick = () => {
    gameState.mode = 10;
    elements.bgMusic.volume = 0.2;
    elements.bgVid.style.opacity = '1';
    elements.bgVid.style.zIndex = '8';
    setTimeout(() => {
        elements.landing.style.display = 'none';
        elements.bgVid.play();
    }, 600);

    setTimeout(() => {
        elements.bgMusic.play();
    }, 2700);

    allBubbles(elements.bubble, text.gameStartText, i = 0);
    initializeTable();
    elements.bubble.animate([
        {
            width: '1px',
            height: '1px'
        },
        {
            width: 'auto',
            height: 'auto',
        }
    ], {
        duration: 2000,
        iterations: 1,
        fill: 'forwards'
    });
    triggerAnim();
};

elements.med.onclick = () => {
    gameState.mode = 100;
    elements.bgMusic.volume = 0.2;

    setTimeout(() => {
        elements.landing.style.display = 'none';
        elements.level2Intro.style.opacity = 1;
        elements.level2Intro.style.zIndex = '8';

        elements.level2Intro.style.width = '100%';
        elements.level2Intro.style.height = '160%';
        elements.level2Intro.style.objectFit = 'fill';

        elements.blackboard.style.width = '400px';
        elements.blackboard.style.height = '60%';
        elements.blackboard.style.marginLeft = '570px';

        elements.bbImg.style.width = '400px';
        elements.bbImg.style.height = '62%';
        elements.bbImg.style.left = '570px';
        elements.bbImg.style.top = '18px';

        elements.title.style.translate = '(50%, 0)';
        elements.title.style.marginRight = '105px';

        elements.problem.style.marginRight = '200px';
        elements.problem.style.marginTop = '20px';

        elements.equalSign.style.marginTop = '-40px';
        elements.equalSign.style.marginRight = '90px';
        elements.equalSign.style.marginLeft = '70px';

        elements.uInput.style.marginTop = '-33px';

        elements.submit.style.marginLeft = '0px';

        elements.history.style.width = '380px';

        elements.bubble.style.left = '50%';
        elements.bubble.style.opacity = '1';

        elements.actions.style.display = 'none';
        level2Responsiveness();
        window.addEventListener('resize', level2Responsiveness);
        level2Intro.play();
    }, 600);
    setTimeout(() => {
        elements.bgMusic.play();
    }, 2700);

    initializeTable();
    randExercise(null, false);
    allBubbles(elements.bubble, text.level2IntroText, i = 0);
    elements.bubble.animate([
        {
            width: '1px',
            height: '1px'
        },
        {
            width: 'auto',
            height: 'auto',
        }
    ], {
        duration: 2000,
        iterations: 1,
        fill: 'forwards'
    });
    triggerAnim();

};

elements.hard.onclick = () => {
    gameState.mode = 1000;

    setTimeout(() => {

        elements.landing.style.display = 'none';

        elements.level3Intro.style.display = 'block';
        elements.level3Intro.style.position = 'absolute';
        elements.level3Intro.style.opacity = '1';
        elements.level3Intro.style.zIndex = '8';
        elements.level3Intro.style.width = '110%';
        elements.level3Intro.style.height = '150%';
        elements.level3Intro.style.objectFit = 'fill';
        elements.level3Intro.style.top = '0';
        elements.level3Intro.style.left = '0';

        elements.blackboard.style.width = '400px';
        elements.blackboard.style.height = '60%';
        elements.blackboard.style.marginLeft = '610px';
        elements.blackboard.style.marginTop = '0px';

        elements.bbImg.style.width = '400px';
        elements.bbImg.style.height = '53%';
        elements.bbImg.style.left = '610px';
        elements.bbImg.style.top = '0';

        elements.title.style.translate = '(50%, 0)';
        elements.title.style.marginTop = '0px';
        elements.title.style.marginRight = '90px';
        elements.title.style.fontSize = '25px';

        elements.problem.style.marginRight = '200px';
        elements.problem.style.marginTop = '-10px';

        elements.equalSign.style.marginTop = '-60px';
        elements.equalSign.style.marginRight = '90px';
        elements.equalSign.style.marginLeft = '70px';

        elements.uInput.style.marginTop = '-85px';

        elements.submit.style.marginLeft = '0px';
        elements.submit.style.marginTop = '-70px';

        elements.history.style.width = '380px';
        elements.history.style.height = '22%';
        elements.history.style.marginTop = '-60px';

        elements.bubble.style.left = '49%';
        elements.bubble.style.bottom = '75%';
        elements.bubble.style.paddingTop = '10px';
        elements.bubble.style.paddingBottom = '10px';
        elements.bubble.style.paddingRight = '10px';
        elements.bubble.style.paddingLeft = '15px';

        elements.actions.style.display = 'none';
        level3Responsiveness();
        window.addEventListener('resize', level2Responsiveness);
        level3Intro.play();

    }, 600);
    setTimeout(() => {
        elements.bgMusic.volume = 0.2;
        elements.bgMusic.play();
    }, 2700);

    initializeTable();
    randExercise(null, false);

    allBubbles(elements.bubble, text.level3IntroText, i = 0);

    elements.bubble.animate([
        {
            width: '1px',
            height: '1px'
        },
        {
            width: 'auto',
            height: 'auto',
        }
    ], {
        duration: 2000,
        iterations: 1,
        fill: 'forwards'
    });
    triggerAnim();
};

getHistory();

export { level3Responsiveness, initializeTable, getHistory }