import globalUrlService from './GlobalUrlService';
import { CouponModel } from '../Models/CouponModel';
import { Category } from '../Models/Category';
import axiosInterceptor from './AxiosInterceptor';
import { CompanyModel } from '../Models/CompanyModel';


const BASE_URL = globalUrlService.getBaseUrl() + "api/company/";
const tokenAxios = axiosInterceptor;

export const createCouponApi = async (newCoupon: CouponModel) => {
    try {
        const response = await tokenAxios.post(`${BASE_URL}coupon`, newCoupon);
        return response;
    } catch (error) {
        console.error('Error adding coupon:', error);
    }
};

export const updateCouponApi = async (updatedCoupon: CouponModel) => {
    try {
        const response = await tokenAxios.put(`${BASE_URL}coupon`, updatedCoupon);
        return response;
    } catch (error) {
        throw error; // Re-throw the error to be caught by the calling function
    }
};

export const deleteCouponApi = async (id: number) => {
    try {
        await tokenAxios.delete(`${BASE_URL}${id}`);
    } catch (error) {
        throw error;
    }
};

export const getCompanyCouponsApi = async () => {
    try {
        const response = await tokenAxios.get(`${BASE_URL}coupons`);
        return response;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return undefined;
    }
};

export const getCompanyCouponsByCategoryApi = async (category: Category) => {
    try {
        if (category !== null) {
            const response = await tokenAxios.get(`${BASE_URL}coupons/${category}`);
            return response;
        } else {
            return await getCompanyCouponsApi(); //to add a token to ()
        }
    } catch (error) {
        console.error('Error fetching coupons by category:', error);
        return undefined;
    }
};

export const getCompanyCouponsByMaxPriceApi = async (maxPrice: number) => {
    try {
        if (maxPrice != null) {
            const response = await tokenAxios.get(`${BASE_URL}coupons/${maxPrice}`);
            return response;
        } else {
            return await getCompanyCouponsApi(); //to add a token to ()
        }
    } catch (error) {
        console.error('Error fetching coupons by max price:', error);
        return undefined;
    }
};

export const getCompanyDetailsApi = async () => {
    try {
        const response = await tokenAxios.get(`${BASE_URL}details`);
        return response.data as CompanyModel;
    } catch (error) {
        throw error;
    }
};
