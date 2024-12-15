
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

    async insertionSort() 
    {
        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;
    
        let length = lines.length;

        for(let i = 1; i< length; i++)
        {
            let currentHeight = lines[i].style.height;
            let currentValue = lines[i].dataset.value;

            let lastIndex = i-1;

            while(lastIndex >= 0 && parseInt(lines[lastIndex].dataset.value) > parseInt(currentValue))
            {
                if(this.cancelationToken == true)
                {
                    return;
                }

                lines[lastIndex+1].dataset.value = lines[lastIndex].dataset.value;
                lines[lastIndex+1].style.height = lines[lastIndex].style.height;
                lines[lastIndex+1].style.backgroundColor = 'red'
                await new Promise(f => setTimeout(f, this.speed));
                lines[lastIndex+1].style.backgroundColor = 'var(--color3)';
                lastIndex--;
            }

            lines[lastIndex+1].style.height = currentHeight;
            lines[lastIndex+1].dataset.value = currentValue;
        }
    }

    async mergeSort()
    {
        // Später https://dev.to/jaimaldullat/how-merge-sort-works-in-javascript-5c1e
    }

    async quickSort()
    {
        // Später https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/
    }

    async countingSort()
    {
        // Später https://learnersbucket.com/tutorials/algorithms/counting-sort-algorithm-in-javascript/
    }

    async radixSort()
    {
        // Später https://www.doabledanny.com/radix-sort-in-javascript
    }

    async bucketSort()
    {
        // Später https://initjs.org/bucket-sort-in-javascript-dc040b8f0058
    }

    async heapSort()
    {
        // Später https://www.geeksforgeeks.org/heap-sort/
        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;
    
        let n = lines.length;

        for(let i = Math.floor(n / 2) - 1; i >= 0; i--)
        {
            await this.heapify(n, i);
        }

        for(let i = n - 1; i >= 0; i--)
        {
            if(this.cancelationToken == true)
            {
                return;
            }

            let tempHeight = lines[0].style.height;
            let tempValue = lines[0].dataset.value;

            lines[0].style.height = lines[i].style.height;
            lines[0].dataset.value = lines[i].dataset.value;

            lines[i].style.height = tempHeight;
            lines[i].dataset.value = tempValue;

            await this.heapify(i,0);
        }
    }
    
    async heapify(n, i)
    {
        if(this.cancelationToken == true)
        {
            return;
        }

        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;

        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let largest = i;
        
        let lineLeft = parseInt(lines[left].dataset.value)
        let lineRight = parseInt(lines[right].dataset.value)
        let lineLargest = parseInt(lines[largest].dataset.value)
        
        if(left < n && lineLeft > lineLargest)
            largest = left;
        
        if(right < n && lineRight > lineLargest)
            largest = right;

        if(largest !== i)
        {
            let tempHeight = lines[i].style.height;
            let tempValue = lines[i].dataset.value;
            
            lines[i].style.height = lines[largest].style.height;
            lines[i].dataset.value = lines[largest].dataset.value;

            lines[largest].style.height = tempHeight;
            lines[largest].dataset.value = tempValue;
            await new Promise(f => setTimeout(f, this.speed));

            await this.heapify(n, largest)
        }
    }

    async shellSort()
    {
        // https://reintech.io/blog/javascript-for-implementing-shell-sort

        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;
    
        let length = lines.length;

        for(let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap/2))
        {
            for(let i = gap; i < length; i++)
            {
                let tempHeight = lines[i].style.height;
                let tempValue = lines[i].dataset.value;
                let j = i;

                for(j; j >= gap && parseInt(lines[j-gap].dataset.value) > parseInt(tempValue); j -= gap)
                {
                    if(this.cancelationToken == true)
                    {
                            return;
                    }

                    lines[j].dataset.value = lines[j-gap].dataset.value;
                    lines[j].style.height = lines[j-gap].style.height;
                    lines[j].style.backgroundColor = 'red';
                    await new Promise(f => setTimeout(f, this.speed));
                    lines[j].style.backgroundColor = 'var(--color3)';
                }

                lines[j].dataset.value = tempValue;
                lines[j].style.height = tempHeight;
            }
        }
    }

    async cocktailShakerSort()
    {
        let lines = document.getElementsByClassName('line')
        if(lines.length === 0)
            return;
    
        let length = lines.length;

        let is_Sorted = true;

        while(is_Sorted)
        {

            for(let i = 0; i < length - 1; i++)
            {
                if(this.cancelationToken == true)
                {
                    return;
                }
    
                let line1 = parseInt(lines[i].dataset.value);
                let line2 = parseInt(lines[i + 1].dataset.value);

                if(line1 > line2)
                {
                    let tempHeight = lines[i].style.height;
                    let tempValue = lines[i].dataset.value;
    
                    lines[i].style.height = lines[i+1].style.height;
                    lines[i].dataset.value = lines[i+1].dataset.value;
                    lines[i].style.backgroundColor = 'blue'
                    
                    lines[i+1].style.height = tempHeight;
                    lines[i+1].dataset.value = tempValue;
                    lines[i+1].style.backgroundColor = 'red'

                    await new Promise(f => setTimeout(f, this.speed));
                    
                    lines[i].style.backgroundColor = 'var(--color3)'
                    lines[i+1].style.backgroundColor = 'var(--color3)'
                    
                    is_Sorted = true;
                }
            }

                if(!is_Sorted)
                    break;

                is_Sorted = false;

                
                for(let j = length - 1; j > 0; j--)
                {
                    let line1 = parseInt(lines[j-1].dataset.value);
                    let line2 = parseInt(lines[j].dataset.value);

                    if(line1 > line2)
                    {
                        let tempHeight = lines[j].style.height;
                        let tempValue = lines[j].dataset.value;
                        
                        lines[j].style.height = lines[j-1].style.height;
                        lines[j].dataset.value = lines[j-1].dataset.value;
                        lines[j].style.backgroundColor = 'blue'
                        
                        lines[j-1].style.height = tempHeight;
                        lines[j-1].dataset.value = tempValue;
                        lines[j-1].style.backgroundColor = 'red'

                        await new Promise(f => setTimeout(f, this.speed));
                        
                        lines[j].style.backgroundColor = 'var(--color3)'
                        lines[j-1].style.backgroundColor = 'var(--color3)'
                        
                        is_Sorted = true;
                    }

                }
        }
    }

}