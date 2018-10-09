import React from 'react';
import PropTypes from 'prop-types';

import './OrderProducts.css';
import Spinner from "../../../common/Spinner/Spinner";
import PriceUtil from "../../../utils/PriceUtil";

class OrderProducts extends React.Component {
  render() {
    const {
      loading,

      order,
      products,
      ...restProps
    } = this.props;

    if (loading) {
      return <Spinner/>;
    }

    if (!products || !order) {
      return null;
    }

    return (
      <div {...restProps}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <tr
                  key={product.id}
                >
                  <td>
                    {product.name} #{product.id}
                  </td>
                  <td>
                    {product.quantity}
                  </td>
                  <td>
                    {PriceUtil.formatPrice(product.price)}
                  </td>
                  <td>
                    {PriceUtil.formatPrice(product.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>
                Total
              </th>
              <th colSpan={2}>
                {order.totalQuantity}
              </th>
              <th>
                {PriceUtil.formatPrice(order.total)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

OrderProducts.propTypes = {
  orders: PropTypes.array,
  order: PropTypes.object,

  loading: PropTypes.bool,
};

OrderProducts.defaultProps = {
  loading: false,
};

export default OrderProducts;