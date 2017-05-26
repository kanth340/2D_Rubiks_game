import React from 'react';
import RubikSquare from './../components/RubikSquare';
import ReactCountdownClock from 'react-countdown-clock';

export default class RubikSquaresContainer extends React.Component {

	constructor(props) {
		super(props);
		this.RUBIK_CONTAINER_SIZE = 16;
		this.ROW_LENGTH = Math.sqrt(this.RUBIK_CONTAINER_SIZE);
		this.state = {
			squaresColors: this.randomSquareColors(),
			moves:0,
			isGameOver:false,
			timeUp:false
		}
	}

	swap(src,trgt,array) {
		let temp = array[src];
		array[src] = array[trgt];
		array[trgt] = temp;
		return array;
	}

	isRowWiseOver(colorsArray){
			let color;
			for(let i=0;i < colorsArray.length; i++){
				if(i%this.ROW_LENGTH == 0){
					color = colorsArray[i];
				}
				else{
					if(color === colorsArray[i]) {
						continue;
					}
					else {
						return false;
					}
				}
			}
			return true;
	}

	isColumnWiseOver(colorsArray) {
		let color;
		for(let i= this.ROW_LENGTH;i < colorsArray.length; i++){
			  if(colorsArray[i] === colorsArray[i%this.ROW_LENGTH]) {
					continue;
				}
				else {
					return false;
				}
		}
		return true;
	}

	isGameOver(colorsArray){
		return this.isRowWiseOver(colorsArray) || this.isColumnWiseOver(colorsArray);
	}

	onSwipe(sourceIndex,targetIndex) {
		let swappedSquaresColors = this.swap(sourceIndex,targetIndex,this.state.squaresColors);

		this.setState({
			squaresColors:swappedSquaresColors,
			moves: ++this.state.moves,
			isGameOver: this.isGameOver(swappedSquaresColors)
		});
	}

	formRubikSquaresContainer(squareColors) {
		let squareBlocks = squareColors.map(function(color,i){
				return (<RubikSquare
					key={i}
					index={i}
					color={color}
					onSwipe={this.onSwipe.bind(this)}
				/>);
		}.bind(this));
		return squareBlocks;
	}

	randomColorPicker(colorsArray, colorsCountArray) {
		let randomColorCode= Math.floor(Math.random() * (colorsArray.length));
		let color = colorsArray[randomColorCode];
		colorsCountArray[randomColorCode]++;
		if(colorsCountArray[randomColorCode] == this.ROW_LENGTH){
			colorsArray.splice(randomColorCode,1);
			colorsCountArray.splice(randomColorCode,1);
		}
		return color;
	}

	randomSquareColors() {
		let squares = [];
		let colorsArray = ['#055994','#034003','#8c6804','#a20303'];
		let colorsCountArray = [0,0,0,0];
		for(let i=0;i<this.RUBIK_CONTAINER_SIZE;i++) {
			let color = this.randomColorPicker(colorsArray,colorsCountArray)
			squares.push(color);
		}
		return squares;
	}

	onTimeUp() {
		this.setState({timeUp:true})
	}

	componentDidMount(){

	}

	render() {
		console.log(this.state);
		return (
			<div>
				<div className='countdown-container'>
					<ReactCountdownClock seconds={30}
	                     color="#000"
	                     size={100}
											 paused={this.state.isGameOver}
	                     onComplete={this.onTimeUp.bind(this)}
					 />
			 </div>
				<div className='rubikSquaresContainer'>
					{this.formRubikSquaresContainer(this.state.squaresColors)}
				</div>
				<div className='moves-container'>
					moves: {this.state.moves}
				</div>
				{this.state.isGameOver ? <div className='game-over'><span>good job!!!</span></div>: false}
				{this.state.timeUp ? <div className='time-up'><span>time up!!!</span></div>: false}
			</div>
		);
	}
}
