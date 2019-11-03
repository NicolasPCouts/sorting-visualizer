import React from 'react'
import './SortingVisualizer.css'
import InsertionSort from '../SortingAlgorithms/InsertionSort'
import SelectionSort from '../SortingAlgorithms/SelectionSort'

const NORMAL_COLOR = 'red';
const CHANGED_COLOR = 'white';
const AFTER_CHANGE_COLOR = 'green';


export default class SortingVisualizer extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            arrayToSort: [],
            prevChanged: []
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const arrayToSort = [];
        const prevChanged = [];
        for (let i = 0; i < 20; i++) {
            arrayToSort.push(this.RandomIntBetweenRange(5, 1000));
        }
        this.setState({ arrayToSort, prevChanged });
    }

    insertionSort(){
        let sortedArrayAnim = InsertionSort(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let prevChanged = this.state.prevChanged;

        //loop through all the animations
        for (let index = 0; index < sortedArrayAnim.length; index++) {
            const [i,j] = sortedArrayAnim[index];

            setTimeout(() => {
                //change array
                let temp = arrayToSort[i];
                arrayToSort[i] = arrayToSort[j];
                arrayToSort[j] = temp;
            
                prevChanged.push(i,j);

                if(index == sortedArrayAnim.length - 1){
                    prevChanged.push(arrayToSort.length + 1, arrayToSort.length + 1);
                    this.setState({prevChanged});
                }

                this.setState({ arrayToSort, prevChanged })

            }, index * 50);
        }
    }

    selectionSort(){
        console.log(this.state.arrayToSort);
        let sortedArray = SelectionSort(this.state.arrayToSort);
        console.log(sortedArray);
        this.setState({ arrayToSort: sortedArray });
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
                    <div className="array-item" key={idx} style={{height: value, backgroundColor: this.getColor(idx)}}>
                        
                    </div>
                ))}

                <button onClick={() => this.resetArray()}>Generate new array</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
            </ div>
        );
    }

    RandomIntBetweenRange(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
