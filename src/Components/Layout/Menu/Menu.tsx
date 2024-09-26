import React, { useEffect } from 'react';
import './Menu.css';
import store from '../../../Redux/Store';
import { NavLink } from 'react-router-dom';

type Props = {};

const Menu = (props: Props) => {
    const [clientType, setClientType] = React.useState(store.getState().auth.user.clientType);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => setClientType(store.getState().auth.user.clientType));
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="menu">
            {clientType === "ADMIN" && (
                <>
                    <NavLink to="/adminArea/allCompanies" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        All Companies
                    </NavLink>
                    <NavLink to="/adminArea/allCustomers" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        All Customers
                    </NavLink>
                </>
            )}
            {clientType === "COMPANY" && (
                <>
                    <NavLink to="/companyArea/companyDetails" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Company Details
                    </NavLink>
                    <NavLink to="/companyArea/allCoupons" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        All Coupons
                    </NavLink>
                </>
            )}
            {clientType === "CUSTOMER" && (
                <>
                    <NavLink to="/customerArea/customerDetails" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Customer Details
                    </NavLink>
                    <NavLink to="/customerArea/allCouponsToShow" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        All Coupons
                    </NavLink>
                    <NavLink to="/customerArea/purchasedCoupons" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Purchased Coupons
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default Menu;