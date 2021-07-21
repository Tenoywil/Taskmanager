import axios from "../axios";

export default class TaskNetwork {
  /**
   * @param {string} token
   * @param {string} text
   * @param {String} dueDate
   */
  static async createTask(token, text, dueDate) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    let body = { text, dueDate };
    const response = await axios.post(`/api/task`, body, config);
    return response.data;
  }

  /**
   * @param {string} token
   */
  static async getAllTasks(token) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.get(`/api/task`, config);
    return response.data;
  }

  /**
   * @param {string} token
   * @param {string} task_id
   */
  static async getAllTaskById(token, task_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.get(`/api/task/${task_id}`, config);
    return response.data;
  }

  /**
   * @param {string} task_id
   * @param {string} id
   */
  static async assignTask(token, id, task_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `/api/task/assign/${task_id}`,
      { id },
      config
    );
    return response.data;
  }

  /**
   * @param {string} token
   * @param {string} task_id
   * @param {string} assignee_id
   */
  static async unassignTask(token, assignee_id, task_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.put(
      `/api/task/unassign/${task_id}`,
      { assignee_id },
      config
    );
    return response.data;
  }

  /**
   * @param {string} task_id
   * @param {string} status
   */
  static async changeTaskStatus(task_id, status) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `api/task/status/${task_id}`,
      { status },
      config
    );
    return response.data;
  }

  /**
   * @param {string} token
   * @param {string} task_id
   */
  static async markTaskComplete(token, task_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.put(`/api/task/complete/${task_id}`, config);
    return response.data;
  }

  /**
   * @param {string} token
   * @param {string} task_id
   */

  static async markTaskIncomplete(token, task_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.put(
      `/api/task/incomplete/${task_id}`,
      {},
      config
    );
    return response.data;
  }

  /**
   * @param {string} task_id
   */
  static async deleteTask(task_id) {
    let config = {
      headers: {
        Accept: "application/json;*/*",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.delete(`/api/task/delete/${task_id}`, config);
    return response.data;
  }
}
