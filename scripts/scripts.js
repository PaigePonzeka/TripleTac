var $boardSource = $('#board-template').html();
var boardTemplate = Handlebars.compile($boardSource);

var $boardsContainer = $('#boards');
var boardPiece = ".js-board > li";
var pieces = ["X", "O"];
var numOfPlayers = pieces.length;
var turn = 0;

$(document).ready(function(){
  generateBoard();

  $('#boards').on('click', boardPiece, function(){
    makePlay(this);
  });
});
function generateBoard(){
  // make 3 column 3 for board
  for(var y = 0; y < 3; y++){
    for(var x = 0; x < 3; x++) {
      var axis = {"x" : x, "y": y};
      var boardHtml    = boardTemplate(axis);
      $boardsContainer.append(boardHtml);
    }
  }
}

function makePlay(piece){
  var pieceBoard = $(piece).closest('.js-board');
  if(!$(piece).hasClass('played') && !pieceBoard.hasClass('disabled-board')){
    var currentPiece = pieces[turn%numOfPlayers];
    $(piece).html(currentPiece).addClass('played').attr('data-piece',currentPiece);
    turn++;
    var pieceObj = {};
    pieceObj.x = $(piece).data('x');
    pieceObj.y = $(piece).data('y');
    pieceObj.piece = $(piece).data('piece');
    pieceObj.board = pieceBoard;
    pieceObj.obj = $(piece);
    checkBoardWinner(pieceObj, currentPiece);
    setNextPlay(pieceObj.x, pieceObj.y);
   
  }
}
// highlight the board for the next play -- disabled the rest
function setNextPlay(x, y){
  var board = $('.js-board[data-x="'+x +'"]').filter('*[data-y="'+y +'"]');
  disabledBoards();
  board.removeClass('disabled-board').addClass('highlighted-board');

}
function disabledBoards(){
  $('.highlighted-board').removeClass('highlighted-board');
  $('.js-board').addClass('disabled-board');
}
function checkBoardWinner(pieceObj, currentPiece){

  if(canCheckPosition(1, 1, pieceObj) == 3) {
    console.log("WINNER!");
    // highlight the winner
  }
  else if(canCheckPosition((-1), 1, pieceObj) == 3) {
    console.log("WINNER!");
  }
  else if(canCheckPosition( 0, 1, pieceObj) == 3) {
    console.log("WINNER!");
  }
  else if(canCheckPosition( 1, 0, pieceObj) == 3) {
    console.log("WINNER!");
  }
  else {
    pieceObj.board.find('li').removeClass('matched');
  }
  /*if(checkForwardDiagonal(pieceObj)){
    console.log ("YAY");
  }
  else if(checkBackwardDiagonal(pieceObj)){
    console.log("Other Yay");
  }*/
  //checkBoard((-1), (-1), 1, 1, pieceObj); // check forward diagonal
  //checkBoard((0), (-1), 0, 1, pieceObj); // check down
  //checkBoard((-1), 0, 1, 0, pieceObj); // check across
  //checkBoard((-1), 1, 1, (-1), pieceObj); // check backward Diagonal

  // check down

  // check forward diagnoal

  // check backward diagnoal

}

function canCheckPosition(xDiff, yDiff, pieceObj){
  var forwardPiece = {};
  forwardPiece.x = pieceObj.x + (xDiff);
  forwardPiece.y = pieceObj.y + (yDiff);

  var backwardPiece = {};
  backwardPiece.x = pieceObj.x + (-xDiff);
  backwardPiece.y = pieceObj.y + (-yDiff);
  pieceObj.board.find('li').removeClass('matched');
  if(isWithinBounds(forwardPiece.x, forwardPiece.y)){
    if(isWithinBounds(backwardPiece.x, backwardPiece.y)){
      // check going forwards and going backwards
      return 1 + checkPosition(xDiff, yDiff, pieceObj) + checkPosition((-xDiff), (-yDiff), pieceObj);
    }
    else{
      // our only option is the forward piece (it's a corner)
      return 1 + checkPosition(xDiff, yDiff, pieceObj);
    }

  }
  else{

    if(isWithinBounds(backwardPiece.x, backwardPiece.y)){
      //newPiece.board = pieceObj.board;
      //newPiece.piece = findBoardPiece(pieceObj.board, newPiece.x, newPiece.y).data('piece');
      return 1 + checkPosition((-xDiff), (-yDiff), pieceObj);
    }
    else{
      return 0; // this one can't be checked;
    }
  }
}

function checkPosition(xDiff, yDiff, pieceObj){
  var newPiece = {};
  newPiece.x = pieceObj.x + (xDiff);
  newPiece.y = pieceObj.y + (yDiff);

  if(isWithinBounds(newPiece.x, newPiece.y)){
    newPiece.board = pieceObj.board;
    newPiece.obj = findBoardPiece(pieceObj.board, newPiece.x, newPiece.y)
    newPiece.piece = newPiece.obj.data('piece');
    if(newPiece.piece != undefined && (newPiece.piece.localeCompare(pieceObj.piece) == 0)) {
      //continue checking
      newPiece.obj.addClass('matched');
      pieceObj.obj.addClass('matched');
      return 1 + checkPosition(xDiff, yDiff, newPiece);
    }
    else{
      return 0;
    }

  }
  else{
    return 0; //assume true because we haven't returned false
    // go in the opposite direction

  }
}

/*function checkForwardDiagonal(pieceObj){
  console.log("-------CHECKING FORWARD------");
  return (initalizeCheckPosition(1, 1, pieceObj) && initalizeCheckPosition((-1), (-1), pieceObj));
}
function checkBackwardDiagonal(pieceObj){
  console.log("-------CHECKING Backward-------");
  return (initalizeCheckPosition(1, (-1), pieceObj) && initalizeCheckPosition((-1), 1, pieceObj));
}
function initalizeCheckPosition(xDiff, yDiff, pieceObj){
  var newPiece = {};
  console.log(pieceObj);
  newPiece.x = pieceObj.x + (xDiff);
  newPiece.y = pieceObj.y + (yDiff);
  if(!isWithinBounds(newPiece.x, newPiece.y)){
    console.log("Out of bounds exiting");
    return false;
  } 
  else{
    return checkPosition(xDiff, yDiff, pieceObj);
  }
}
*/
function isWithinBounds(x, y){
  if((x>=0) && (y>=0) && (x<=2) && (y<=2)){
    return true;
  }
  else{
    return false;
  }
}
function checkBoard(topXDiff, topYDiff, bottomXDiff, bottomYDiff, currentPiece){
  var topX = currentPiece.x + (topXDiff);
  var topY = currentPiece.y + (topYDiff);
  var bottomX = currentPiece.x + (bottomXDiff);
  var bottomY = currentPiece.y + (bottomYDiff);

  if ((topX >= 0 && topY >= 0) && (bottomX <= 2 && bottomY <= 2)) { // make sure it fits within the bounds
    var topPiece = findBoardPiece(currentPiece.board, topX, topY)
    var bottomPiece = findBoardPiece(currentPiece.board, bottomX, bottomY);
    if(topPiece.data('piece') == currentPiece.piece){
      if(bottomPiece.data('piece') == currentPiece.piece){
        
        setWinner(topPiece, bottomPiece, currentPiece.obj)
        return true;
      }
    }
    else {
      return true;
    }
  }
  else {
    return false;
  }
}
function setWinner(top, bottom, current){
  top.css('border-color', "#f00").css('color', "#f00");
  bottom.css('border-color', "#f00").css('color', "#f00");;
  current.css('border-color', "#f00").css('color', "#f00");;
}
function findBoardPiece(board, x, y){
  return board.find('*[data-x="'+x +'"]').filter('*[data-y="'+y +'"]');
}
