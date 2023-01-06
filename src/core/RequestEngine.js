/* eslint-disable no-console */
/* eslint-disable radix */
import axios from "axios";
import Constants from "./Constants";

class RequestEngine {
  constructor() {
    const JWTToken = JSON.parse(localStorage.getItem("token"));

    this.apiEngine = axios.create({
      baseURL: Constants.serverlink,
      timeout: Constants.timeout,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
    });
  }

  debugit() {
    this.apiEngine.interceptors.request.use((request) => request);

    this.apiEngine.interceptors.response.use((response) => response);
  }

  async login(email, password) {
    const link = "/auth/login";
    const data = { email, password };
    const res = await this.apiEngine.post(link, data);
    return res;
  }

  async signup(data) {
    const link = "/auth/signup";
    const res = await this.apiEngine.post(link, data);
    return res;
  }

  async createTask(data) {
    const link = "/task";
    const res = await this.apiEngine.post(link, data);
    return res;
  }

  deleteTask(id, callback) {
    const link = `/task/${id}`;
    this.apiEngine
      .delete(link)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getUsers() {
    const link = "/users";
    const res = await this.apiEngine.get(link);
    return res;
  }

  async getTasks(page, limit, callback) {
    let Page = page;
    if (!Page) {
      Page = 1;
    }
    let Limit = limit;
    if (!Limit) {
      Limit = 10;
    }
    const link = `/task/allPaginated/?page=${Page}&limit=${limit}`;
    this.apiEngine
      .get(link)
      .then((response) => {
        console.log(response);
        callback(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default RequestEngine;
