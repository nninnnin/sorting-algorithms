// Load application styles
import '../assets/styles/index.less';
import sorting from './utils/sorting';
import UIpainter from './utils/ui-painter';

const SORTING_ALGORITHMS = {
    'bubble' : sorting.bubbleSort,
    'insertion' : sorting.insertionSort,
    'quick' : sorting.quickSort,
    'merge' : sorting.mergeSort,
};

let sortingAlgorithm = 'bubble';
const arr = [];
let operationQueue = [];

const buttons = document.getElementById('buttons');
const userInput = document.getElementById('userInput');
const addButton = document.getElementById('addButton');
const startButton = document.getElementById('startButton');
const arrDisplay = document.getElementById('arrayDisplay');
const visualizeButton = document.getElementById('visualizeButton');

// validation
userInput.addEventListener('keyup', (e) => {
    const input = e.target;

    if (e.keyCode == 13) {
        if (addButton.disabled) {
            return;
        } else {
            arr.push(parseInt(input.value));
            input.value = '';
            arrDisplay.value = arr;
            input.style.border = '1px solid black'
            addButton.disabled = true;

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
});

visualizeButton.addEventListener('click', (e) => {
    paintArray(arr);

    startButton.disabled = false;
});

startButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!sortingAlgorithm) {
        alert('알고리즘을 선택해주세요!');
        return;
    }

    startSorting(arr);
});


Array.from(buttons.children).forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        sortingAlgorithm = e.target.id;
        console.log(sortingAlgorithm);

        Array.from(buttons.children).forEach((button) => {
            button.classList.remove('selectedAlgorithm');
        })

        e.target.classList.add('selectedAlgorithm');
    })
})

function paintArray (arr) {
    UIpainter.paint(arr);
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
        
        console.log(operation);
        await UIpainter.select(operation.currentBar, 'yellowgreen');
        await UIpainter.select(operation.currentBar + 1, 'yellowgreen', 1);
        
        if (operation.swapped) {
            await UIpainter.swap(operation.currentBar, operation.currentBar + 1);
        }

        if (operation.fixed) {
            await UIpainter.fix(operation.fixed);
        }

        await UIpainter.select(operation.currentBar, 'grey');
        await UIpainter.select(operation.currentBar + 1, 'grey', 1);
    }

    UIpainter.fix(0);
}

async function visualizeInsertionSort (operationQueue) {
    let checked = null;

    for (let i = 0; i < operationQueue.length; i++) {
        const operation = operationQueue[i];
        console.log(operation);

        
        const currentBar = operation.currentBar;
        
        await UIpainter.select(currentBar, 'yellowgreen');
        
        if (operation.hasOwnProperty('comparison')) {
            const comparison = operation.comparison;
            await UIpainter.select(comparison, 'orangered', 50);
            await UIpainter.select(comparison, 'grey', 700);
            checked = comparison;
        }

        if (operation.moved) {
            if (checked !== 0) {
                await UIpainter.select(checked-1, 'orangered', 100);
                await UIpainter.select(checked-1, 'grey', 750);
            }

            await UIpainter.replace(currentBar, checked);
            await UIpainter.select(checked, 'grey', 300);
        }

        if (operation.hasOwnProperty('fixed')) {
            await UIpainter.select(currentBar, 'grey', 300);

            for (let j = 0; j <= operation.fixed; j++) {
                await UIpainter.fix(j, 50);
            }
        }
        
        if (i === operationQueue.length - 1) {
            for (let k = 0; k < arr.length; k++) {
                await UIpainter.select(k, 'white', 100);
            }
        }
    }
}
async function visualizeQuickSort () {

}
async function visualizeMergeSort () {

}
