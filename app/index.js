// Load application styles
import '../assets/styles/index.less';
import sorting from './utils/sorting';
import UIpainter from './utils/ui-painter';
import { result } from 'lodash';

const SORTING_ALGORITHMS = {
    bubble : sorting.bubbleSort,
    insertion : sorting.insertionSort,
    quick : sorting.quickSort,
    merge : sorting.mergeSort,
};

const COLORS = {
    DEFAULT_BAR_GR : 'grey',
    SELECTED_BAR_YG : 'yellowgreen',
    SELECTED_BAR_OR : 'orangered',
};

let sortingAlgorithm = 'bubble';
let arr = [];
let operationQueue = [];

const buttons = document.getElementById('buttons');
const userInput = document.getElementById('userInput');
const addButton = document.getElementById('addButton');
const startButton = document.getElementById('startButton');
const arrDisplay = document.getElementById('arrayDisplay');
const visualizeButton = document.getElementById('visualizeButton');
const historyButton = document.getElementById('historyButton');
const history = document.getElementById('history');


Array.from(buttons.children).forEach((button, _, buttons) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        sortingAlgorithm = e.target.id;

        buttons.forEach((button) => {
            button.classList.remove('selectedAlgorithm');
        });

        e.target.classList.add('selectedAlgorithm');
    })
});

userInput.addEventListener('keyup', (e) => {
    const input = e.target;

    const KEYCODE_ENTER = 13;

    if (e.keyCode == KEYCODE_ENTER) {
        if (addButton.disabled) {
            return;
        } else {
            arr.push(parseInt(input.value));
            input.value = '';
            arrDisplay.value = arr;
            input.style.border = '1px solid black'
            addButton.disabled = true;

            visualizeButton.disabled = false;
            return;
        }
    }

    const integer = /^[-+]?\d+$/;

    if (integer.test(input.value)) {
        input.style.border = '3px solid yellowgreen';
        addButton.disabled = false;
    } else {
        input.style.border = '3px solid red';
        addButton.disabled = true;
    }
});

addButton.addEventListener('click', (e) => {
    arr.push(parseInt(userInput.value));
    userInput.value = '';

    visualizeButton.disabled = false;
});

visualizeButton.addEventListener('click', (e) => {
    switch (sortingAlgorithm) {
        case 'bubble':
            UIpainter.paint(arr);
            break;
        case 'insertion':
            UIpainter.paint(arr);
            break;
        case 'quick':
            UIpainter.createCards(arr);
            break;
        case 'merge':
            break;
    };
    

    const historyData = JSON.parse(localStorage.getItem('history')) || [];

    if (historyData.length > 4) {
        historyData.shift();
    }

    historyData.push(arr);

    localStorage.setItem('history', JSON.stringify(historyData));

    if (history.children.length) history.removeChild(history.children[0]);
    history.appendChild(renderHistoryButtons());

    startButton.disabled = false;
    e.target.disabled = true;
});

startButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!sortingAlgorithm) {
        alert('알고리즘을 선택해주세요!');
        return;
    }
    
    startSorting(arr);
});

historyButton.addEventListener('click', (e) => {
    history.classList.toggle('disappear');
});

history.appendChild(renderHistoryButtons());

function renderHistoryButtons() {
    const buttons = document.createElement('div');

    JSON.parse(localStorage.getItem('history')).forEach((item) => {
        const button = document.createElement('div');

        const el = document.createElement('button');
        el.innerHTML = item;
        el.addEventListener('click', (e) => {
            const content = e.target.textContent.split(',').map((val) => parseInt(val));
            arr = content;
            arrDisplay.value = content;

            visualizeButton.disabled = false;
        })
        button.appendChild(el);

        const br = document.createElement('br');
        button.appendChild(br);

        buttons.appendChild(button);
    });

    return buttons;
}


async function startSorting (arr) {
    const operations = SORTING_ALGORITHMS[sortingAlgorithm](arr);
    operationQueue = [...operations];

    switch (sortingAlgorithm) {
        case 'bubble':
            await visualizeBubbleSort(operationQueue);
            break;
        case 'insertion':
            await visualizeInsertionSort(operationQueue);
            break;
        case 'quick':
            await visualizeQuickSort(operationQueue);
            break;
        case 'merge':
            await visualizeMergeSort(operationQueue);
            break;
    };
}

async function visualizeBubbleSort (operationQueue) {
    for (let i = 0; i < operationQueue.length; i++) {
        const operation = operationQueue[i];
        
        await UIpainter.select(operation.currentBar, COLORS.SELECTED_BAR_YG);
        await UIpainter.select(operation.currentBar + 1, COLORS.SELECTED_BAR_YG, 1);
        
        if (operation.swapped) {
            await UIpainter.swap(operation.currentBar, operation.currentBar + 1);
        }

        await UIpainter.select(operation.currentBar, COLORS.DEFAULT_BAR_GR);
        await UIpainter.select(operation.currentBar + 1, COLORS.DEFAULT_BAR_GR, 1); TH

        if (operation.fixed) {
            await UIpainter.fix(operation.fixed);
        }
    }
    
    await UIpainter.fix(0);

    for (let k = 0; k < arr.length; k++) {
        await UIpainter.select(k, 'white', 100);
    }
}

async function visualizeInsertionSort (operationQueue) {
    let checked = null;

    for (let i = 0; i < operationQueue.length; i++) {
        const operation = operationQueue[i];
        const currentBar = operation.currentBar;
        
        await UIpainter.select(currentBar, COLORS.SELECTED_BAR_YG);
        
        if (operation.hasOwnProperty('comparison')) {
            const comparison = operation.comparison;
            await UIpainter.select(comparison, COLORS.SELECTED_BAR_OR, 50);
            await UIpainter.select(comparison, COLORS.SELECTED_BAR_OR, 700);
            checked = comparison;
        }

        if (operation.moved) {
            if (checked !== 0) {
                await UIpainter.select(checked-1, COLORS.SELECTED_BAR_OR, 100);
                await UIpainter.select(checked-1, COLORS.DEFAULT_BAR_GR, 750);
            }

            await UIpainter.replace(currentBar, checked);
            await UIpainter.select(checked, COLORS.DEFAULT_BAR_GR, 300);
        }

        if (operation.hasOwnProperty('fixed')) {
            await UIpainter.select(currentBar, COLORS.DEFAULT_BAR_GR, 300);

            for (let j = 0; j <= operation.fixed; j++) {
                await UIpainter.fix(j, 50);
            }
        }
    }

    for (let k = 0; k < arr.length; k++) {
        await UIpainter.select(k, 'white', 100);
    }
}

async function visualizeQuickSort (operationQueue) {
    for (let i = 0; i < operationQueue.length; i++) {
        await processVisualization(operationQueue[i]);

        await wait();
    }
}

async function visualizeMergeSort () {
}

function wait (timeout) {
    timeout = timeout ? timeout : 300;
    
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout);
    });
}

async function processVisualization (task) {
    switch (task.type) {
        case 'flag pivot':
            await UIpainter.markFlag(task.from, task.to, 'pivot');
            break;
        case 'flag left':
            await UIpainter.markFlag(task.from, task.to, 'left');
            break;
        case 'flag right':
            await UIpainter.markFlag(task.from, task.to, 'right');
            break;
        case 'swap cards':
            await UIpainter.swapCards(task.from, task.to);
            break;
        case 'partitioned':
            await UIpainter.markFlag(task.from, null, 'pivot');
            break;
        case 'separation':
            await UIpainter.separateCards(task.pivot, task.height, task.arr);
            break;
        case 'reconcile':
            await UIpainter.reconcile();
            break;
    }
    
}
