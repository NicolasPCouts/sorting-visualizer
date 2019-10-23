import React from 'react'
import './SortingVisualizer.css'
import InsertionSort from '../SortingAlgorithms/InsertionSort'

const NORMAL_COLOR = 'white';
const CHANGED_COLOR = 'red';
const AFTER_CHANGE_COLOR = 'orange';

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
        for (let i = 0; i < 200; i++) {
            arrayToSort.push(this.RandomIntBetweenRange(5, 1000));
        }
        this.setState({ arrayToSort, prevChanged });
    }

    async insertionSort(){
        let sortedArrayAnim = InsertionSort(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let prevChanged = this.state.prevChanged;

        //loop through all the animations
        for (let index = 0; index < sortedArrayAnim.length; index++) {
            await wait();
            const [i,j] = sortedArrayAnim[index];

            //change array
            let temp = arrayToSort[i];
            arrayToSort[i] = arrayToSort[j];
            arrayToSort[j] = temp;

            prevChanged.push(i,j);

            this.setState({ arrayToSort, prevChanged })
        }
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
            </ div>
        );
    }

    RandomIntBetweenRange(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


async function wait() {
	return new Promise(function(resolve) {
  	setTimeout(resolve, 1);
  });
}