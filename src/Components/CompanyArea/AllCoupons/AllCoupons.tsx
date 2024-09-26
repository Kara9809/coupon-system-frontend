import React, { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import { Category } from "../../../Models/Category";
import { createCouponApi, deleteCouponApi, getCompanyCouponsApi, updateCouponApi } from "../../../Services/CompanyApiService";
import { deleteCoupon, fetchCoupons, updateCoupon } from "../../../Redux/Slices/CompanySlice";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../Card/CouponCard/CouponCard";
import './AllCoupons.css'

type Props = {};

const AllCoupons: React.FC<Props> = () => {
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().company.coupons);
    const [newCoupon, setNewCoupon] = useState<CouponModel>({
        id: 0,
        companyId: 0,
        title: "",
        description: "",
        category: Category.FOOD.toUpperCase() as Category,  // Ensure it's uppercase
        startDate: new Date(),
        endDate: new Date(),
        amount: 0,
        price: 0,
        image: ""
    });
    const [showOptions, setShowOptions] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        if (coupons.length === 0) {
            getCompanyCouponsApi()
                .then(res => {
                    const fetchedCoupons: CouponModel[] = res?.data;
                    store.dispatch(fetchCoupons(fetchedCoupons));
                    setCoupons(fetchedCoupons);
                    notificationService.successPlainText("Coupons fetched successfully");
                })
                .catch(err => {
                    notificationService.errorAxiosApiCall(err);
                });
        }
    }, []);

    const handleAddCoupon = async () => {
        try {
            const response = await createCouponApi(newCoupon);
            setCoupons(prev => [...prev, response?.data]);
            notificationService.successPlainText("Coupon added successfully");
            setShowAddModal(false);
        } catch {
            notificationService.errorPlainText("Failed to add coupon");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCoupon(prev => ({
            ...prev,
            [name]: name === 'category' ? (value as unknown as Category).toUpperCase() : value
        }));
    };
    const handleDeleteCoupon = async (id: number) => {
        try {
            await deleteCouponApi(id);
            store.dispatch(deleteCoupon(id));
            setCoupons(prev => prev.filter(coupon => coupon.id !== id));
            notificationService.successPlainText("Coupon deleted successfully");
        } catch (error) {
            notificationService.errorAxiosApiCall(error);
        }
    };

    const handleUpdateCoupon = async (updatedCoupon: CouponModel) => {
        try {
            await updateCouponApi(updatedCoupon);
            store.dispatch(updateCoupon(updatedCoupon));
            setCoupons(prev => prev.map(coupon => coupon.id === updatedCoupon.id ? updatedCoupon : coupon));
            notificationService.successPlainText("Coupon updated successfully");
        } catch (error) {
            notificationService.errorAxiosApiCall(error);
        }
    };

    return (
        <div className="all-coupons-container">
            <h1>All Coupons</h1>

            <div className="more-options">
                <button onClick={() => setShowOptions((prev) => !prev)}>More Options</button>
                {showOptions && (
                    <div className="options-dropdown">
                        <button onClick={() => setShowAddModal(true)}>Add a New Coupon</button>
                    </div>
                )}
            </div>

            {coupons.length > 0
                ? coupons.map(coupon => (
                    <CouponCard
                        key={coupon.id}
                        coupon={coupon}
                        onDelete={handleDeleteCoupon}
                        onUpdate={handleUpdateCoupon}
                        onPurchase={() => { }}
                        isPurchable={false}
                    />
                ))
                : <div>No coupons to show yet</div>}

            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add a New Coupon</h2>
                        <div className="add-coupon-form">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newCoupon.title}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={newCoupon.description}
                                onChange={handleInputChange}
                            />
                            <select
                                name="category"
                                value={newCoupon.category}
                                onChange={handleInputChange}
                            >
                                {Object.keys(Category).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="date"
                                name="startDate"
                                value={new Date(newCoupon.startDate).toISOString().split('T')[0]}
                                onChange={handleInputChange}
                            />
                            <input
                                type="date"
                                name="endDate"
                                value={new Date(newCoupon.endDate).toISOString().split('T')[0]}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={newCoupon.amount}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                placeholder="Price"
                                value={newCoupon.price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={newCoupon.image}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddCoupon}>Add Coupon</button>
                            <button onClick={() => setShowAddModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllCoupons;