import Axios from "axios";

/** This is so we can specify the baseurl and other common headers for each query immidiately */
export default Axios.create({
  baseURL: "http://localhost:3010",
  headers: {
    Accept: "application/json;*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*/*",
  },
});
