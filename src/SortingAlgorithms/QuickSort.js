function GetQuickSortAnimation(){
        let arr = [50,23,9,18,61,32];
        QuickSort(arr, 0, arr.length - 1);
    }
    GetQuickSortAnimation();
    function QuickSort(arr, low, high){
        
        if(low < high){
            let pi = Partition(arr, low, high);
            console.log(arr);
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
        }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}