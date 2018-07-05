import React, { Component } from 'react';

class Thead extends Component {
  constructor(){
    super();
    this.state = {
      activeSortingCol: 0,
      sortDirDESC: false
    }
  }

  componentDidMount(){
  }

  sortCollumn = (index) => {
    let sortDir = this.state.sortDirDESC;

    // double click change sorting direction
    if ( this.state.activeSortingCol === index ){
      sortDir = !sortDir
    }
    this.setState({
      activeSortingCol: index,
      sortDirDESC: sortDir
    })

    this.props.sortData(index, sortDir)
  }

  render() {
    const { rows } = this.props
    const { activeSortingCol, sortDirDESC } = this.state;

    return (
      <thead>
        <tr>
          {rows.map((x,i) => {
              return(
                <td
                  onClick={this.sortCollumn.bind(this, i)}
                  key={i}
                  className={(activeSortingCol === i ? "is-active" : "") + (sortDirDESC ? " is-sorting-desc": "")}
                >
                  {x}
                  <span className="caret">></span>
                </td>
              )
            }
          )}
        </tr>
      </thead>
    );
  }
}

export default Thead;
