import React from 'react';
import Swipeable from 'react-swipeable';

export default class RubikSquare extends React.Component {
	constructor(props) {
		super(props);
		this.index = Number(this.props.index);
	}
	onSwipedUp(){
		console.log('swiped up');
		this.props.onSwipe(this.index,this.index-4);
	}

	onSwipedDown(){
		console.log('swiped down');
		this.props.onSwipe(this.index,this.index+4);
	}

	onSwipedLeft(){
		console.log('swiped left');
		this.props.onSwipe(this.index,this.index-1);
	}

	onSwipedRight() {
		console.log('swiped right');
		this.props.onSwipe(this.index,this.index+1);
	}
	
	render() {
		let styles = {
			'backgroundColor':this.props.color
		};
		return (
			<Swipeable
				style={{touchAction: 'none'}}
				onSwipedUp= {this.onSwipedUp.bind(this)}
				onSwipedDown = {this.onSwipedDown.bind(this)}
				onSwipedLeft = {this.onSwipedLeft.bind(this)}
				onSwipedRight = {this.onSwipedRight.bind(this)}
				trackMouse = {true}
				>
				<a className="rubikSquare" style={styles}></a>
			</Swipeable>
		);
	}
}