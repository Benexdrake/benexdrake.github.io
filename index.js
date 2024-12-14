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
        sortAlgorithm.cancelationToken = true;
        switch(sort)
        {
            case 1:
                title.innerText = 'BubbleSort';
                break;
            case 2:
                title.innerText = 'SelectionSort';
                break;
            case 3:
                title.innerText = 'InsertionSort';
            case 4:
                title.innerText = 'ShellSort';
            case 5:
                title.innerText = 'CocktailShakerSort';
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
    }

    await finish();
}

buttonHandler();
createLines();