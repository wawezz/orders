import React from 'react';
import PropTypes from 'prop-types';

import './OrderStatusIndicator.css';

class OrderStatusIndicator extends React.Component {
  render() {
    const {
      status,
      className,
      style,
      inline,
      ...restProps
    } = this.props;

    const classNames = [className, 'OrderStatusIndicator', status];

    const styles = {...style};

    if (inline) {
      styles.display = 'inline-block';
    }

    return (
      <div
        className={classNames.join(' ')}
        style={styles}
        {...restProps}
      />
    );
  }
}

OrderStatusIndicator.propTypes = {
  status: PropTypes.oneOf([
    'COMPLETE',
    'INCOMPLETE',
  ]),
  inline: PropTypes.bool,
};

OrderStatusIndicator.defaultProps = {
  inline: false,
};

export default OrderStatusIndicator;
