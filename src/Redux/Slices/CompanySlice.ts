import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../../Models/CouponModel';
import { CompanyModel } from '../../Models/CompanyModel';

export interface CompanyState {
    coupons: CouponModel[];
    companyDetails: CompanyModel | null;
}

const initialState: CompanyState = {
    coupons: [],
    companyDetails: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        fetchCoupons(state, action: PayloadAction<CouponModel[]>) {
            state.coupons = action.payload;
        },
        addCoupon(state, action: PayloadAction<CouponModel>) {
            state.coupons.push(action.payload);
        },
        updateCoupon(state, action: PayloadAction<CouponModel>) {
            const index = state.coupons.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.coupons[index] = action.payload;
            }
        },
        deleteCoupon(state, action: PayloadAction<number>) {
            state.coupons = state.coupons.filter(c => c.id !== action.payload);
        },
        setCompanyDetails(state, action: PayloadAction<CompanyModel>) {
            state.companyDetails = action.payload;
        },
        clearCompany(state) {
            state.coupons = [];
            state.companyDetails = {
                id: 0, name: "", email: "", password: ""
            };
        }
    },
});

export const { fetchCoupons, setCompanyDetails, addCoupon, updateCoupon, deleteCoupon, clearCompany } = companySlice.actions;
export default companySlice.reducer;
