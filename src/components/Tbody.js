import React, { Component } from 'react';
import moment from 'moment';

class Tbody extends Component {
  constructor(){
    super();
  }

  componentDidMount(){
  }

  // format time and numbers
  renderCell = (cell, cellIndex) => {
    let result = cell;
    if ( cell && cell._isAMomentObject ) { // meaning the date
      // const mDate = moment(cell);
      const mDateFormatted = cell.format("DD.MM HH:mm");
      result = mDateFormatted
    } else if (typeof(cell) === "number"){
      // format number
      result = result.toLocaleString();

      // guess if it's a currency?
      // if ( result.indexOf(",") !== -1 ){
      //   result += " $"
      // }
      // ok, last col is price for sure
      if ( cellIndex === 6 ){
        result = result.split(',')[0] + " $"
      }

    } else if ( cell === null ){
      // if value is null - still show something
      if ( cellIndex === 6 ){
        result = "0 $"
      } else {
        result = 0 // or "Z" "-", etc..
      }
    }
    return result;
  }

  render() {
    const { rows } = this.props
    return (
      <tbody>
        {rows.map((x,i) => {
            return(
              <tr key={i}>
                {x.map( (y,index) => {
                  return(
                    <td key={index}>{this.renderCell(y, index)}</td>
                  )
                })}
              </tr>
            )
          }
        )}

      </tbody>
    );
  }
}

export default Tbody;
