import axios from "axios";

const instance = axios.create({
	baseURl: "http://localhost:5001/clone-d2903/us-central1/api",
});

export default instance;
