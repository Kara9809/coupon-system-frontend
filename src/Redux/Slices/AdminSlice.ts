import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyModel } from '../../Models/CompanyModel';
import { CustomerModel } from '../../Models/CustomerModel';

export interface AdminState {
    companies: CompanyModel[];
    customers: CustomerModel[];
}

const initialState: AdminState = {
    companies: [],
    customers: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        fetchCompanies(state, action: PayloadAction<CompanyModel[]>) {
            state.companies = action.payload;
        },
        addCompany(state, action: PayloadAction<CompanyModel>) {
            state.companies.push(action.payload);
        },
        updateCompany(state, action: PayloadAction<CompanyModel>) {
            const index = state.companies.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.companies[index] = action.payload;
            }
        },
        deleteCompany(state, action: PayloadAction<number>) {
            state.companies = state.companies.filter(c => c.id !== action.payload);
        },
        fetchCustomers(state, action: PayloadAction<CustomerModel[]>) {
            state.customers = action.payload;
        },
        addCustomer(state, action: PayloadAction<CustomerModel>) {
            state.customers.push(action.payload);
        },
        updateCustomer(state, action: PayloadAction<CustomerModel>) {
            const index = state.customers.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
        deleteCustomer(state, action: PayloadAction<number>) {
            state.customers = state.customers.filter(c => c.id !== action.payload);
        },
        clearAdmin(state) {
            state.companies = [];
            state.customers = [];
        }
    },
});

export const { fetchCompanies, fetchCustomers, addCompany, updateCompany, deleteCompany, addCustomer, updateCustomer, deleteCustomer, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;