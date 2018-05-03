import React, { Component, Fragment } from 'react';

class Grid extends Component {
  render() {
    const { squares } = this.props;
    return (
      <Fragment>
        {
          squares.map(row => {
            return row.map(square => {
              const color = square.empty ? '' : 'square-filled'
              return (<div className={`square ${color}`} />)
            })
          })
        }
      </Fragment>
    );
  }
}

export default Grid;