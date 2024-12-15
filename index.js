import Sort from "./sort.js";

let numbers = []

let sort = 1;

let sortAlgorithm = new Sort();

// Wählt den ersten Index in der Dropdown Liste
let select = document.getElementById('sort');
select.selectedIndex = 0;

// Setzt den Value der Range auf 1
let speedButton = document.getElementById('speed')
speedButton.value = 1;


// Erstellt die Linien
let createLines = () => 
{
    numbers = [];
    for(let i = 1; i<= 150; i++)
    {
        numbers.push(i)
    }
    numbers.sort(() => 0.5 - Math.random())


    let main = document.getElementById('main_sort')

    if(main === null)
        return;

    main.innerHTML = '';

    for(let number of numbers)
    {
        let line = document.createElement('div')
        line.classList.add('line')
        line.style.height= `${number*3}px`;
        line.dataset.value = number;
        main.appendChild(line)
    }
    sortAlgorithm.cancelationToken = false;
}


// Färbt alle Linien am Ende grün ein
let finish = async () => 
{
    let lines = document.getElementsByClassName('line')
    if(lines.length === 0)
        return;
    
    for(let line of lines)
    {
        if(sortAlgorithm.cancelationToken == true)
        {
                return;
        }
        line.style.backgroundColor = 'green'
        await new Promise(f => setTimeout(f, 1));
    }
}

let buttonHandler = () => 
{
    let startButton = document.getElementById('start')
    let stopButton = document.getElementById('stop')
    let sortButton = document.getElementById('sort');
    let speedButton = document.getElementById('speed')

    startButton.addEventListener('click', async () => {
        sortAlgorithm.cancelationToken = true;
        await new Promise(f => setTimeout(f, 100));
        main();
    })

    stopButton.addEventListener('click', () => {
        sortAlgorithm.cancelationToken = true;
    })

    // Erweitern um auf weitere Sort Algorithmen zu reagieren.
    // Ändert den Title und den Value von sort
    sortButton.addEventListener('change', (event) => {
        sort = parseInt(event.target.value)
        let title = document.getElementById('title')
        let info = document.getElementById('info')
        let info_text = document.getElementById('info_text')

        sortAlgorithm.cancelationToken = true;
        switch(sort)
        {
            case 1:
                title.innerText = 'BubbleSort';
                info.href = 'https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/'
                info_text.innerText = 'Click me for Bubble Sort Information'
                break;
            case 2:
                title.innerText = 'SelectionSort';
                info.href = 'https://javascript.plainenglish.io/selection-sort-939850e195c8'
                info_text.innerText = 'Click me for Selection Sort Information'
                break;
            case 3:
                title.innerText = 'InsertionSort';
                info.href = 'https://vishalrana9915.medium.com/insertion-sort-using-javascript-6132b42fab90'
                info_text.innerText = 'Click me for Insertion Sort Information'
                break;
            case 4:
                title.innerText = 'ShellSort';
                info.href = 'https://reintech.io/blog/javascript-for-implementing-shell-sort'
                info_text.innerText = 'Click me for Shell Sort Information'
                break;
            case 5:
                title.innerText = 'CocktailShakerSort';
                info.href = 'https://medium.com/weekly-webtips/cocktail-sort-in-javascript-6b645c59ecea'
                info_text.innerText = 'Click me for Cocktail Shaker Sort Information'
                break;
            case 6:
                title.innerText = 'HeapSort'
                info.href = 'https://www.geeksforgeeks.org/heap-sort/';
                info_text.innerText = 'Click me for Heap Sort Information'
        }
    })

    speedButton.addEventListener('change', (event) => {
        let speedLabel = document.getElementById('speed_label');

        sortAlgorithm.speed = parseInt(event.target.value)

        speedLabel.innerText = `Speed: ${sortAlgorithm.speed}ms`
    })
}

// Erweitern um mehr Sort Algorithmen auszuführen.
let main = async () => 
{
    createLines();
    
    switch(sort)
    {
        case 1:
            await sortAlgorithm.bubbleSort();
            break;
        case 2:
            await sortAlgorithm.selectionSort();
            break;
        case 3:
            await sortAlgorithm.insertionSort();
            break;
        case 4:
            await sortAlgorithm.shellSort();
            break;
        case 5:
            await sortAlgorithm.cocktailShakerSort();
            break;
        case 6:
            await sortAlgorithm.heapSort();
            break;
    }

    await finish();
}

buttonHandler();
createLines();