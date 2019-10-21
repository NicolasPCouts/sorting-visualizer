import React from 'react'
import './SortingVisualizer.css'
import InsertionSort from '../SortingAlgorithms/InsertionSort'

const NORMAL_COLOR = 'orange';
const CHANGED_COLOR = 'green';

export default class SortingVisualizer extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            arrayToSort: []
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const arrayToSort = [];
        for (let i = 0; i < 200; i++) {
            arrayToSort.push(this.RandomIntBetweenRange(5, 1000));
        }
        this.setState({ arrayToSort });
    }

    insertionSort(){
        let sortedArrayAnim = InsertionSort(this.state.arrayToSort);
        let arrayToSort = this.state.arrayToSort;
        let arrayBars = document.getElementsByClassName('array-item');
        let arrayBarsWithColorChanged = [];

        //loop through all the animations
        for (let index = 0; index < sortedArrayAnim.length; index++) {
            const [i,j] = sortedArrayAnim[index];

            setTimeout(() => {
                //set changed colors back to normal
                if(index !== 0){
                    arrayBarsWithColorChanged.forEach((element, index) => {
                        arrayBars[element].style.backgroundColor = NORMAL_COLOR;
                    });
                    arrayBarsWithColorChanged = [];
                }

                let temp = arrayToSort[i];
                //change array
                arrayToSort[i] = arrayToSort[j];
                arrayToSort[j] = temp;

                //change div bar colors, unl
                if(index != sortedArrayAnim.length - 1){
                    arrayBars[i].style.backgroundColor = CHANGED_COLOR;
                    arrayBars[j].style.backgroundColor = CHANGED_COLOR;
                    arrayBarsWithColorChanged.push(i);
                    arrayBarsWithColorChanged.push(j);
                }
                this.setState({ arrayToSort })
            }, 10);
        }
    }

    render() {
        const {arrayToSort} = this.state;

        return (
            <div className="main-div">
                {arrayToSort.map((value, idx) => (
                    <div className="array-item" key={idx} style={{height: value}}>
                        
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