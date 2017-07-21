import React from 'react';
import RubikSquare from './../components/RubikSquare';
import ReactCountdownClock from 'react-countdown-clock';
import axios from 'axios';


export default class RubikSquaresContainer extends React.Component {

    constructor(props) {
        super(props);
        this.RUBIK_CONTAINER_SIZE = 16;
        this.ROW_LENGTH = Math.sqrt(this.RUBIK_CONTAINER_SIZE);
        this.startTime = 0, this.endTime = 0;
		this.winnerData = [],
        this.state = {
            squaresColors: this.randomSquareColors(),
            moves: 0,
            isGameOver: false,
            timeUp: false,
            loginSuccessful: false,
            userName: '',
		 results: '',
		 dataPosted:false,
		 viewButton: false,
		 buttonText:'View Results'
        }
	this.gameResults =this.gameResults.bind(this);
	this.viewFinalResults = this.viewFinalResults.bind(this);
	this.postData = this.postData.bind(this);
	this.postSuccess = this.postSuccess.bind(this);
	this.showViewResultsButton = this.showViewResultsButton.bind(this);
    }
	
    swap(src, trgt, array) {
        let temp = array[src];
        array[src] = array[trgt];
        array[trgt] = temp;
        return array;
    }

    isRowWiseOver(colorsArray) {
        let color;
        for (let i = 0; i < colorsArray.length; i++) {
            if (i % this.ROW_LENGTH == 0) {
                color = colorsArray[i];
            }
            else {
                if (color === colorsArray[i]) {
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
        for (let i = this.ROW_LENGTH; i < colorsArray.length; i++) {
            if (colorsArray[i] === colorsArray[i % this.ROW_LENGTH]) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }

    isGameOver(colorsArray) {
        return this.isRowWiseOver(colorsArray) || this.isColumnWiseOver(colorsArray);
    }

    onSwipe(sourceIndex, targetIndex) {
        let swappedSquaresColors = this.swap(sourceIndex, targetIndex, this.state.squaresColors);

        this.setState({
            squaresColors: swappedSquaresColors,
            moves: ++this.state.moves,
            isGameOver: this.isGameOver(swappedSquaresColors)
        });
    }

    formRubikSquaresContainer(squareColors) {
        let squareBlocks = squareColors.map(function (color, i) {
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
        let randomColorCode = Math.floor(Math.random() * (colorsArray.length));
        let color = colorsArray[randomColorCode];
        colorsCountArray[randomColorCode]++;
        if (colorsCountArray[randomColorCode] == this.ROW_LENGTH) {
            colorsArray.splice(randomColorCode, 1);
            colorsCountArray.splice(randomColorCode, 1);
        }
        return color;
    }

    randomSquareColors() {
        let squares = [];
        let colorsArray = ['red', 'green', 'yellow', 'blue'];
        let colorsCountArray = [0, 0, 0, 0];
        for (let i = 0; i < this.RUBIK_CONTAINER_SIZE; i++) {
            let color = this.randomColorPicker(colorsArray, colorsCountArray)
            squares.push(color);
        }
        return squares;
    }

    onTimeUp() {

        this.setState({timeUp: true})
    
	}
	
	postSuccess(){	
	
      console.log("successfully posted");				
		this.setState({
		dataPosted: true			
	})
	}

	showViewResultsButton(){
		console.log("show view button ");				
	
	}
    postData() {
        this.endTime = Date.now();
        let totalTime = Math.floor((this.endTime - this.state.startTime) / 1000);
		console.log("Start Time"+this.state.startTime);
		console.log("endTime"+this.endTime);
		console.log("totalTime"+totalTime);
		
		
        axios.post('http://sample-env.d8kzn4afvm.us-east-1.elasticbeanstalk.com/api/Rubiks', {
            UserName: this.state.userName,
            moves: this.state.moves,
            timing: totalTime
        })
            .then(this.postSuccess);            

    }

    componentDidMount() {
	console.log('chaitanya');


    }
	
		gameResults(){
		console.log('onclick method');
				document.getElementById('viewDetails').disabled = true; 
		setTimeout(
		    function(){
			console.log("Inside callback");
			clearInterval(timer);
			axios.get("http://sample-env.d8kzn4afvm.us-east-1.elasticbeanstalk.com/api/Rubiks?filter=%7B%22order%22%3A%5B%22timing%20ASC%22%2C%20%22moves%20ASC%22%5D%2C%20%22limit%22%3A%2010%7D",).then(response => {
						this.setState({
							results: response.data
						});
						
				});
		
		
		}.bind(this),30000);
		let secondsElapsed = 30;
		let timer = setInterval(() => {
			this.setState({buttonText: `Wait for ${secondsElapsed--} secs`});
		}, 1000);
		
          
	}
		
		viewFinalResults(){		
		
		console.log("Inside the view results function");
		let truncatedResults = this.state.results ? this.state.results.slice(3) : [];		
		
		return( truncatedResults.map((user, index) => {
		console.log(user);
	
				return (				 
				
				  <div key={index} className="row">				  
					<div className="row-rank"> {index+4}</div>
					<div className="row-userName"> {user.UserName}</div>
					<div className="row-moves"> {user.moves}</div>
					<div className="row-timing"> {user.timing}</div>
				  </div>
				  
				)
			  })
			  );
			  
			  	 
		}
		closeData(){var modal = document.getElementById("myModal");
			modal.style.display="none";
			
			}
	shoWFinalResults(){
			
			return ( 	
			
		<div className="results-container">
		{this.gameResults}
		<div className="winners">
		<div className="winners-banner"> </div>
		{this.state.results.length >1?  <div className="winners-second"> <div className="winners-image"></div> <div className="winners-names">{this.state.results[1].UserName}</div> <div className="winners-position">2</div></div>: null}
		{this.state.results.length >0? <div className="winners-first"> <div className="winners-image"></div> <div className="winners-names">{this.state.results[0].UserName}</div><div className="winners-position">1</div> </div>: null}
			{this.state.results.length >2? <div className="winners-third"> <div className="winners-image"></div><div className="winners-names">{this.state.results[2].UserName}</div><div className="winners-position">3</div> </div>: null}
		</div>
	<div className="leaderBoard">	
		
		
		<div className="positions">Positions Board</div>
		
		<div className="resultsTable">
            <div className="rowHead"><div className="row-rank">Rank</div><div className="row-userName">Name</div><div className="row-moves">Moves<span className="movesImage"></span></div><div className="row-timing">Timing</div></div></div>
				{this.viewFinalResults()}
				
		</div>	
		</div>
			  );	
	}	
	
showButton(){
	
	return this.state.isGameOver || this.state.timeUp ? <div className="viewResultsButton" ><button onClick = {this.gameResults} className="resultsButton" id="viewDetails">{this.state.buttonText}</button></div>: null;
}		
		
    startGame() {				
		console.log("this.state.startTime");
		console.log(this.state.startTime);
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
                <div className='rubikSquaresContainer' id="loading">
                    {this.formRubikSquaresContainer(this.state.squaresColors)}
                </div>
                <div className='moves-container'>
                    moves: {this.state.moves}
                </div>
                {(this.state.isGameOver || this.state.timeUp ) && !this.state.dataPosted ? this.postData() : false}

                {this.state.isGameOver ? <div className='game-over'><span>good job!!!</span></div> : false}
                {this.state.timeUp ? <div className='time-up'><span>time up!!! </span></div> : false}					
				{this.showButton()}		
            </div>

        );
    }

    onStart(e) {
        console.log('on start');
        console.log("startTime"+ this.startTime);
		e.preventDefault();		
        this.setState({loginSuccessful: true, userName: this.refs.userName.value, startTime: Date.now()} );
    }

    userLogin() {
        return (
            <div className="mainContainer">
                <div className="header">
                    <div className ="header-content"> Welcome to 2D Rubik's cube </div>
                </div>
                <div className='loginContainer'>
                    <div> Swipe either horizontally or vertically and try to bring all colors to one place</div>
                    <div> Please enter your user name and click button to start game</div>
                    <form className="formContainer" onSubmit={this.onStart.bind(this)}>
                        <input className="formContainer-input" type="text" ref="userName" placeholder="Your name"/>
                        <input className='startGame' type="submit" value="Start the Game"/>
                    </form>

                </div>
            </div>
        );
    }

    render() {
	console.log('render');
        console.log(this.state.results);

        return (		
		
		this.state.results ?  this.shoWFinalResults() : this.state.loginSuccessful === true ?this.startGame(): this.userLogin()
		);
    }
}