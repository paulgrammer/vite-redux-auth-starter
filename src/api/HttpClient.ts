import axios from "axios";

export default class HttpClient {
  public readonly GET = "GET";
  public readonly POST = "POST";
  public readonly DELETE = "DELETE";
  public readonly UPDATE = "UPDATE";
  public readonly PUT = "PUT";
  public readonly PATCH = "PATCH";
  public isDestroyed = false;
  private authToken: string = "";

  constructor(private baseUrl: string) {}

  createHeaders() {
    let headers: any = {};
    if (this.authToken) {
      headers["Authorization"] = this.authToken;
    }

    return headers;
  }

  setAuthToken(authToken: string) {
    this.authToken = authToken;
  }

  destroy() {
    this.isDestroyed = true;
  }

  fetch(method: string, endpoint: string, variables: any) {
    const self = this;
    return function () {
      return Promise.resolve() //
        .then(function () {
          if (!process.env.REACT_APP_IS_DEBUG) return Promise.resolve();
          return new Promise(function (res) {
            setTimeout(res, 500);
          });
        })
        .then(function () {
          return self.fetchInternal(method, endpoint, variables);
        })
        .then(function (axiosResponse) {
          //return axiosResponse.data;
          return axiosResponse;
        })
        .catch(function (error) {
          return new Promise(function (_, reject) {
            reject(
              new Error(
                error.response ? error.response.data.message : error.message
              )
            );
          });
        });
    };
  }

  fetchInternal(method: string, endpoint: string, variables: any) {
    if (method === this.GET) return this.getReq(endpoint, variables);
    if (method === this.POST) return this.postReq(endpoint, variables);
    if (method === this.PUT) return this.putReq(endpoint, variables);
    if (method === this.PATCH) return this.patchReq(endpoint, variables);
    if (method === this.DELETE) return this.deleteReq(endpoint, variables);
    throw new Error(`Unknown method: ${method}`);
  }

  getReq(endpoint: string, variables: any) {
    const self = this;
    let headers = self.createHeaders();
    return axios.get(this.baseUrl + endpoint, {
      params: variables,
      headers: headers,
    });
  }

  postReq(endpoint: string, variables: any) {
    const self = this;
    let baseUrl = this.baseUrl;
    let headers = self.createHeaders();

    return axios.post(baseUrl + endpoint, variables, {
      headers: headers,
    });
  }

  putReq(endpoint: string, variables: any) {
    const self = this;
    return axios.put(this.baseUrl + endpoint, variables, {
      headers: self.createHeaders(),
    });
  }

  deleteReq(endpoint: string, variables: any) {
    const self = this;
    return axios.delete(this.baseUrl + endpoint, {
      params: variables,
      headers: self.createHeaders(),
    });
  }

  patchReq(endpoint: string, variables: any) {
    const self = this;
    return axios.patch(this.baseUrl + endpoint, variables, {
      headers: self.createHeaders(),
    });
  }
}
