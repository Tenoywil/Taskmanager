import axios from "../axios";

export default class AuthNetwork {
  /**
   * @param {string} token
   * @param {string} id
   */
  static async getUserById(token, id) {
    const response = await axios.get(
      `/api/auth`,
      { id },
      {
        headers: {
          Accept: "application/json;*/*",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    return response.data;
  }
  /**
   * @param {string} email
   * @param {string} password
   */
  static async login(email, password) {
    let body = { email, password };
    const response = await axios.post(`/api/auth`, body);
    return response.data;
  }

  /**
   * @param {string} email
   * @param {string} name
   * @param {string} password
   */

  static async registerUser(name, email, password) {
    let body = { name, email, password };

    const response = await axios.post(`/api/users`, body);
    return response.data;
  }
}
