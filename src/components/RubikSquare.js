import React from 'react';

export default class RubikSquare extends React.Component {
	
	render() {
		let styles = {'backgroundColor':this.props.color};
		return <a className="rubikSquare" style={styles}></a>
	}
}