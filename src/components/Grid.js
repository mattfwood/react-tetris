import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Grid extends Component {
  static propTypes = {
    squares: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { squares } = this.props;
    return (
      <Fragment>
        {squares.map((row) => {
          return row.map((square, index) => {
            const color = square.empty ? '' : 'square-filled';
            return <div key={index} className={`square ${color}`} />;
          });
        })}
      </Fragment>
    );
  }
}

export default Grid;
