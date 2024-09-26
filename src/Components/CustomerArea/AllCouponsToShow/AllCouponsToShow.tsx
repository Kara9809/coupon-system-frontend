import React, { useEffect, useState } from 'react'
import { CouponModel } from '../../../Models/CouponModel';
import store from '../../../Redux/Store';
import { purchaseCoupon, setAllCoupons } from '../../../Redux/Slices/CustomerSlice';
import { getAllCoupons, purchaseCouponApi } from '../../../Services/CustomerApiService';
import notificationService from '../../../Services/NotificationService';
import CouponCard from '../../Card/CouponCard/CouponCard';
import './AllCouponsToShow.css'

type Props = {}

const AllCouponsToShow: React.FC<Props> = () => {
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customer.allCoupons);

    useEffect(() => {
        if (coupons.length === 0) {
            getAllCoupons()
                .then(res => {
                    const fetchedCoupons: CouponModel[] = res?.data;
                    if (fetchedCoupons.length !== 0) {
                        store.dispatch(setAllCoupons(fetchedCoupons));
                        setCoupons(fetchedCoupons);
                        notificationService.successPlainText("Coupons fetched successfully");
                    }
                })
                .catch(err => {
                    notificationService.errorAxiosApiCall(err);
                });
        }
    }, []);

    const handlePurschaseCoupon = async (couponId: number) => {
        try {
            const response = await purchaseCouponApi(couponId);
            setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
            store.dispatch(setAllCoupons(store.getState().customer.allCoupons.filter(coupon => coupon.id !== couponId)));
            store.dispatch(purchaseCoupon(response?.data))
            notificationService.successPlainText("Coupon purchased successfully");
        } catch {
            notificationService.errorPlainText("Failed to purchase coupon");
        }
    }

    return (
        <div className="all-coupons-container">
            <h1>All Coupons</h1>

            {coupons.length > 0
                ? coupons.map(coupon => (
                    <CouponCard
                        key={coupon.id}
                        coupon={coupon}
                        onDelete={() => { }} // Implement delete if needed
                        onUpdate={() => { }} // Implement update if needed
                        onPurchase={() => handlePurschaseCoupon(coupon.id)}
                        isPurchable={true}
                    />
                ))
                : <div>No coupons to show yet</div>}
        </div>
    );
}

export default AllCouponsToShow;