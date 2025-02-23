
export const gameState = {
    correctAnswer: null,
    uAnswer: null,
    question: '',
    score: 0,
    negScore: 0,
    rightAnswer: null,
    userAnswer: null,
    points: null,
    mode: null,
    tableContent: null,
    cellRow: null,
    selectedOperator: null,
    pExercise: null,
    gameData: [],
    audioEnabled: false,
    videoEnabled: false
};

export const elements = {

    blackboard: document.getElementById('blackboard'),
    bbImg: document.getElementById('bbImg'),
    problem: document.getElementById('exercise'),
    uInput: document.getElementById('uInput'),
    equalSign: document.getElementById('equal'),
    title: document.getElementById('title'),
    history: document.getElementById('history'),
    bgVid: document.getElementById('bg-vid'),
    landing: document.getElementById("startPage"),
    submit: document.querySelector("#send"),
    bgMusic: document.getElementById('bg-music'),
    operators: ["+", "-", "/", "*"],
    actions: document.getElementById("operators"),
    bubble: document.querySelector('#bubble'),
    exercise: document.getElementById("exercise").innerText,
    pointsCount: document.getElementById("points"),
    negPoints: document.getElementById("negPoints"),
    easy: document.getElementById('easy'),
    med: document.getElementById("medium"),
    hard: document.getElementById("hard"),
    transPage: document.getElementById('transPage'),
    wellDone: document.getElementById('wellDone'),
    level2Vid: document.getElementById('level2'),
    level2Intro: document.getElementById('level2Intro'),
    greatJob: document.getElementById('greatJob'),
    level3Vid: document.getElementById('level3'),
    level3Intro: document.getElementById('level3Intro'),
    champ: document.getElementById('champ'),
    endGame: document.getElementById('endGame'),
    tableContent: document.getElementById('content'),
    scoreBoard: document.getElementById('scoreBoard'),
};
let value;
export const initElements = (value);


