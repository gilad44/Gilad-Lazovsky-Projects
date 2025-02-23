import { elements, gameState } from './variables.js';
import { triggerAnim, allBubbles, text } from './ui.js';
import { initializeTable, randExercise, fadeInAudio, fadeOutAudio } from './game.js';
let i = 0;
const level2Responsiveness = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        elements.level2Intro.style.minWidth = '100%';
        elements.level2Intro.style.minHeight = '100%';
        elements.level2Intro.style.width = '145%';
        elements.level2Intro.style.height = '160%';
        elements.level2Intro.style.marginLeft = '-130px';

        elements.level2Vid.style.minWidth = '100%';
        elements.level2Vid.style.minHeight = '100%';
        elements.level2Vid.style.width = '145%';
        elements.level2Vid.style.height = '160%';
        elements.level2Vid.style.left = '-130px';

        elements.greatJob.style.width = '145%';
        elements.greatJob.style.height = '160%';
        elements.greatJob.style.left = '-130px';

        elements.blackboard.style.width = '228px';
        elements.blackboard.style.height = '50%';
        elements.blackboard.style.marginLeft = '250px';

        elements.bbImg.style.width = '228px';
        elements.bbImg.style.height = '60%';
        elements.bbImg.style.left = '250px';
        elements.bbImg.style.top = '18px';

        elements.title.style.translate = '(50%, 0)';
        elements.title.style.marginRight = '55px';
        elements.title.style.fontSize = '23px';
        elements.title.style.letterSpacing = '1px';

        elements.problem.style.fontSize = '15px';
        elements.problem.style.marginRight = '115px';
        elements.problem.style.marginTop = '10px';
        elements.problem.style.width = '100px';

        elements.uInput.style.marginTop = '-68px';
        elements.uInput.style.marginLeft = '120px';
        elements.uInput.style.height = '15px';
        elements.uInput.style.fontSize = '15px';
        elements.uInput.style.width = '70px';

        elements.equalSign.style.marginTop = '-40px';
        elements.equalSign.style.marginRight = '87px';
        elements.equalSign.style.marginLeft = '95px';

        elements.submit.style.marginLeft = '10px';
        elements.submit.style.fontSize = '12px';
        elements.submit.style.marginLeft = '10px';
        elements.submit.style.marginTop = '-40px';

        elements.actions.style.display = 'none';

        elements.history.style.width = '220px';
        elements.history.style.height = '50%';
        elements.history.style.marginLeft = '0px';

        elements.tableContent.style.fontSize = '8px';

        elements.bubble.style.left = '45%';
        elements.bubble.style.bottom = '75%';
        elements.bubble.style.opacity = '1';
        elements.bubble.style.fontSize = '10px';
        elements.bubble.style.paddingTop = '20px';
        elements.bubble.style.paddingBottom = '20px';
        elements.bubble.style.paddingRight = '3px';
        elements.bubble.style.paddingLeft = '7px';

        elements.scoreBoard.style.width = '90px';
        elements.scoreBoard.style.fontSize = '7px';

    } else if (width <= 768) {
        elements.level2Intro.style.minWidth = '100%';
        elements.level2Intro.style.minHeight = '100%';
        elements.level2Intro.style.width = '120%';
        elements.level2Intro.style.height = '140%';

        elements.level2Vid.style.minWidth = '100%';
        elements.level2Vid.style.minHeight = '100%';
        elements.level2Vid.style.width = '120%';
        elements.level2Vid.style.height = '140%';

        elements.greatJob.style.width = '120%';
        elements.greatJob.style.height = '140%';

        elements.blackboard.style.width = '250px';
        elements.blackboard.style.height = '50%';
        elements.blackboard.style.marginLeft = '510px';

        elements.bbImg.style.width = '265px';
        elements.bbImg.style.height = '55%';
        elements.bbImg.style.left = '503px';
        elements.bbImg.style.top = '18px';

        elements.title.style.translate = '(50%, 0)';
        elements.title.style.marginRight = '55px';
        elements.title.style.fontSize = '23px';
        elements.title.style.letterSpacing = '1px';

        elements.problem.style.fontSize = '15px';
        elements.problem.style.marginRight = '145px';
        elements.problem.style.marginTop = '10px';

        elements.uInput.style.marginTop = '-33px';
        elements.uInput.style.height = '15px';
        elements.uInput.style.fontSize = '15px';
        elements.uInput.style.width = '85px';

        elements.equalSign.style.marginTop = '-42px';
        elements.equalSign.style.marginRight = '87px';
        elements.equalSign.style.marginLeft = '70px';

        elements.submit.style.marginLeft = '10px';
        elements.submit.style.fontSize = '12px';
        elements.submit.style.marginLeft = '10px';
        elements.submit.style.marginTop = '0px';

        elements.actions.style.display = 'none';

        elements.history.style.width = '380px';
        elements.history.style.height = '29%';

        elements.tableContent.style.fontSize = '8px';

        elements.bubble.style.left = '60%';
        elements.bubble.style.opacity = '1';
        elements.bubble.style.bottom = '73%';
        elements.bubble.style.paddingTop = '20px';
        elements.bubble.style.paddingBottom = '10px';
        elements.bubble.style.paddingRight = '0px';
        elements.bubble.style.paddingLeft = '10px';

        elements.greatJob.style.width = '120%';
        elements.greatJob.style.height = '140%';

    }
};
const level3Responsiveness = () => {
    const width = window.innerWidth;
    if (width <= 480) {

        elements.level3Intro.style.width = '110%';
        elements.level3Intro.style.height = '150%';

        elements.level3Vid.style.width = '110%';
        elements.level3Vid.style.height = '150%';

        elements.endGame.style.width = '110%';
        elements.endGame.style.height = '150%';

        elements.blackboard.style.width = '230px';
        elements.blackboard.style.height = '45%';
        elements.blackboard.style.marginLeft = '250px';

        elements.bbImg.style.width = '230px';
        elements.bbImg.style.height = '57%';
        elements.bbImg.style.left = '250px';
        elements.bbImg.style.top = '-15px';

        elements.title.style.translate = '(50%, 0)';
        elements.title.style.marginRight = '50px';
        elements.title.style.marginBottom = '30px';

        elements.title.style.fontSize = '18px';
        elements.title.style.letterSpacing = '1px';

        elements.problem.style.fontSize = '15px';
        elements.problem.style.marginRight = '105px';
        elements.problem.style.marginTop = '-20px';
        elements.problem.style.width = '100px';
        elements.problem.style.height = '15px';

        elements.uInput.style.marginTop = '-72px';
        elements.uInput.style.marginLeft = '100px';
        elements.uInput.style.height = '13px';
        elements.uInput.style.fontSize = '15px';
        elements.uInput.style.width = '80px';

        elements.equalSign.style.marginTop = '-35px';
        elements.equalSign.style.marginRight = '87px';
        elements.equalSign.style.marginLeft = '70px';

        elements.submit.style.marginLeft = '10px';
        elements.submit.style.fontSize = '12px';
        elements.submit.style.marginLeft = '10px';
        elements.submit.style.marginTop = '-40px';

        elements.actions.style.display = 'none';

        elements.history.style.width = '220px';
        elements.history.style.height = '50%';
        elements.history.style.marginLeft = '0px';
        elements.history.style.marginTop = '-10px';

        gameState.tableContent.style.fontSize = '8px';

        elements.bubble.style.left = '47%';
        elements.bubble.style.bottom = '75%';
        elements.bubble.style.opacity = '1';
        elements.bubble.style.fontSize = '8px';
        elements.bubble.style.paddingBottom = '10px';
        elements.bubble.style.paddingRight = '0px';

        elements.scoreBoard.style.width = '90px';
        elements.scoreBoard.style.fontSize = '7px';


    } else if (width <= 768) {
        elements.level3Intro.style.width = '100%';
        elements.level3Intro.style.height = '150%';
        elements.level3Vid.style.width = '95%';
        elements.level3Vid.style.height = '1s0%';

        elements.endGame.style.width = '100%';
        elements.endGame.style.height = '150%';

        elements.blackboard.style.width = '320px';
        elements.blackboard.style.height = '50%';
        elements.blackboard.style.marginLeft = '370px';
        elements.blackboard.style.marginTop = '0px';

        elements.bbImg.style.width = '320px';
        elements.bbImg.style.height = '53%';
        elements.bbImg.style.left = '375px';
        elements.bbImg.style.top = '0px';

        elements.title.style.translate = '(50%, 0)';
        elements.title.style.marginRight = '65px';
        elements.title.style.marginTop = '10px';
        elements.title.style.fontSize = '28px';
        elements.title.style.letterSpacing = '1px';

        elements.problem.style.fontSize = '15px';
        elements.problem.style.marginRight = '145px';
        elements.problem.style.marginTop = '20px';

        elements.uInput.style.marginTop = '-33px';
        elements.uInput.style.height = '15px';
        elements.uInput.style.fontSize = '15px';
        elements.uInput.style.width = '85px';

        elements.equalSign.style.marginTop = '-42px';
        elements.equalSign.style.marginRight = '87px';
        elements.equalSign.style.marginLeft = '70px';

        elements.submit.style.marginLeft = '10px';
        elements.submit.style.fontSize = '12px';
        elements.submit.style.marginLeft = '10px';
        elements.submit.style.marginTop = '0px';

        elements.actions.style.display = 'none';

        elements.history.style.width = '380px';
        elements.history.style.height = '29%';
        elements.history.style.marginTop = '10px';

        elements.tableContent.style.fontSize = '8px';

        elements.bubble.style.left = '45%';
        elements.bubble.style.opacity = '1';
        elements.bubble.style.paddingTop = '15px';
        elements.bubble.style.paddingBottom = '15px';
        elements.bubble.style.paddingRight = '3px';
        elements.bubble.style.paddingLeft = '7px';
        elements.bubble.style.fontSize = '11px';
        elements.bubble.style.letterSpacing = '1px';

        elements.greatJob.style.width = '120%';
        elements.greatJob.style.height = '140%';
    }
};
const outOfEasy = () => {
    allBubbles(elements.bubble, text.wellDoneText, i = 0);
    elements.bgVid.style.zIndex = 0;
    elements.bgVid.style.display = 'none';
    elements.bubble.style.fontSize = '10px';
    elements.bubble.style.paddingTop = '20px';
    elements.bubble.style.paddingBottom = '20px';
    elements.bubble.style.paddingLeft = '8px';
    elements.bubble.style.paddingRight = '3px';
    elements.wellDone.style.display = 'block';
    elements.wellDone.play();
    triggerAnim();
    elements.bubble.animate([
        {
            width: '1px',
            height: '1px'
        },
        {
            width: 'auto',
            height: 'auto',
            borderRadius: '80% 80% 80% 0%'
        }
    ], {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
    });

    setTimeout(() => {
        elements.transPage.style.zIndex = 10;
        elements.transPage.style.opacity = 1;
        elements.wellDone.style.zIndex = 0;
    }, 2000);
}

const intoMedium = () => {
    setTimeout(() => {
        elements.level2Vid.style.zIndex = 8;
        elements.level2Vid.style.opacity = 1;

    }, 2200);
    setTimeout(() => {
        elements.transPage.style.zIndex = 0;
        elements.transPage.style.opacity = 0;
        elements.wellDone.style.display = 'none';
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
        elements.uInput.style.marginTop = '-33px';
        elements.equalSign.style.marginTop = '-40px';
        elements.equalSign.style.marginRight = '90px';
        elements.equalSign.style.marginLeft = '70px';
        elements.submit.style.marginLeft = '0px';
        elements.actions.style.display = 'none';
        elements.history.style.width = '380px';
        elements.bubble.style.left = '50%';
        elements.bubble.style.opacity = '1';
        level2Responsiveness();
        triggerAnim();

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
            duration: 1000,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease-in-out'
        })
        allBubbles(elements.bubble, text.level2Text, i = 0);

        elements.level2Vid.play();

        elements.pointsCount.innerText = 0;
        elements.negPoints.innerText = 0;
        initializeTable();
        randExercise(gameState.selectedOperator, false);
        gameState.score = 0;
        gameState.negScore = 0;
    }, 3000);
}
const outOfMedium = () => {
    level2Responsiveness();
    allBubbles(elements.bubble, text.greatJobText, i = 0);
    elements.level2Vid.style.zIndex = 0;
    elements.level2Vid.style.opacity = 0;
    elements.greatJob.style.opacity = 1;
    elements.greatJob.style.zIndex = 20;

    elements.bubble.style.fontSize = '10px';
    elements.greatJob.play();
    triggerAnim();
    elements.bubble.animate([
        {
            width: '1px',
            height: '1px'
        },
        {
            width: 'auto',
            height: 'auto',
            borderRadius: '80% 80% 80% 0%'
        }
    ], {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
    });

    setTimeout(() => {
        elements.transPage.style.zIndex = 10;
        elements.transPage.style.opacity = 1;
        elements.greatJob.style.zIndex = 0;
    }, 2000);
}
const intoHard = () => {
    setTimeout(() => {
        elements.level3Vid.style.zIndex = 8;
        elements.level3Vid.style.opacity = 1;
        elements.level3Vid.style.width = '110%';
        elements.level3Vid.style.height = '150%';

    }, 2200);
    setTimeout(() => {
        elements.transPage.style.opacity = 0;
        elements.transPage.style.zIndex = 0;
        elements.transPage.style.display = 'none';
        elements.blackboard.style.width = '400px';
        elements.blackboard.style.height = '60%';
        elements.blackboard.style.marginLeft = '615px';
        elements.bbImg.style.width = '400px';
        elements.bbImg.style.height = '55%';
        elements.bbImg.style.left = '615px';
        elements.bbImg.style.top = '0';
        elements.title.style.marginTop = '-20px';
        elements.title.style.marginLeft = '20px';
        elements.title.style.fontSize = '25px';
        elements.submit.style.marginTop = '-85px';
        elements.history.style.marginTop = '-75px';
        elements.history.style.height = '27%';
        elements.problem.style.marginTop = '-25px';
        elements.uInput.style.marginTop = '-95px';
        elements.equalSign.style.marginTop = '-70px';
        elements.bubble.style.left = '50%';
        elements.bubble.style.bottom = '75%';
        triggerAnim();
        allBubbles(elements.bubble, text.level3Text, i = 0);
        level3Responsiveness();
        elements.bubble.animate([
            {
                width: '1px',
                height: '1px'
            },
            {
                width: '80px',
                height: '30px',
            }
        ], {
            duration: 1000,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease-in-out'
        })
        elements.level3Vid.play();

        gameState.question = '';
        gameState.correctAnswer = '';
        gameState.uAnswer = null;
        gameState.cellRow = initializeTable();
        randExercise(gameState.selectedOperator, false);
        document.getElementById('exercise').innerText = gameState.question;
        elements.pointsCount.innerText = 0;
        elements.negPoints.innerText = 0;
        gameState.score = 0;
        gameState.negScore = 0;
    }, 3000);
}
const gameFinish = () => {
    setTimeout(() => {
        elements.champ.volume = 0.5;
        elements.champ.play();
        fadeInAudio(elements.champ, 3000);
        fadeOutAudio(elements.bgMusic, 2000);
    }, 2500);

    elements.endGame.style.zIndex = 15;
    elements.endGame.style.opacity = 1;
    elements.endGame.play();

    elements.bubble.style.bottom = '73%';
    elements.bubble.style.fontSize = '10px';
    elements.bubble.style.padding = '20px';
    elements.bubble.style.paddingBottom = '15px';

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
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
    });
    allBubbles(elements.bubble, text.congratsText, i = 0)

    setTimeout(() => {
        const elementsToFade = [
            elements.blackboard,
            elements.bbImg,
            elements.scoreBoard,
        ];

        elementsToFade.forEach(element => {
            element.style.transition = 'opacity 7s ease-in-out';
            element.style.opacity = '0';
        });

        const blackScreen = document.querySelector('#blackScreen');
        blackScreen.style.zIndex = 999;
        blackScreen.style.transition = 'opacity 7s ease-in-out';
        blackScreen.style.opacity = '1';

        fadeOutAudio(elements.champ, 7000);
    }, 7000);
    setTimeout(() => {
        location.reload();
    }, 15000)
}


export { outOfEasy, intoMedium, outOfMedium, intoHard, gameFinish, level2Responsiveness, level3Responsiveness };