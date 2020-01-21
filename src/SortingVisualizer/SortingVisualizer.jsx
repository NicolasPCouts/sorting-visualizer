import React from 'react'
import './SortingVisualizer.css'
import InsertionSort from '../SortingAlgorithms/InsertionSort'
import SelectionSort from '../SortingAlgorithms/SelectionSort'
import BubbleSort from '../SortingAlgorithms/BubbleSort'
import GetQuickSortAnimation from '../SortingAlgorithms/QuickSort'

const NORMAL_COLOR = 'white';
const CHANGED_COLOR = 'red';
const AFTER_CHANGE_COLOR = 'rgb(4, 255, 0)';

var abort = false;

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
    }

    resetArray(){
        const arrayToSort = [];
        const prevChanged = [];
        for (let i = 0; i < this.state.numberOfItems; i++) {
            arrayToSort.push(this.RandomIntBetweenRange(5, 1000));
        }
        this.setState({ arrayToSort, prevChanged });
        abort = false;
    }
    
    generateNewArray(){
        abort = true;
        this.resetArray();
    }

    async SortArray(algo){
        let sortedArrayAnim = algo(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let prevChanged = this.state.prevChanged;

        for (let index = 0; index < sortedArrayAnim.length; index++) {
            if(this.abort){
                console.log(abort);
                return null;
            }
            const [i,j] = sortedArrayAnim[index];

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
        }
    }

    async selectionSort(){
        let sortedArrayAnim = SelectionSort(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let prevChanged = this.state.prevChanged;

        //loop through all the animations
        for (let index = 0; index < sortedArrayAnim.length; index++) {
            const [i,j, swap] = sortedArrayAnim[index];

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
                
            await sleep(10);
        }
    }

    handleOnChange(event){
        console.log(this.state.numberOfItems);
        event.persist();
        this.setState({numberOfItems : event.target.value}, () => {
            this.resetArray();
            console.log(event.target.value + " - " + this.state.numberOfItems + " - arraySize: " + this.state.arrayToSort.length);
        });
        
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
        let widthValue = 40 / this.state.numberOfItems;
        return (
            <div className="main-div" id="centerdiv">
                <div id="centerdivKeepWidth">
                    {arrayToSort.map((heightValue, idx) => (
                        <div className="array-item" key={idx} style={{height: `${heightValue / 20}vw`, width: `${widthValue}vw`, backgroundColor: this.getColor(idx)}}>
                            
                        </div>
                    ))}
                </div>
                <div id="centerdivKeepWidth">
                    <button onClick={() => this.generateNewArray()}>Generate new array</button>
                    <button onClick={() => this.SortArray(BubbleSort)}>Bubble Sort</button>
                    <button onClick={() => this.SortArray(InsertionSort)}>Insertion Sort</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button onClick={() => this.SortArray(GetQuickSortAnimation)}>Quick Sort</button>
                    <input type="number" min="5" max="1500" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.numberOfItems}/>
                </div>
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