import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../../Models/CouponModel';
import { CustomerModel } from '../../Models/CustomerModel';


export interface CustomerState {
    purchasedCoupons: CouponModel[];
    allCoupons: CouponModel[];
    customerDetails: CustomerModel | null;
}

const initialState: CustomerState = {
    purchasedCoupons: [],
    allCoupons: [],
    customerDetails: null,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setMyCoupons(state, action: PayloadAction<CouponModel[]>) {
            state.purchasedCoupons = action.payload;
        },
        purchaseCoupon(state, action: PayloadAction<CouponModel>) {
            state.purchasedCoupons.push(action.payload);
        },
        setAllCoupons(state, action: PayloadAction<CouponModel[]>) {
            state.allCoupons = action.payload;
        },
        setCustomerDetails(state, action: PayloadAction<CustomerModel>) {
            state.customerDetails = action.payload;
        },
        clearCustomer(state) {
            state.purchasedCoupons = [];
            state.allCoupons = [];
            state.customerDetails = {
                id: 0, firstName: "", lastName: "", email: "", password: ""
            };
        }
    }
});

export const { setMyCoupons, setAllCoupons, setCustomerDetails, purchaseCoupon, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;