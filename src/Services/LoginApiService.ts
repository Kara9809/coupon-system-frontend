import axios from 'axios';
import globalUrlService from './GlobalUrlService';
import { LoginRequestModel } from '../Models/LoginRequestModel';
const BASE_URL = globalUrlService.getBaseUrl() + "api/login";

export const loginApi = async (LoginRequest: LoginRequestModel) => {
        const response = await axios.post(`${BASE_URL}`, LoginRequest);
        return response;
};