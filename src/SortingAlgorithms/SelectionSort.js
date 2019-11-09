export default function SelectionSort(arr){
    let array = arr.slice(0);
    let animations = [];
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i; j < array.length; j++) {
            if(array[j] < array[minIndex]){
                minIndex = j;
                animations.push([i, minIndex, false]);
            }
        }
        
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        animations.push([i, minIndex, true]);
    }

    return animations;
}