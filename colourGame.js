var numSquares = 3;
var colours = [];
var pickedColour;
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector(".header");
var body = document.querySelector("body");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var scoreCount = 0;

init();

function init(){
	//mode buttons event listeners
	setUpSquares();
	reset();
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
		
			//grab colour of clicked square
			var clickedColour = this.style.backgroundColor;
			if(clickedColour === pickedColour){
				scoreCount +=1;
				messageDisplay.textContent = "Correct! Score: " + scoreCount;
				changeColours(clickedColour);
				body.style.backgroundColor = clickedColour;
				
				if (scoreCount < 3){
					numSquares = 3;
				} else if ((scoreCount >= 3) && (scoreCount < 6)){
					numSquares = 6;
				} else if ((scoreCount >= 6) && (scoreCount < 9)){
					numSquares = 9;
				} else {
					numSquares = 12;
				}
				reset();
			}else{
				changeColours("#232323");
				messageDisplay.textContent = "Try Again";
				scoreCount = 0;
			}
		});
	}
}

function reset(){
	//generate all new colours
	colours = generateRandomColours(numSquares);
	//pick a new random colour from array
	pickedColour = pickColour();
	//change colourDisplay to match picked Colour
	colourDisplay.textContent = pickedColour;
	resetButton.textContent = "New Colours"
	//change colours of squares
	for (var i = 0; i < squares.length; i++){
		if(colours[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colours[i];
		}else{
			squares[i].style.display = "none";
		}
	}
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColours(colour){
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colour;
	}
}

function pickColour() {
	var random = Math.floor(Math.random() * colours.length);
	return colours[random];
}

function generateRandomColours(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColour());
	}
	return arr;
}

function randomColour(){
	var r = Math.floor(Math.random() * 256); 
	var g = Math.floor(Math.random() * 256); 
	var b = Math.floor(Math.random() * 256); 
	return "rgb(" + r + ", " + g + ", " + b + ")";
}