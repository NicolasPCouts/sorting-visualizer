import React from 'react'
import './SortingVisualizer.css'
import InsertionSort from '../SortingAlgorithms/InsertionSort'
import SelectionSort from '../SortingAlgorithms/SelectionSort'
import BubbleSort from '../SortingAlgorithms/BubbleSort'
import GetQuickSortAnimation from '../SortingAlgorithms/QuickSort'

const NORMAL_COLOR = 'white';
const CHANGED_COLOR = 'red';
const AFTER_CHANGE_COLOR = 'rgb(4, 255, 0)';


export default class SortingVisualizer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            arrayToSort: [],
            prevChanged: [],
            numberOfItems: 100
        };
    }

    componentDidMount(){
        this.resetArray();
        //this.setState({arrayToSort:[], prevChanged:[]});
    }

    resetArray(){
        const arrayToSort = [];
        const prevChanged = [];
        for (let i = 0; i < this.state.numberOfItems; i++) {
            arrayToSort.push(this.RandomIntBetweenRange(5, 1000));
        }
        this.setState({ arrayToSort, prevChanged });
    }

    async SortArray(algo){
        let sortedArrayAnim = algo(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let prevChanged = this.state.prevChanged;

        for (let index = 0; index < sortedArrayAnim.length; index++) {
            const [i,j] = sortedArrayAnim[index];

            //setTimeout(() => {
                let temp = arrayToSort[i];
                arrayToSort[i] = arrayToSort[j];
                arrayToSort[j] = temp;
            
                prevChanged.push(i,j);

                if(index == sortedArrayAnim.length - 1){
                    prevChanged.push(arrayToSort.length + 1, arrayToSort.length + 1);
                    this.setState({prevChanged});
                }

                this.setState({ arrayToSort,prevChanged });
                await sleep(10);
                
            //}, index * 10);
        }
    }

    async selectionSort(){
        let sortedArrayAnim = SelectionSort(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let prevChanged = this.state.prevChanged;

        //loop through all the animations
        for (let index = 0; index < sortedArrayAnim.length; index++) {
            const [i,j, swap] = sortedArrayAnim[index];

            //setTimeout(() => {
                //change array
                if(swap){
                    let temp = arrayToSort[i];
                    arrayToSort[i] = arrayToSort[j];
                    arrayToSort[j] = temp;
                }
            
                prevChanged.push(i,j);

                if(index == sortedArrayAnim.length - 1){
                    prevChanged.push(arrayToSort.length + 1, arrayToSort.length + 1);
                    this.setState({prevChanged});
                }

                this.setState({ arrayToSort, prevChanged });
                
            //}, index * 10);
            await sleep(10);
        }
    }

    handleOnChange(event){
        console.log(this.state.numberOfItems);
        this.setState({numberOfItems : event.target.value});
        this.resetArray();
        console.log(event.target.value + " - " + this.state.numberOfItems + " - arraySize: " + this.state.arrayToSort.length);
        
    }

    getColor(index){

        let prevChanged = this.state.prevChanged;

        if(prevChanged.includes(index)){
            if(index == prevChanged[prevChanged.length - 1] || index == prevChanged[prevChanged.length - 2]){
                return CHANGED_COLOR;
            }
            else{
                return AFTER_CHANGE_COLOR;
            }
        }
        else{
            return NORMAL_COLOR;
        }
        
    }


    render() {
        const {arrayToSort} = this.state;
        return (
            <div className="main-div">
                {arrayToSort.map((value, idx) => (
                    <div className="array-item" key={idx} style={{height: value / 2, width: 400 / this.state.numberOfItems, backgroundColor: this.getColor(idx)}}>
                        
                    </div>
                ))}

                <button onClick={() => this.resetArray()}>Generate new array</button>
                <button onClick={() => this.SortArray(BubbleSort)}>Bubble Sort</button>
                <button onClick={() => this.SortArray(InsertionSort)}>Insertion Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.SortArray(GetQuickSortAnimation)}>Quick Sort</button>
                <input type="number" min="5" max="1500" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.numberOfItems}/>
            </ div>
        );
    }

    RandomIntBetweenRange(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}