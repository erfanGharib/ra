import axios from "axios";
import { baseurl } from "../global/baseurl";

export const _axios = axios.create({
    baseURL: baseurl
})