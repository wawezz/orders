import React from 'react';
import PropTypes from 'prop-types';

class OrderButtons extends React.Component {
  render() {
    const {
      onComplete,
      onIncomplete,
    } = this.props;

    return (
      <div>
        <button onClick={onComplete} className={'mr-2'}>Complete</button>
        <button onClick={onIncomplete} className={'button-outline'}>Incomplete</button>
      </div>
    );
  }
}

OrderButtons.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onIncomplete: PropTypes.func.isRequired,
};

export default OrderButtons;