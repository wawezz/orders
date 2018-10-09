import React from 'react';
import PropTypes from 'prop-types';

import OrderList from './OrderList/OrderList';
import OrderButtons from "./OrderButtons/OrderButtons";
import OrderDetails from "./OrderDetails/OrderDetails";

import './Orders.css';
import OrderProducts from "./OrderProducts/OrderProducts";

class Orders extends React.Component {
  render() {
    const {
      orderLoading,
      listLoading,

      orders,
      currentOrder,
      currentOrderId,
      products,

      onComplete,
      onIncomplete,
      onSelect,
    } = this.props;

    return (
      <div className={'Orders'}>
        <div className={'Orders-list'}>
          <OrderList
            currentOrderId={currentOrderId}
            orders={orders}
            onSelect={onSelect}
            loading={listLoading}
          />
        </div>
        <div className={'Orders-buttons'}>
          {currentOrderId ? <OrderButtons
            onComplete={onComplete}
            onIncomplete={onIncomplete}
          /> : null}
        </div>
        <div className={'Orders-details'}>
          {currentOrder ? <OrderDetails
            loading={orderLoading}
            order={currentOrder}
          /> : null}
        </div>
        <div className={'Orders-products'}>
          <OrderProducts
            loading={orderLoading}
            order={currentOrder}
            products={products}
          />
        </div>
      </div>
    );
  }
}

Orders.propTypes = {
  orders: PropTypes.array,
  currentOrder: PropTypes.object,
  currentOrderId: PropTypes.number,

  onComplete: PropTypes.func.isRequired,
  onIncomplete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,

  orderLoading: PropTypes.bool,
  listLoading: PropTypes.bool,
};

Orders.defaultProps = {
  orderLoading: false,
  listLoading: false,
};

export default Orders;
