import React from 'react';
import PropTypes from 'prop-types';

import PriceUtil from '../../../utils/PriceUtil';

import moment from 'moment';
import OrderStatusIndicator from "../OrderStatusIndicator/OrderStatusIndicator";
import Spinner from "../../../common/Spinner/Spinner";

class OrderDetails extends React.Component {
  render() {
    const {
      loading,
      order,
    } = this.props;

    if (loading) {
      return <Spinner/>;
    }

    return (
      <div>
        Number: Order #{order.id}<br />
        Date: {moment(order.orderDateTime).format('DD.MM.YYYY h:mm')}<br />
        Status: <OrderStatusIndicator status={order.status} inline /> {order.status}<br />
        Total: {PriceUtil.formatPrice(order.total)}<br />
      </div>
    );
  }
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    orderDateTime: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
      'COMPLETE',
      'INCOMPLETE',
    ]).isRequired,
    total: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool,
};

OrderDetails.defaultProps = {
  loading: false,
};

export default OrderDetails;