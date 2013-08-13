var $boardSource = $('#board-template').html();
var boardTemplate = Handlebars.compile($boardSource);
var boardHtml    = boardTemplate({});
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

function makePlay(piece){
  if(!$(piece).hasClass('played')){
    var currentPiece = pieces[turn%numOfPlayers];
    $(piece).html(currentPiece).addClass('played').attr('data-piece',currentPiece);
    turn++;

    checkBoardWinner(piece, currentPiece);
  }
}

function generateBoard(){
  for(var i = 0; i < 9; i++){
    $boardsContainer.append(boardHtml);
  }
}

function checkBoardWinner(piece, currentPiece){
  var pieceX = $(piece).data('x');
  var pieceY = $(piece).data('y');
  console.log(pieceX);
  console.log(pieceY);

  // check across
  if (pieceX - 1 && pieceY -1 )

  // check down

  // check forward diagnoal

  // check backward diagnoal

}