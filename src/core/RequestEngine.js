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
    const link = "/api/admin/signup";
    const res = await this.apiEngine.post(link, data);
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
    console.log(page);
    const link = `/task/all/?page=${Page}&limit=${limit}`;
    this.apiEngine
      .get(link)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async applicantDetails(id) {
    const link = `/api/admin/applicant/${id}`;
    const res = await this.apiEngine.get(link, id);
    return res;
  }
}

export default RequestEngine;
