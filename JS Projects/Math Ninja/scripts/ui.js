
import { gameState, elements, initElements } from './variables.js';
const text = {
    gameStartText: 'Choose an operator, and answer correctly',
    wellDoneText: 'Well done',
    level2Text: "Welcome to Level 2",
    greatJobText: "Great Job",
    level2IntroText: "Type in the correct answer",
    level3Text: "Welcome to Level 3",
    congratsText: "Congratulations! You are a true Math Ninja",
    level3IntroText: "Fill in the correct answer",
}

const triggerAnim = () => {
    elements.bubble.style.animation = 'none';
    void elements.bubble.offsetWidth;
}

const allBubbles = (element, text, i = 0) => {
    if (i === 0) {
        setTimeout(() => elements.bubble.style.opacity = 1, 500);
        element.innerText = '';
    };

    if (i === text.length) {
        setTimeout(() => {
            elements.bubble.style.opacity = 0;
        }, 1500);
        return;
    }

    setTimeout(() => {
        element.innerText += text[i];
    }, 700);
    setTimeout(() => allBubbles(element, text, i + 1), 50);
}
const updateLayoutClass = () => {
    const width = window.innerWidth;
    const blackboard = elements.blackboard;

    blackboard.classList.remove('blackboard-mobile', 'blackboard-tablet', 'blackboard-desktop');

    if (width <= 768) {
        blackboard.classList.add('blackboard-768');
    } else if (width <= 1024) {
        blackboard.classList.add('blackboard-1024');
    } else {
        blackboard.classList.add('blackboard-desktop');
    }
};
updateLayoutClass();
export { allBubbles, triggerAnim, text };