let animations = [];
export default function GetQuickSortAnimation(array){
        animations = [];
        let arr = array.slice(0);
        QuickSort(arr, 0, arr.length - 1);
        return animations;
}

function QuickSort(arr, low, high){
    
    if(low < high){
        let pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
}


function Partition(arr, low, high){
    let i = low - 1;//smaller element
    for (let index = low; index <= high - 1; index++) {
        if( arr[index] <= arr[high]){
            i++;
            //swap
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
            animations.push([i, index]);
        }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    animations.push([i + 1, high]);
    return i + 1;
}