import axios from "axios";
//!
const instance = axios.create({
  baseURL:
    "https://gd-burger-builder-react-app-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
