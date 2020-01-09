export default function InsertionSort(array){
    let arr = array.slice(0);
    let animations = []
    for (let index = 0; index < arr.length; index++) {
        
        if(index != 0){
            let currentIndex = index
            while(arr[currentIndex] < arr[currentIndex - 1]){
                if(currentIndex == 0){ break; }
                let temp = arr[currentIndex];
                arr[currentIndex] = arr[currentIndex - 1];
                arr[currentIndex - 1] = temp;
                animations.push([currentIndex, currentIndex - 1]);
                currentIndex--;
            }
        }
    }
    return animations;
}