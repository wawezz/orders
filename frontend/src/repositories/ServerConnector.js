const apiEndpoint = 'http://localhost:3006';

export default class ServerConnector {
  constructor(resource) {
    this.resource = resource;
  }

  get = (route, data) => this.request(route, 'GET', data);

  put = (route, data) => this.request(route, 'PUT', data);

  post = (route, data) => this.request(route, 'POST', data);

  delete = (route, data) => this.request(route, 'DELETE', data);

  static handleResponseStatus(response) {
    if (response.status === 200) {
      return response;
    }

    // if (response.status === 404) {
    //   dispatchEvent(eventNotFound);
    // }

    throw response.status;
  }

  static handleResponseBody(response) {
    // if (response && response.errors) {
    //   if (response.errors.hasOwnProperty('NOT_VISIBLE')) {
    //     dispatchEvent(eventNotVisible);
    //   }
    // }

    return response;
  }

  request(url = '', method, data = {}) {
    const requestOptions = {
      method,
    };

    if (method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
    }

    requestOptions.headers = new Headers();
    requestOptions.headers.append('Content-Type', 'application/json');

    const endpoint = apiEndpoint + '' + this.resource + url;
    const request = new Request(endpoint, requestOptions);

    return fetch(request)
      .then(ServerConnector.handleResponseStatus)
      .then(response => response.json())
      .then(ServerConnector.handleResponseBody)
      .catch(error => {
        if(isNaN(error)){
          // dispatchEvent(eFailedToFetch);
        }
        throw error;
      });
  }
}
