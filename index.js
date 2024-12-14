import Sort from "./sort.js";

let numbers = []

let sort = 1;

let sortAlgorithm = new Sort();

// Wählt den ersten Index in der Dropdown Liste
let select = document.getElementById('sort');
select.selectedIndex = 0;


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
    sortButton.addEventListener('change', async (event) => {
        sort = parseInt(event.target.value)
        let title = document.getElementById('title')
        sortAlgorithm.cancelationToken = true;
        switch(sort)
        {
            case 1:
                title.innerText = 'BubbleSort'
                break;
            case 2:
                title.innerText = 'SelectionSort'
                break;
        }
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
    }

    await finish();
}

buttonHandler();
createLines();