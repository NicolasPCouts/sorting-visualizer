export default function InsertionSort(arr){
    for (let index = 0; index < arr.length; index++) {
        
        if(index != 0){
            let currentIndex = index
            while(arr[currentIndex] < arr[currentIndex - 1]){
                if(currentIndex == 0){ break; }

                var temp = arr[currentIndex];
                arr[currentIndex] = arr[currentIndex - 1];
                arr[currentIndex - 1] = temp
                currentIndex--;
            }
        }
    }
    return arr;
}