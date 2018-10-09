import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import './OrderList.css';
import OrderStatusIndicator from "../OrderStatusIndicator/OrderStatusIndicator";
import Spinner from "../../../common/Spinner/Spinner";

class OrderList extends React.Component {
  render() {
    const {
      loading,
      orders,
      currentOrderId,

      onSelect,
      ...restProps
    } = this.props;

    if (loading) {
      return <Spinner/>;
    }

    return (
      <div {...restProps}>
        {orders && orders.map(order => {
          const className = ['OrderList-Item', order.status];
          if (currentOrderId === order.id) {
            className.push('selected');
          }

          return (
            <div
              key={order.id}
              className={className.join(' ')}
              onClick={() => onSelect(order.id)}
            >
              <OrderStatusIndicator
                className={'mr-2'}
                status={order.status}
              />
              Order #{order.id} {moment(order.orderDateTime).format('DD.MM.YYYY h:mm')}
            </div>
          );
        })}
      </div>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.array,
  currentOrderId: PropTypes.number,

  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

OrderList.defaultProps = {
  loading: false,
};

export default OrderList;