import globalUrlService from './GlobalUrlService';
import { CustomerModel } from '../Models/CustomerModel';
import { Category } from '../Models/Category';
import axiosInterceptor from './AxiosInterceptor';


const BASE_URL = globalUrlService.getBaseUrl() + "api/customer/";
const tokenAxios = axiosInterceptor;

export const purchaseCouponApi = async (couponId: number) => {
    try {
        const response = await tokenAxios.post(`${BASE_URL}purchase/${couponId}`);
        return response;
    } catch (error) {
        console.error('Error purchasing a coupon:', error);
    }
};

export const getCustomerCoupons = async () => {
    try {
        const response = await tokenAxios.get(`${BASE_URL}coupons`);
        return response;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return undefined;
    }
};

export const getCustomerCouponsByCategoryApi = async (category: Category) => {
    try {
        if (category !== null) {
            const response = await tokenAxios.get(`${BASE_URL}coupons/${category}`);
            return response;
        } else {
            return await getCustomerCoupons();
        }
    } catch (error) {
        console.error('Error fetching coupons by category:', error);
        return undefined;
    }
};

export const getCustomerCouponsByMaxPriceApi = async (maxPrice: number) => {
    try {
        if (maxPrice != null) {
            const response = await tokenAxios.get(`${BASE_URL}coupons/${maxPrice}`);
            return response;
        } else {
            return await getCustomerCoupons();
        }
    } catch (error) {
        console.error('Error fetching coupons by max price:', error);
        return undefined;
    }
};

export const getCustomerDetails = async () => {
    try {
        const response = await tokenAxios.get(`${BASE_URL}details`);
        return response.data as CustomerModel;
    } catch (error) {
        throw error;
    }
};

export const getAllCoupons = async () => {
    try {
        const response = await tokenAxios.get(`${BASE_URL}all-coupons`);
        return response;
    } catch (error) {
        throw error;
    }
};