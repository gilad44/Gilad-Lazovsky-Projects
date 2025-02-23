//*********************************/ User Interface /**************************************/

/////////////////////////////////// Page Setting ///////////////////////////////////////

document.body.classList.add('m-0', 'p-0', 'font-assistant');


//////////////////////////////// Variables Establishment ///////////////////////////////////

const main = document.getElementById('main');
const menu = document.getElementById('menu');
const menuContainer = document.getElementById('outter');
const workArea = document.getElementById('workArea');
const menuHead = document.querySelector('h2');
const instructions = document.querySelector('#instructions');
const labels = document.querySelectorAll('.inpuTitle');
let uInput = document.querySelectorAll('.uInput');
const dropDown = document.querySelectorAll('.inputSelect')
const elementID = document.querySelector('#elementID');
const bgPallette = document.querySelector('#bgPallette');
const bgColor = document.getElementById('bgColor');
const frameColor = document.getElementById('frameColor');
const borderPallette = document.querySelector('#borderPallette');
const frameType = document.querySelector('#frame');
const frameWidth = document.querySelector('#frameWidth');
const frameRadius = document.querySelector('#frameRadius');
const shadowPallette = document.querySelector('#shadowPallette');
const boxShadowColor = document.querySelector('#boxShadowColor');
const boxShadowX = document.querySelector('#boxShadowX');
const boxShadowY = document.querySelector('#boxShadowY');
const textArea = document.getElementById('content');
const elementWidth = document.getElementById('width');
const elementHeight = document.getElementById('height');
const elFontColor = document.getElementById('fontColor');
const textPallette = document.querySelector('#textPallette');
const elTextSize = document.getElementById('fontSize');
const add = document.getElementById('add');
const save = document.getElementById('save');
const clearHistory = document.getElementById('clearHistory');
const clearBoard = document.getElementById('clearBoard');
const buttons = document.getElementById('buttons');
const elFontFam = document.getElementById('fontFam');
const titleSize = document.getElementById('titleSize');
const title = document.getElementById('title');
const innerSpace = document.getElementById('padding');
const outterSpace = document.getElementById('margin');

const createColorPallette = (colors, container, targetInput) => {
    colors.forEach(color => {
        const cell = document.createElement('div');
        container.classList.add('w-full', 'h-24', 'grid', 'lg:grid-cols-8', 'sm:grid-cols-4', 'mt-4', 'lg:mr-0', 'md:mr-1', 'sm:mr-1');
        cell.classList.add('lg:w-5', 'md:w-5', 'sm:w-5', 'lg:h-5', 'md:h-5', 'sm:h-5', 'rounded', 'cursor-pointer', 'border', 'border-solid', 'border-black', 'hover:scale-90', 'hover:transition-transform');
        cell.style.background = color;
        cell.onclick = () => {
            targetInput.value = color;
        }
        container.appendChild(cell)
    });
}

//**********************************/ UI Styling /*****************************************/
// Main Container
main.classList.add('flex', 'w-screen', 'h-screen', 'text-white', 'text-base', 'overflow-hidden', 'position-fixed');
// Menu Container
menuContainer.classList.add('sm:w-2/6', 'md:w-2/6', 'lg:w-2/6', 'h-full', 'bg-transparent', 'overflow-x-hidden');
// Menu
menu.classList.add('text-sm', 'sm:text-[12px]', 'flex', 'flex-col', 'p-5', 'min-h-screen', 'bg-gradient-to-br', 'from-black', 'via-gray-500', 'to-white');
menuHead.classList.add('text-2xl', 'text-white', 'font-bold', 'mb-4');
instructions.classList.add('lg:text-sm', 'md:text-sm', 'sm:text-md', 'text-gray-300', 'mb-6');
textArea.classList.add('w-full', 'rounded', 'bg-white', 'text-black', 'h-24', 'border', 'border-solid', 'border-black');

///////////////////////////////////////// Labels ///////////////////////////////////////////
labels.forEach(label => {
    label.classList.add('text-white', 'text-sm', 'mb-1');
});

////////////////////////////////////// Input Fields  ///////////////////////////////////////
uInput.forEach(input => {
    input.classList.add('lg:text-sm', 'md:text-xs', 'sm:text-[10px]', 'w-full', 'rounded', 'bg-white', 'text-black', 'h-6', 'border', 'border-solid', 'border-black');
});

dropDown.forEach(select => {
    select.classList.add('lg:text-sm', 'md:text-xs', 'sm:text-[11px]', 'w-full', 'rounded', 'bg-white', 'text-black', 'border', 'border-solid', 'border-black', 'h-6');
});


const colors = [
    '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
    '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
];
createColorPallette(colors, bgPallette, bgColor);
createColorPallette(colors, borderPallette, frameColor);
createColorPallette(colors, shadowPallette, boxShadowColor);
createColorPallette(colors, textPallette, fontColor);


/////////////////////////////////////// Buttons ////////////////////////////////////////////
buttons.classList.add('w-full', 'flex', 'flex-wrap', 'justify-center', 'items-center', 'gap-4', 'mt-4');

document.querySelectorAll('button').forEach(button => {
    button.classList.add('sm:w-32', 'md:w-36', 'lg:w-28', 'h-8', 'bg-button-color', 'rounded', 'text-black', 'text-lg', 'cursor-pointer', 'hover:bg-blue-700', 'hover:text-white', 'transition-transform', 'duration-300', 'ease-in-out');
});


/////////////////////////////////////// Work Area //////////////////////////////////////////
workArea.classList.add('sm:w-full', 'h-screen', 'bg-white', 'flex', 'flex-wrap', 'content-start', 'justify-start', 'overflow-hidde', 'relative', 'p-8');


//*************************************/ Actions /*****************************************/

const elementInput = document.getElementById('elementType');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const areaWidth = parseFloat(getComputedStyle(workArea).width);
const areaHeight = parseFloat(getComputedStyle(workArea).height);

let projectData = [];
save.addEventListener('click', () => {
    const elements = workArea.children;
    const savedElements = Array.from(elements).map(element => {
        const titleElement = element.querySelector('h1, h2, h3, h4, h5, h6');
        const contentDiv = element.querySelector('.content-div');
        const idTag = element.querySelector('.style-id');
        return {
            type: element.tagName,
            id: element.id,
            style: {
                width: element.style.width,
                height: element.style.height,
                color: element.style.color,
                background: element.style.background,
                fontFamily: element.style.fontFamily,
                borderColor: element.style.borderColor || 'transparent',
                borderStyle: element.style.borderStyle,
                borderWidth: element.style.borderWidth,
                borderRadius: element.style.borderRadius,
                boxShadow: element.style.boxShadow,
                padding: element.style.padding,
                margin: element.style.margin,
                display: element.style.display,
                flexDirection: element.style.flexDirection,
                alignItems: element.style.alignItems,
                justifyContent: element.style.justifyContent,
                overflow: element.style.overflow,
                boxSizing: element.style.boxSizing
            },
            idTagStyle: idTag ? {
                position: 'absolute',
                padding: '2px 5px',
                top: '5px',
                left: '5px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                borderRadius: '3px',
                fontSize: '12px',
                zIndex: '1000',
                width: 'auto',
                maxWidth: '150px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                pointerEvents: 'none'
            } : null,
            content: contentDiv?.innerText || '',
            contentStyle: contentDiv ? {
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                padding: '10px 20px 10px 10px',
                boxSizing: 'border-box',
                wordWrap: 'break-word',
                textAlign: 'left',
                direction: 'ltr',
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto'
            } : null,
            title: titleElement ? {
                tag: titleElement.tagName.toLowerCase(),
                text: titleElement.innerText,
                style: {
                    fontSize: titleElement.style.fontSize,
                    textAlign: titleElement.style.textAlign,
                    marginBottom: titleElement.style.marginBottom,
                    display: titleElement.style.display,
                    position: titleElement.style.position
                }
            } : null,
            originalWidth: element.style.width,
            originalHeight: element.style.height
        };
    });
    const saveData = {
        timestamp: new Intl.DateTimeFormat(undefined, {
            timeStyle: 'short',
            dateStyle: 'short'
        }).format(new Date()),
        elements: savedElements
    };

    localStorage.setItem('History', JSON.stringify(saveData));
    alert('הפרויקט נשמר בהצלחה');
});

clearHistory.addEventListener('click', () => {
    const confirmation = confirm('למחוק את כל הסטוריית הפרוייקט?');
    if (confirmation) {
        localStorage.removeItem('History');
        localStorage.clear();
    }
    uInput.forEach(input => {
        input.value = '';
    });
    dropDown.forEach(item => {
        item.selectedIndex = 0;
    });
});

clearBoard.addEventListener('click', () => {
    const confirmation = confirm('האם אתה בטוח שברצונך למחוק את כל האלמנטים?');
    if (confirmation) {
        uInput.forEach(input => {
            input.value = '';
        });
        dropDown.forEach(item => {
            item.selectedIndex = 0;
        });
        workArea.innerHTML = '';
    }
});

class Element {
    type;
    id;
    width;
    height;
    bgColor;
    borderStyle;
    borderWidth;
    borderColor;
    borderRadius;
    boxShadowColor;
    boxShadowX;
    boxShadowY;
    content;
    titleSize;
    titleText;
    fontColor;
    fontSize;
    fontFamily;
    padding;
    margin;


    constructor(
        newElementType, //(1)
        newElementID, //(2)
        newElementWidth, //(3)
        newElementHeight,  //(4)
        newElementBgColor, //(5)
        newElementBorderStyle, //(6)
        newElementBorderWidth, //(7)
        newElementBorderColor, //(8)
        newElementBorderRadius, //(9)
        newElementBoxShadowColor, //(10)
        newElementBoxShadowX, //(11)
        newElementBoxShadowY, //(12)
        newElementContent, //(13)
        newElementTitleSize, //(14)
        newElementTitleText, //(15)
        newElementFontColor, //(16)
        newElementFontSize, //(17)
        newElementFontFamily, //(18)
        newElementPadding, //(19)
        newElementMargin) { //(20)
        this.type = newElementType;
        this.id = newElementID;
        this.width = newElementWidth;
        this.height = newElementHeight;
        this.bgColor = newElementBgColor.value;
        this.borderStyle = newElementBorderStyle;
        this.borderWidth = newElementBorderWidth;
        this.borderColor = newElementBorderColor;
        this.borderRadius = newElementBorderRadius;
        this.boxShadowColor = newElementBoxShadowColor;
        this.boxShadowX = newElementBoxShadowX;
        this.boxShadowY = newElementBoxShadowY;
        this.content = newElementContent;
        this.titleSize = newElementTitleSize;
        this.titleText = newElementTitleText;
        this.fontColor = newElementFontColor;
        this.fontSize = newElementFontSize;
        this.fontFamily = newElementFontFamily;
        this.padding = newElementPadding;
        this.margin = newElementMargin;

        const newElement = document.createElement(this.type);

        if (this.titleSize && this.titleText.value) {
            const titleElement = document.createElement(this.titleSize);
            newElement.appendChild(titleElement);

            titleElement.innerText = this.titleText.value;

            Object.assign(titleElement.style, {
                textAlign: 'center',
                width: '100%',
                marginBottom: '10px',
                display: 'block',
                position: 'relative'
            });
            switch (this.titleSize) {
                case 'h1':
                    titleElement.style.fontSize = '2.5em';
                    break;
                case 'h2':
                    titleElement.style.fontSize = '2em';
                    break;
                case 'h3':
                    titleElement.style.fontSize = '1.75em';
                    break;
                case 'h4':
                    titleElement.style.fontSize = '1.5em';
                    break;
                case 'h5':
                    titleElement.style.fontSize = '1.25em';
                    break;
                case 'h6':
                    titleElement.style.fontSize = '1em';
                    break;
            }
        }
        newElement.dataset.originalWidth = this.width;
        newElement.dataset.originalHeight = this.height;
        newElement.dataset.aspectRatio = this.width / this.height;
        newElement.style.position = 'relative';

        const idTag = document.createElement('div');
        if (this.id && this.id.value && this.id.value.trim() !== '') {
            idTag.classList.add('style-id');

            idTag.innerText = this.id.value;
            newElement.setAttribute('id', this.id.value);
            newElement.appendChild(idTag);
        }

        if (this.type === elementInput.options[0].value) {
            alert('נא בחר סוג אלמנט');
        }

        const calculateDimensions = () => {
            const maxWidth = areaWidth * 0.9;
            const maxHeight = areaHeight * 0.9;

            const elementWidth = parseInt(this.width) || 0;
            const elementHeight = parseInt(this.height) || 0;
            const paddingTotal = (parseInt(this.padding?.value) || 0) * 2;
            const marginTotal = (parseInt(this.margin?.value) || 0) * 2;

            const totalWidth = elementWidth + paddingTotal + marginTotal;
            const totalHeight = elementHeight + paddingTotal + marginTotal;

            if (totalWidth > maxWidth || totalHeight > maxHeight) {
                alert('גודל האלמנט חורג מגבולות המותר. נסה שנית עם מידות מתאימות');
                return false;
            }

            const finalWidth = Math.min(elementWidth, maxWidth - (paddingTotal + marginTotal));
            const finalHeight = Math.min(elementHeight, maxHeight - (paddingTotal + marginTotal));

            Object.assign(newElement.style, {
                width: `${finalWidth}px`,
                height: `${finalHeight}px`,
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden',
                boxSizing: 'border-box',
                maxWidth: `${maxWidth - 30}px`,
                maxHeight: `${maxHeight - 30}px`
            });
            return true;
        };
        if (calculateDimensions()) {
            workArea.appendChild(newElement);
        }
        window.addEventListener('resize', () => {
            const newAreaWidth = parseFloat(getComputedStyle(workArea).width);
            const newAreaHeight = parseFloat(getComputedStyle(workArea).height);

            if (newAreaWidth !== areaWidth || newAreaHeight !== areaHeight) {
                calculateDimensions();
            }
        });
        if (this.bgColor) {
            newElement.style.background = this.bgColor;

        }
        if (this.borderStyle) {
            newElement.style.borderStyle = this.borderStyle;
        }
        if (this.borderWidth) newElement.style.borderWidth = `${this.borderWidth}px`;
        if (this.borderColor) {
            newElement.style.borderColor = this.borderColor;
        }
        if (this.borderRadius.value) {
            newElement.style.borderRadius = `${this.borderRadius.value}%`;
        }
        if (this.boxShadowColor.value && this.boxShadowX.value && this.boxShadowY.value) {
            newElement.style.boxShadow = `${this.boxShadowX.value}px ${this.boxShadowY.value}px ${this.boxShadowColor.value} `;
        };
        if (this.content) {
            const contentDiv = document.createElement('div');
            contentDiv.innerText = this.content;
            contentDiv.classList.add('content-div');
            Object.assign(newElement.style, {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                boxSizing: 'border-box'
            });
            Object.assign(contentDiv.style, {
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                textOverflow: 'ellipsis',
                padding: '10px 20px 10px 10px', boxSizing: 'border-box',
                wordWrap: 'break-word',
                textAlign: 'left',
                direction: 'ltr',
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto'
            });
            newElement.appendChild(contentDiv);
        }

        if (this.fontColor.value) { newElement.style.color = this.fontColor.value; }
        if (this.fontSize) { newElement.style.fontSize = `${this.fontSize}px`; }
        if (this.fontFamily) {
            newElement.style.fontFamily = this.fontFamily;
        }
        const additionalPadding = 10;
        const userPadding = parseInt(this.padding.value) || 0;
        newElement.style.padding = `${userPadding + additionalPadding}px`;
        const additionalMargin = 40;
        const userMargin = parseInt(this.margin.value) || 0;
        const elementHeight = parseInt(this.height) || 0;
        if (elementHeight > 350) {
            newElement.style.margin = `${userMargin + additionalMargin}px`;
        } else {
            newElement.style.margin = `${userMargin}px`;
        }
        if (`${this.id.value}`.includes(' ')) {
            alert('המזהה לא יכול לכלול רווחים');
            return;
        } if (idTag) {
            idTag.innerText = this.id.value;
        }
    }
}

add.addEventListener('click', () => {
    const newElement = new Element(
        elementInput.value, //(1)
        elementID, //(2) 
        widthInput.value, //(3)
        heightInput.value, //(4)
        bgColor, //(5)
        frameType.value, //(6)
        frameWidth.value, //(7)
        frameColor.value, //(8)
        frameRadius, //(9)
        boxShadowColor, //(10)
        boxShadowX, //(11)
        boxShadowY, //(12)
        textArea.value, //(13)
        titleSize.value, //(14)
        title, //(15)
        elFontColor, //(16)
        elTextSize, //(17)
        elFontFam.value, //(18)
        innerSpace, //(19)
        outterSpace); //(20)

    const createdElement = workArea.lastElementChild;
    if (createdElement) {
        Object.assign(createdElement.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            overflow: 'hidden'
        });

        const contentDiv = createdElement.querySelector('.content-div');
        if (contentDiv) {
            Object.assign(contentDiv.style, {
                flex: '1',
                overflow: 'auto',
                minHeight: '0'
            });
        }
    }
    textArea.value = '';
    dropDown.forEach(option => {
        option.selectedIndex = 0;
    });
    uInput.forEach(input => {
        input.value = '';
    });

});

const restore = document.getElementById('restore');
restore.onclick = () => {
    const saveData = JSON.parse(localStorage.getItem('History'));

    if (saveData && saveData.elements && saveData.elements.length > 0) {
        workArea.innerHTML = '';

        saveData.elements.forEach(element => {
            const newElement = document.createElement(element.type.toLowerCase());

            Object.assign(newElement.style, element.style);

            newElement.dataset.originalWidth = element.style.width;
            newElement.dataset.originalHeight = element.style.height;
            newElement.dataset.aspectRatio = parseFloat(element.style.width) / parseFloat(element.style.height);

            Object.entries(element.style).forEach(([key, value]) => {
                if (value && !['width', 'height'].includes(key)) {
                    newElement.style[key] = value;
                }
            });

            if (element.id) {
                const idTag = document.createElement('div');
                idTag.classList.add('style-id');
                idTag.innerText = element.id;
                newElement.id = element.id;
                newElement.style.position = 'relative';
                Object.assign(idTag.style, {
                    position: 'absolute',
                    padding: '2px 5px',
                    top: '5px',
                    left: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    borderRadius: '3px',
                    fontSize: '12px',
                    zIndex: '1000',
                    width: 'width',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    pointerEvents: 'none'
                });
                newElement.appendChild(idTag);
            }

            if (element.title) {
                const titleElement = document.createElement(element.title.tag);
                titleElement.innerText = element.title.text;
                Object.assign(titleElement.style, {
                    textAlign: 'center',
                    width: '100%',
                    marginBottom: '10px',
                    display: 'block',
                    position: 'relative',
                    ...element.title.style
                });
                newElement.insertBefore(titleElement, newElement.firstChild);
            }

            if (element.content) {
                const contentDiv = document.createElement('div');
                contentDiv.innerText = element.content;
                Object.assign(contentDiv.style, element.contentStyle);
                contentDiv.classList.add('content-div');
                newElement.appendChild(contentDiv);
            }

            workArea.appendChild(newElement);
        });
    } else {
        alert('לא נמצאה היסטוריה');
    }
};