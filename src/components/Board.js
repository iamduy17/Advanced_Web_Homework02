import React from "react";
import Square from "./Square";

function Board(props) {
    const typeOfSquare = 5;
    let Boards = [];  // Feature 3
    
    function renderSquare(i) {
        // if(props.squaresWin){
        //     let background = props.squaresWin.includes(i) ? {background : "red"} : {background : ""};  // Feature 5
        //     return (
        //         <Square
        //         value={props.squares[i]}
        //         onClick={() => props.onClick(i)}
        //         background={background}
        //         />
        //     );
        // }
        // return (
        //     <Square
        //     value={props.squares[i]}
        //     onClick={() => props.onClick(i)}
        //     />
        // );
        let background = props.squaresWin != null && props.squaresWin.includes(i) ? {background : "red"} : {background : ""};  // Feature 5
        return (
                <Square    
                key={i}         
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                background={background}
                />
        );
    }

    function renderBoardRow() {
      let BoardArray = [];
      for (let i = 0; i < typeOfSquare; i++) {
        let BoardRows = [];

        for (let j = 0; j < typeOfSquare; j++) {
          BoardRows.push(renderSquare(typeOfSquare * i + j))
        }
        BoardArray.push({
          id: `board-row-${i}`,
          boardRows: BoardRows
        });
      }

      return BoardArray;
    }

    Boards = renderBoardRow();
    return (     
      <div>
        <span className="number-order"></span>
        {[...Array(typeOfSquare).keys()].map((item, index) => <span key={index} className="number-order">{item + 1}</span>)} 
        {Boards.map((item, index1) => {
          return(
            <div key={item.id} className="board-row">
              <span key={item.id + `-number-order-${index1 + 1}`} className="number-order">{index1 + 1}</span>
              {item.boardRows.map((item1, index) => {
                return <span key={item.id + `-square-${index}`}>{item1}</span>
              })}
            </div>
          )
        })}
      </div>
    );
  }

export default Board;


