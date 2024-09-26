import { CompanyModel } from '../Models/CompanyModel';
import { CustomerModel } from '../Models/CustomerModel';
import globalUrlService from './GlobalUrlService';
import axiosInterceptor from './AxiosInterceptor';

const BASE_URL = globalUrlService.getBaseUrl() + "api/admin/";
const tokenAxios = axiosInterceptor;


export const createCompanyApi = async (newCompany: CompanyModel) => {
  try {
    const response = await tokenAxios.post(`${BASE_URL}company`, newCompany);
    return response;
  } catch (error) {
    console.error('Error adding company:', error);
  }
};

export const updateCompanyApi = async (updatedCompany: CompanyModel) => {
  try {
    const response = await tokenAxios.put(`${BASE_URL}company`, updatedCompany);
    return response;
  } catch (error) {
    throw error; // Re-throw the error to be caught by the calling function
  }
};


export const deleteCompanyApi = async (id: number) => {
  try {
    await tokenAxios.delete(`${BASE_URL}company/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getCompaniesApi = async () => {
  try {
    const response = await tokenAxios.get(`${BASE_URL}companies`);
    return response;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return undefined;
  }
};

export const getSingleCompanyApi = async (companyId: number) => {
  try {
    const response = await tokenAxios.get(`${BASE_URL}company/${companyId}`);
    return response.data as CompanyModel;
  } catch (error) {
    console.error('Error fetching single company:', error);
    return undefined;
  }
};


export const createCustomerApi = async (newCustomer: CustomerModel) => {
  try {
    const response = await tokenAxios.post(`${BASE_URL}customer`, newCustomer);
    return response;
  } catch (error) {
    console.error('Error adding customer:', error);
  }
};

export const updateCustomerApi = async (updatedCustomer: CustomerModel) => {
  try {
    const response = await tokenAxios.put(`${BASE_URL}customer`, updatedCustomer);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomerApi = async (id: number) => {
  try {
    await tokenAxios.delete(`${BASE_URL}customer/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getCustomersApi = async () => {
  try {
    const response = await tokenAxios.get(`${BASE_URL}customers`);
    return response;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return undefined;
  }
};

export const getSingleCustomerApi = async (customerId: number) => {
  try {
    const response = await tokenAxios.get(`${BASE_URL}customer/${customerId}`);
    return response.data as CustomerModel;
  } catch (error) {
    console.error('Error fetching single customer:', error);
    return undefined;
  }
};



