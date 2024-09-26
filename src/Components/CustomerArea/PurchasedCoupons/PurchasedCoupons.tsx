import React, { useEffect, useState } from 'react';
import { CouponModel } from '../../../Models/CouponModel';
import store from '../../../Redux/Store';
import { setMyCoupons } from '../../../Redux/Slices/CustomerSlice';
import { getCustomerCoupons } from '../../../Services/CustomerApiService';
import notificationService from '../../../Services/NotificationService';
import './PurchasedCoupons.css';
import CouponView from '../../Card/CouponView/CouponView';

type Props = {};

const PurchasedCoupons: React.FC<Props> = () => {
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customer.purchasedCoupons);

    useEffect(() => {
        if (coupons.length === 0) {
            getCustomerCoupons()
                .then(res => {
                    const fetchedCoupons: CouponModel[] = res?.data;
                    if (fetchedCoupons.length !== 0) {
                        store.dispatch(setMyCoupons(fetchedCoupons));
                        setCoupons(fetchedCoupons);
                        notificationService.successPlainText("Coupons fetched successfully");
                    }
                })
                .catch(err => {
                    notificationService.errorAxiosApiCall(err);
                });
        }
    }, []);

    return (
        <div className="all-coupons-container">
            <h1>Purchased Coupons</h1>

            {coupons.length > 0
                ? coupons.map(coupon => (
                    <CouponView
                        key={coupon.id}
                        coupon={coupon}
                    />
                ))
                : <div>No coupons to show yet</div>}
        </div>
    );
}

export default PurchasedCoupons;
