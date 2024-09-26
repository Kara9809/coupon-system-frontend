import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './Slices/AuthSlice';
import adminReducer from './Slices/AdminSlice';
import companyReducer from './Slices/CompanySlice';
import customerReducer from './Slices/CustomerSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  company: companyReducer,
  customer: customerReducer
});

const store = configureStore({
  reducer: rootReducer,
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

export default store;