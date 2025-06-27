let array = [];
let speed = 500;

function generateArray() {
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    displayArray();
    clearSteps();
}

function generateArrayFromInput() {
    const userInput = document.getElementById("userInput").value;
    array = userInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    displayArray();
    clearSteps();
}

function displayArray() {
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.className = "array-bar";
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function logStep(step) {
    const stepsContainer = document.getElementById("stepsContainer");
    const stepElement = document.createElement("p");
    stepElement.textContent = step;
    stepsContainer.appendChild(stepElement);
}

function clearSteps() {
    document.getElementById("stepsContainer").innerHTML = "";
}

function updateComplexity(time, space) {
    document.getElementById("timeComplexity").textContent = time;
    document.getElementById("spaceComplexity").textContent = space;
}

async function startSorting() {
    let algorithm = document.getElementById("algorithm").value;
    speed = document.getElementById("speedRange").value;
    clearSteps();

    switch (algorithm) {
        case "bubble":
            updateComplexity("O(n²)", "O(1)");
            await bubbleSort();
            break;
        case "selection":
            updateComplexity("O(n²)", "O(1)");
            await selectionSort();
            break;
        case "insertion":
            updateComplexity("O(n²)", "O(1)");
            await insertionSort();
            break;
        case "merge":
            updateComplexity("O(n log n)", "O(n)");
            await mergeSort(0, array.length - 1);
            break;
        case "quick":
            updateComplexity("O(n log n)", "O(log n)");
            await quickSort(0, array.length - 1);
            break;
    }
    displayArray();
    logStep("Array is sorted.");
}

// Bubble Sort
async function bubbleSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                logStep(`Swapped ${array[j]} and ${array[j + 1]}`);
                displayArray();
                await sleep(speed);
            }
        }
    }
}

// Selection Sort
async function selectionSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        logStep(`Swapped ${array[i]} and ${array[minIdx]}`);
        displayArray();
        await sleep(speed);
    }
}

// Insertion Sort
async function insertionSort() {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        logStep(`Inserted ${key} at position ${j + 1}`);
        displayArray();
        await sleep(speed);
    }
}

// Quick Sort
async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            logStep(`Swapped ${array[i]} and ${array[j]}`);
            displayArray();
            await sleep(speed);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    logStep(`Pivot ${pivot} placed at position ${i + 1}`);
    displayArray();
    await sleep(speed);
    return i + 1;
}

// Merge Sort
async function mergeSort(start, end) {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        logStep(`Inserted ${array[k]} at position ${k}`);
        displayArray();
        await sleep(speed);
        k++;
    }
    while (i < left.length) {
        array[k] = left[i];
        logStep(`Inserted ${array[k]} at position ${k}`);
        displayArray();
        await sleep(speed);
        i++; k++;
    }
    while (j < right.length) {
        array[k] = right[j];
        logStep(`Inserted ${array[k]} at position ${k}`);
        displayArray();
        await sleep(speed);
        j++; k++;
    }
}

document.addEventListener("DOMContentLoaded", generateArray);
