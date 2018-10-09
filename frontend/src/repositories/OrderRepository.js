import ServerConnector from './ServerConnector';

class OrderRepository extends ServerConnector {
  constructor() {
    super('/order');
  }

  getById(id) {
    // const responseData = {
    //   id: id,
    //   status: 'COMPLETE',
    //   orderDateTime: '2018-05-02 09:06:45',
    //   products: [
    //     {
    //       id: 1,
    //       name: 'P1',
    //       price: 15,
    //       quantity: 4,
    //     },
    //     {
    //       id: 2,
    //       name: 'P4',
    //       price: 3.54,
    //       quantity: 2,
    //     },
    //   ],
    // };
    //
    // responseData.products.forEach(it => {
    //   it.total = it.price * it.quantity;
    // });
    //
    // responseData.totalQuantity = responseData.products.reduce((previousValue, currentValue) => {
    //   return previousValue + currentValue.quantity;
    // }, 0);
    //
    // responseData.total = responseData.products.reduce((previousValue, currentValue) => {
    //   return previousValue + currentValue.total;
    // }, 0);
    //
    // return Promise.resolve({
    //   success: true,
    //   response: {
    //     data: responseData,
    //   },
    //   errors: {}
    // });

    return this.get(`/${id}`);
  }

  getList() {
    // return Promise.resolve({
    //   success: true,
    //   response: {
    //     list: [
    //       {
    //         id: 1,
    //         orderDateTime: '2018-05-02 09:06:45',
    //         status: 'COMPLETE',
    //       },
    //       {
    //         id: 2,
    //         orderDateTime: '2018-05-02 09:06:45',
    //         status: 'INCOMPLETE',
    //       },
    //     ],
    //   },
    //   errors: {}
    // });

    return this.get('');
  }

  changeStatus(id, status) {
    // return Promise.resolve({
    //   success: true,
    //   response: null,
    //   errors: {}
    // });

    return this.put(`/change-status`, {
      id,
      status,
    });
  }
}

export default new OrderRepository();
