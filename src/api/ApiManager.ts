import HttpClient from "./HttpClient";

export default class ApiManager {
  private http: HttpClient;
  private static authToken = sessionStorage.getItem("token") || "";

  constructor() {
    this.http = new HttpClient(this.getApiBaseUrl());
    this.http.setAuthToken(ApiManager.authToken);
  }

  getApiBaseUrl() {
    const URL = "http://xxxxxxx";
    return URL;
  }

  destroy() {
    this.http.destroy();
  }

  static getAuthTokenString() {
    return this.authToken;
  }

  setAuthToken(authToken: string) {
    ApiManager.authToken = authToken;
    sessionStorage.setItem("token", authToken);
    this.http.setAuthToken(authToken);
  }

  static isLoggedIn() {
    return !!ApiManager.authToken;
  }

  login(username: string, password: string) {
    const http = this.http;

    let user = {
      user: { login: username, password },
    };

    return Promise.resolve()
      .then(http.fetch(http.POST, "/login", user))
      .then((response: any) => {
        let authToken = response.headers.authorization;
        this.setAuthToken(authToken);
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  }

  logout() {
    sessionStorage.clear();
  }

  update(path: string, data: any) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.PATCH, path, data));
  }

  delete(path: string, query: any) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.DELETE, path, query));
  }

  post(path: string, data: any) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.POST, path, data));
  }

  get(path: string, query: any) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.GET, path, query));
  }
}
