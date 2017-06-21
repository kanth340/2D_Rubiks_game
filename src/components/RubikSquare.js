import React from 'react';
import Swipeable from 'react-swipeable';

export default class RubikSquare extends React.Component {
	constructor(props) {
		super(props);
		this.index = Number(this.props.index);
	}
	onSwipedUp(){
		console.log(this.index);
		if([0,1,2,3].indexOf(this.index) === -1) {
			this.props.onSwipe(this.index,this.index-4);
		}
	}

	onSwipedDown(){
		console.log(this.index);
		if([12,13,14,15].indexOf(this.index) === -1) {
			this.props.onSwipe(this.index,this.index+4);
		}
	}

	onSwipedLeft(){
		console.log(this.index);
		if([0,4,8,12].indexOf(this.index) === -1) {
			this.props.onSwipe(this.index,this.index-1);
		}
	}

	onSwipedRight() {
		console.log(this.index);
		if([3,7,11,15].indexOf(this.index) === -1) {
			this.props.onSwipe(this.index,this.index+1);
		}
	}

	render() {
		let styles = {
			'backgroundColor':this.props.color
		};
		return (
			<Swipeable
				style={{touchAction: 'none','backgroundColor':this.props.color}}
				className="rubikSquare"
				onSwipedUp= {this.onSwipedUp.bind(this)}
				onSwipedDown = {this.onSwipedDown.bind(this)}
				onSwipedLeft = {this.onSwipedLeft.bind(this)}
				onSwipedRight = {this.onSwipedRight.bind(this)}
				trackMouse = {true}
				>
			</Swipeable>
		);
	}
}
