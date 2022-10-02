import React from "react";

function Square(props) {
    return (
      <button className="square" onClick={props.onClick} style={props.background}>
        {props.value}
      </button>
    );
  }

export default Square;