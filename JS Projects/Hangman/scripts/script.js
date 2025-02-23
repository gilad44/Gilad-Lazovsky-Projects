const keyboard = document.querySelector('#keyboard-container');
const topKeys = document.querySelector('#keyboard-top');
const bottomKeys = document.querySelector('#keyboard-bottom');
const input = document.querySelector('#word-input');
const keys = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace',
];
const backspaceIndex = keys.indexOf('backspace');
if (backspaceIndex !== -1) {
    keys[backspaceIndex] = '<-';
}
keys.forEach(key => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('key');
    button.textContent = key;
    if (key === 'x' || key === 'c' || key === 'v' || key === 'b' || key === 'n' || key === 'm' || key === '<-') {
        bottomKeys.appendChild(button);
    } else {
        topKeys.appendChild(button);
    }

    button.addEventListener('click', () => {
        if (button.textContent === '<-') {
            input.value = input.value.slice(0, -1);
        } else if (button.textContent === 'space') {
            input.value += ' ';
        } else if (button.textContent === 'enter') {
            input.value = null;
        } else {
            input.value += key;
        }
    });
});
const chosenWord = document.querySelector('#chosen-word');
const levelSelect = document.querySelector('#level-select');
const start = document.querySelector('#start');
levelSelect.addEventListener('change', () => {
    chosenWord.innerHTML = '';
});
start.addEventListener('click', () => {
    const level = levelSelect.value;
    if (level === 'Select level') {
        alert('Please select a level');
    } else {
        randWord(level).then(word => {
            if (word) {
                initializeGame(word, level);
            }
        });
    }
});
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    window.location.reload();
});
const randWord = async (level) => {
    let request;

    try {
        if (level === 'easy') {
            request = await fetch('https://random-word-api.vercel.app/api?words=10&length=5');
        } else if (level === 'medium') {
            request = await fetch('https://random-word-api.vercel.app/api?words=10&length=7');
        } else if (level === 'hard') {
            request = await fetch('https://random-word-api.vercel.app/api?words=10&length=9');
        } else {
            throw new Error('Invalid level');
        }

        if (!request.ok) {
            throw new Error(`HTTP error! status: ${request.status}`);
        }
        const rawResponse = await request.text();
        const data = JSON.parse(rawResponse);

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Invalid data format');
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        const word = data[randomIndex];
        console.log(word);

        return word;
    } catch (error) {
        console.error('Error fetching random word:', error);
        alert('Failed to fetch random word. Please try again later.');
        return null;
    }
};

const wordArray = async (word, level) => {
    const chosenWord = document.querySelector('#chosen-word');
    splitWord = word.split('');

    const randLetters = (word) => {
        const minVisibleLetters = Math.ceil(word.length * 0.3);
        let visibleCount = 0;

        const randomizedLetters = word.map((letter, index) => {
            if (Math.random() > 0.5 && visibleCount < minVisibleLetters) {
                visibleCount++;
                return letter;
            } if (visibleCount < minVisibleLetters && index === word.length - 1) {
                visibleCount++;
                return letter;

            } else {
                return '';
            }
        });
        return randomizedLetters;
    };
    const letters = randLetters(splitWord);
    for (letter of letters) {

        letterContainer = document.createElement('div');
        letterContainer.style.display = 'flex';
        letterContainer.style.justifyContent = 'center';
        letterContainer.style.alignContent = 'center';
        letterContainer.style.borderBottom = '2px solid black';
        letterContainer.style.width = '20px';
        letterContainer.style.height = '30px';
        letterContainer.style.margin = '0 4px';
        const span1 = document.createElement('span');
        span1.textContent = letter;
        span1.style.margin = 'auto';
        span1.style.marginBottom = '20px';
        span1.style.textAlign = 'center';
        span1.style.width = '4px';
        span1.style.height = '4px';


        const span2 = document.createElement('span');
        span2.style.width = '4px';
        span2.style.height = '4px';
        span2.style.marginBottom = '100px';

        letterContainer.appendChild(span1);
        letterContainer.appendChild(span2);
        chosenWord.appendChild(letterContainer);


    }
    return splitWord;
};
let currentHandleGuess;
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentHandleGuess) {
        currentHandleGuess(input.value);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (currentHandleGuess) {
            currentHandleGuess(input.value);
        }
    }
});
const gameLogic = async (word, level) => {
    const chosenWord = await wordArray(word, level);
    const spans = document.querySelectorAll('#chosen-word span');
    const setLevelStyle = (level) => {
        const parchment = document.querySelector('#wordParchment');
        parchment.classList.remove('word-container-easy', 'word-container-medium', 'word-container-hard');

        parchment.classList.add(`word-container-${level}`);

        const letterContainers = document.querySelectorAll('#chosen-word div');
        const letterSizes = {
            'easy': { width: '10%', height: '22%', },
            'medium': { width: '6%', height: '22%', },
            'hard': {
                width: '5%', height: '22%'
            }
        };

        letterContainers.forEach(container => {
            Object.assign(container.style, letterSizes[level]);
        });
    };

    if (level === 'medium') {
        setLevelStyle('medium');
    } else if (level === 'hard') {
        setLevelStyle('hard');
    } else {
        setLevelStyle('easy');
    }
    const handleGuess = (uInput) => {
        uInput = uInput.toLowerCase();
        chosenWord.forEach((letter, index) => {
            if (letter === uInput) {
                spans[index * 2].textContent = uInput;
            }
        });
        const currentWord = Array.from(spans)
            .filter((_, i) => i % 2 === 0)
            .map(span => span.textContent)
            .join('');

        if (currentWord === chosenWord.join('')) {
            const winWords = ["AWESOME !!", "VICTORY !!", "COOL !!", "YOU     WIN !!", "AMAZING !!", "BOOM !!", "YOU     ROCK !!", "KA-POW !!"];
            const chosenWinWord = winWords[Math.floor(Math.random() * winWords.length)];

            const winText = document.getElementById("winText");
            winText.style.visibility = 'visible';
            winText.innerHTML = "";

            winText.innerHTML = chosenWinWord;
            let randomRotation = Math.random() * 20 - 10;
            gsap.timeline()
                .to("#winText", {
                    visibility: 'visible',
                    opacity: 1,
                    scale: 1.2,
                    rotation: randomRotation,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                })
                .to("#winText", {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })
                .to("#winText", {
                    opacity: 0,
                    scale: 0.5,
                    y: -50,
                    duration: 1,
                    delay: 2,
                    ease: "back.in(2)"
                });


            setTimeout(() => {
                const resetSVGParts = () => {
                    const svgParts = {
                        beam: { clipPath: '#clipBeam', width: '0' },
                        rope: { clipPath: '#clipRope', width: '0' },
                        body: { clipPath: '#clipBody', width: '0' },
                        leftArm: { clipPath: '#clipLeftArm', width: '0' },
                        rightArm: { clipPath: '#clipRightArm', width: '0' },
                        leftLeg: { clipPath: '#clipLeftLeg', width: '0' },
                        rightLeg: { clipPath: '#clipRightLeg', width: '0' }
                    };

                    Object.values(svgParts).forEach(part => {
                        const elements = document.querySelectorAll(`[clip-path="url(${part.clipPath})"]`);
                        elements.forEach(el => {
                            el.style.visibility = 'visible';
                            el.style.opacity = '1';
                            el.style.zIndex = '3'
                        });

                        const clipRect = document.querySelector(`${part.clipPath} rect`);
                        if (clipRect) {
                            clipRect.setAttribute('width', part.width);
                        }
                    });

                    const headCircle = document.querySelector('.head');
                    if (headCircle) {
                        headCircle.style.visibility = 'visible';
                        headCircle.style.opacity = '1';
                        headCircle.setAttribute('r', '0');
                    }

                    const wood = document.querySelector('[fill="url(#woodTexture)"]');
                    if (wood) {
                        wood.style.visibility = 'visible';
                        wood.style.opacity = '1';
                    }

                    wrongGuesses = 0;
                };

                resetSVGParts();
                const chosenWordContainer = document.querySelector('#chosen-word');
                chosenWordContainer.innerHTML = '';

                wrongGuesses = 0;

                setTimeout(() => {
                    randWord(level).then(word => {
                        if (word) {
                            initializeGame(word, level);
                        }
                    });
                }, 100);
            }, 500)
        }
        if (!chosenWord.includes(uInput)) {
            handleWrongAnswer();
        }
        input.value = '';
    };
    currentHandleGuess = handleGuess;
};
const animateFill = (clipPathId, targetWidth) => {
    if (clipPathId === "#clipHead") {
        const headCircle = document.querySelector('.head');
        headCircle.style.visibility = 'visible';
        headCircle.style.opacity = '1';

        anime({
            targets: '.head',
            r: [0, 15],
            duration: 1000,
            easing: "easeInOutQuad"
        });
        return;
    }

    const elements = document.querySelectorAll(`[clip-path="url(${clipPathId})"]`);
    const clipRect = document.querySelector(`${clipPathId} rect`);

    elements.forEach(element => {
        element.style.visibility = 'visible';
        element.style.opacity = '1';
    });

    anime({
        targets: clipRect,
        width: [0, targetWidth],
        duration: 1000,
        easing: "easeInOutQuad"
    });
};
let wrongGuesses = 0;

const handleWrongAnswer = () => {
    console.log(wrongGuesses);

    wrongGuesses++;
    switch (wrongGuesses) {
        case 1:
            animateFill("#clipBeam", 200);
            break;
        case 2:
            animateFill("#clipRope", 5);
            break;
        case 3:
            animateFill("#clipHead", 30);
            break;
        case 4:
            animateFill("#clipBody", 45);
            break;
        case 5:
            animateFill("#clipLeftArm", 20);
            break;
        case 6:
            animateFill("#clipRightArm", 20);
            break;
        case 7:
            animateFill("#clipLeftLeg", 30);
            break;
        case 8:
            animateFill("#clipRightLeg", 30);
            break;
        case 9:
            const fullBody = document.querySelector('.full-body');
            fullBody.classList.add('game-over');
            document.querySelectorAll('.head, .body, .arms, .legs, .rope').forEach(el => {
                el.style.visibility = 'hidden';
            });
            gsap.to("#game-over", { opacity: 1, scale: 1.2, duration: 1, ease: "power2.out" });
            gsap.to("#game-over", {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            })
            const shakeTl = gsap.timeline();
            shakeTl.to("body", {
                x: "+=10",
                duration: 0.05,
                repeat: 10,
                yoyo: true
            }).set("body", {
                clearProps: "x"
            });

            const gameOver = document.querySelector('#game-over');
            gameOver.style.opacity = 1;
            gameOver.style.visibility = 'visible';

            gsap.to("#flash", { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 });

            document.querySelectorAll("#game-over span").forEach((letter, index) => {
                gsap.to(letter, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "bounce.out"
                });
            });
            break;

    }
}


const initializeGame = (word, level) => {

    gameLogic(word, level);
};


