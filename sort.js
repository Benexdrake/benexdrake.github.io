
export default class Sort
{
    constructor()
    {
        this.cancelationToken = false;
        this.speed = 1;
    }

    async bubbleSort()
    {
        
        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;
        
        let length = lines.length;
        
        for(let i = 0; i < length; i++)
        {
            for(let j = 0; j < length - i - 1; j++)
            {    
                if(this.cancelationToken == true)
                {
                    return;
                }
    
                let line1 = parseInt(lines[j].dataset.value);
                let line2 = parseInt(lines[j + 1].dataset.value);
    
                if(line1 > line2)
                {
                    let tempHeight = lines[j].style.height;
                    let tempValue = lines[j].dataset.value;
    
                    lines[j].style.height = lines[j+1].style.height;
                    lines[j].dataset.value = lines[j+1].dataset.value;
                    lines[j].style.backgroundColor = 'blue'
                    
                    lines[j+1].style.height = tempHeight;
                    lines[j+1].dataset.value = tempValue;
                    lines[j+1].style.backgroundColor = 'red'
                    await new Promise(f => setTimeout(f, this.speed));
                }
                lines[j].style.backgroundColor = 'var(--color3)'
                lines[j+1].style.backgroundColor = 'var(--color3)'
            }
        }
    }
    
    async selectionSort() 
    {
        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;
    
        let length = lines.length;
    
        for(let i = 0; i < length; i++)
        {
            let lowestIndex = i;
            let lowestValue = lines[i].dataset.value;
    
            for(let j = i; j < length; j++)
            {
                if(this.cancelationToken == true)
                {
                    return;
                }
    
                let line1 = parseInt(lines[j].dataset.value);
                let line2 = parseInt(lowestValue);
    
                if(line1 < line2)
                {
                    lowestValue = lines[j].dataset.value
                    lowestIndex = j;
                }
            }
    
            let tempHeight = lines[i].style.height;
            let tempValue = lines[i].dataset.value;
            lines[i].style.height = lines[lowestIndex].style.height;
            lines[i].dataset.value = lines[lowestIndex].dataset.value;
            lines[i].style.backgroundColor = 'blue';
            
            lines[lowestIndex].style.height = tempHeight
            lines[lowestIndex].dataset.value = tempValue
            lines[lowestIndex].style.backgroundColor = 'red';
            await new Promise(f => setTimeout(f, this.speed));
            
            lines[i].style.backgroundColor = 'var(--color3)';
            lines[lowestIndex].style.backgroundColor = 'var(--color3)';
        }
    }
}