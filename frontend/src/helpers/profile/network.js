import axios from "../axios";

export default class ProfileNetwork {
  /**
   * @param {string} token
   */
  static async getCurrentUser(token) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.get(`/api/profile/me`, config);
    return response.data;
  }

  /**
   * @param {string} token
   * @param {string} department
   * @param {string} position
   */
  static async createProfile(token, department, position) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    let body = { department, position };
    const response = await axios.post(`/api/profile`, body, config);
    return response.data;
  }
  /**
   * @param {string} token
   */
  static async getAllProfiles(token) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const response = await axios.get(`/api/profile`, config);
    return response.data;
  }

  /**
   * @param {string} token
   * @param {string} user_id
   */
  static async getProfileById(token, user_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const response = await axios.get(`/api/profile/user/${user_id}`, config);
    return response.data;
  }

  /**
   * @param {string} token
   */
  static async deleteCurrentUser(token) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const response = await axios.delete(`/api/profile`, config);
    return response.data;
  }
}
