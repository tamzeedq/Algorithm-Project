const generateButton = document.getElementById('generate-array');
const bubbleSortButton = document.getElementById('bubble-sort-button');
const insertionSortButton = document.getElementById('insertion-sort-button');
const quickSortButton = document.getElementById('quick-sort-button');
const selectionSortButton = document.getElementById('selection-sort-button');
const mergeSortButton = document.getElementById('merge-sort-button');
// const testButton = document.getElementById('test-button'); // test button for function testing
const sizeSlider = document.getElementById('size-slider');
const sizeInput = document.getElementById('size-input');
const speedSlider = document.getElementById('speed-slider');

var array = new Array();
var arrayLength = 1;
let delay = 50; // speed delay

// change size of array according to slider input or number box input
sizeSlider.addEventListener('change', Event => {
    sizeInput.value = sizeSlider.value;
    arrayLength = sizeSlider.value;
    array = generateArray(arrayLength);
    renderBars(array);
})

sizeInput.addEventListener('change', Event => {
    sizeSlider.value = sizeInput.value;
    arrayLength = sizeInput.value;
    array = generateArray(arrayLength);
    renderBars(array);
})

// change speed of solver
speedSlider.addEventListener('change', Event => {
    delay = speedSlider.value;
    console.log(delay);
})

//generate new array and render array bars
generateButton.addEventListener('click', button => {
    array = generateArray(arrayLength);
    renderBars(array);
})

// sorting buttons
bubbleSortButton.addEventListener('click', button => {
    array = bubbleSort(array);
})

insertionSortButton.addEventListener('click', button => {
    array = insertionSort(array);
})

selectionSortButton.addEventListener('click', button => {
    array = selectionSort(array);
})

mergeSortButton.addEventListener('click', button => {
    array = mergeSort(array);
    renderBars(array);
    
})

quickSortButton.addEventListener('click', button => {
    quickSort(array, 0, array.length - 1);
})

// testButton.addEventListener('click', button => {
//     test()
// })

// delay function
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// generate new random array with or without duplicates
function generateArray(length) {
    let arr = [];

    for (let i = 0; i < length; i++) {
        let number = Math.floor(Math.random() * length) + 1;
        if (arr.includes(number)) {
            i--;
        } else {
            arr.push(number);
        }
        //arr.push(number);
    }

    console.log(arr);
    return arr;
}

// swap values at 2 indexes in a given array and swap corresponding number bars
async function swap(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;

    var numberBarElements = document.getElementsByClassName('bar');
    var bar1 = numberBarElements[indexA]
    var bar2 = numberBarElements[indexB]

    bar1.style.backgroundColor = 'blue';
    bar2.style.backgroundColor = 'blue';
    await sleep(delay);

    var tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;

    var tempValue = bar1.innerHTML;
    bar1.innerHTML = bar2.innerHTML;
    bar2.innerHTML = tempValue;

    bar1.style.backgroundColor = 'rgb(36, 175, 175)';
    bar2.style.backgroundColor = 'rgb(36, 175, 175)';

    return arr;
}

// render visual bars for each value in the array
function renderBars(arr) {
    let barContainerElement = document.getElementById('bars-container');

    while(barContainerElement.firstChild) {
        barContainerElement.removeChild(barContainerElement.firstChild);
    }

    for(let i = 0; i < arr.length; i++) {
        let numberBar = document.createElement('div');
        numberBar.innerHTML = arr[i];
        numberBar.classList.add('bar');
        numberBar.style.height = (90/arr.length) * arr[i] + 'vh';
        numberBar.style.width = (90/arr.length) + 'vw';
        barContainerElement.appendChild(numberBar);

        if (arrayLength >= 85) {
            numberBar.innerHTML = ''; 
        } else if(arr.length >= 65) {
            numberBar.style.fontSize = arr.length/10 + 'px';
        } else if(arr.length >= 50) {
            numberBar.style.fontSize = arr.length/5 + 'px';
        }
    }
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for(let j = 1; j < arr.length; j++) {

            if (arr[j] < arr[j - 1]) {
                arr = await swap(arr, j, j-1);
            }

            await sleep(delay)
        }
    }

    return arr;
}

async function insertionSort(arr) {
    console.log(arr);

    for (let i = 1; i < arr.length; i++) {
        j = i;
        while(j > 0 && (arr[j] < arr[j-1])) {
            arr = await swap(arr, j, j-1);
            j--;
            await sleep(delay)
        }
        await sleep(delay)
    }

    return arr;
}

async function selectionSort(arr) { 
    let n = arr.length;

    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;

        for(let j = i+1; j < n; j++){
            if(arr[j] < arr[min]) {
                min=j; 
            }
        }

        if (min != i) {
            arr = await swap(arr, i, min);   
        }

        await sleep(delay);
    }
    return arr;
}

// **not visualized
function mergeSort(arr) {
    if(arr.length == 1) {
        return arr
    }

    const middleIndex = arr.length / 2
    let arrayA = arr.slice(0, middleIndex)
    let arrayB = arr.slice(middleIndex)

    arrayA = mergeSort(arrayA)
    arrayB = mergeSort(arrayB)

    return merge(arrayA, arrayB)
}

function merge(arrayA, arrayB) {
    var numberBarElements = document.getElementsByClassName('bar');
    let arrayC = new Array() 
    let i = 0 //index for arrayA
    let j = 0 //index for arrayB
    let k = 0

    while(i < arrayA.length && j < arrayB.length) {
        if(arrayA[i] > arrayB[j]) {
            arrayC.push(arrayB[j])
            j++
        } else {
            arrayC.push(arrayA[i])
            i++
        }

        k++

    }

    while(i < arrayA.length) {
        arrayC.push(arrayA[i])
        i++
        k++
    }

    while(j < arrayB.length) {
        arrayC.push(arrayB[j])
        j++
        k++
    }

    return arrayC
}

async function partition(arr, start, end){
    // Taking the last element as the pivot
    let numberBarElements = document.getElementsByClassName('bar');
    const pivotValue = arr[end];
    let pivotIndex = start; 
    
    numberBarElements[end].style.backgroundColor = 'red';

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Swapping elements
            await swap(arr, i, pivotIndex)
            // Moving to next element
            pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    await swap(arr, end, pivotIndex);

    return pivotIndex;
}

async function quickSort(arr, start, end) {
    // Base case 
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = await partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}

// function test(arr) {
//     var numberBarElements = document.getElementsByClassName('bar');

//     var bar1 = numberBarElements[0]
//     var bar2 = numberBarElements[1]

//     var tempHeight = bar1.style.height;
//     bar1.style.height = bar2.style.height;
//     bar2.style.height = tempHeight;

//     var tempValue = bar1.innerHTML;
//     bar1.innerHTML = bar2.innerHTML;
//     bar2.innerHTML = tempValue;
// }


//console.log(insertionSort(array))