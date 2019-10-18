import React from 'react'
import './SortingVisualizer.css'
import InsertionSort from '../SortingAlgorithms/InsertionSort'
import { animationFrame } from 'C:/Users/nicol/AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/scheduler/animationFrame';

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
        console.log(arrayToSort);
        for (let index = 0; index < sortedArrayAnim.length; index++) {
            const [i,j] = sortedArrayAnim[index];
            setTimeout(() => {
                let temp = arrayToSort[i];
                arrayToSort[i] = arrayToSort[j];
                arrayToSort[j] = temp;
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