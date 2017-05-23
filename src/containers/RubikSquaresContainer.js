import React from 'react';
import RubikSquare from './../components/RubikSquare'

export default class RubikSquaresContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: this.formRubikSquaresContainer()
		}
	}

	onSwipe(sourceIndex,targetIndex) {
		
	}
	
	randomColorPicker(colorsArray, colorsCountArray) {
		let randomColorCode= Math.floor(Math.random() * (colorsArray.length));
		let color = colorsArray[randomColorCode];
		colorsCountArray[randomColorCode]++;
		if(colorsCountArray[randomColorCode] == 4){
			colorsArray.splice(randomColorCode,1);
			colorsCountArray.splice(randomColorCode,1);
		}
		return color;
	}

	formRubikSquaresContainer() {
		let squares = [];
		let colorsArray = ['#f00','#0f0','#00f','#ff0'];
		let colorsCountArray = [0,0,0,0];
		for(let i=0;i<16;i++) {
			let color = this.randomColorPicker(colorsArray,colorsCountArray)
			squares.push(
				<RubikSquare 
					key={i} 
					index={i} 
					color={color} 
					onSwipe={this.onSwipe}
				/>
			);
		}
		return squares;
	}

	render() {
		return (
			<div className='rubikSquaresContainer'>
				{this.formRubikSquaresContainer()}
			</div>
		);
	}
}