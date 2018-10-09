import React from 'react';
import Orders from "./Orders";
import {connect} from "react-redux";
import orderActions from "../../store/order/orderActions";

class OrdersContainer extends React.Component {
  componentDidMount() {
    const {
      getList,
      getById,

      match,
    } = this.props;

    getList();

    if (match.params.orderId) {
      getById(match.params.orderId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getById,
      match,
    } = this.props;

    if (!nextProps.match.params.orderId && nextProps.orders && nextProps.orders.length) {
      this.onSelect(nextProps.orders[0].id);
    }

    if (match.params.orderId !== nextProps.match.params.orderId) {
      getById(nextProps.match.params.orderId);
    }
  }

  onSelect = (orderId) => {
    const {
      history,
    } = this.props;

    history.push(`/orders/${orderId}`);
  };

  render() {
    const {
      orders,
      order,
      currentOrderId,
      products,

      changeStatus,

      orderLoading,
      listLoading,
    } = this.props;

    return (
      <Orders
        orders={orders}
        currentOrder={order}
        currentOrderId={currentOrderId}
        products={products}

        onComplete={() => changeStatus(currentOrderId, 'COMPLETE')}
        onIncomplete={() => changeStatus(currentOrderId, 'INCOMPLETE')}
        onSelect={this.onSelect}

        orderLoading={orderLoading}
        listLoading={listLoading}
      />
    );
  }
}

OrdersContainer = connect(
  state => ({
    orders: state.order.list,
    order: state.order.order,
    currentOrderId: state.order.selectedId,
    products: state.order.orderProducts,

    orderLoading: state.order.isRequesting,
    listLoading: state.order.isListRequesting,
  }),
  dispatch => ({
    getById: (id) => {
      dispatch(orderActions.getById(id));
    },
    getList: () => {
      dispatch(orderActions.getList());
    },
    changeStatus: (id, status) => {
      dispatch(orderActions.changeStatus(id, status));
    },
  }),
)(OrdersContainer);

export default OrdersContainer;