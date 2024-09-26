import React, { useState } from 'react';
import { CouponModel } from '../../../Models/CouponModel';
import moment from 'moment';
import './CouponCard.css';
import { Category } from '../../../Models/Category';

type Props = {
    coupon: CouponModel;
    onDelete: (id: number) => void;
    onUpdate: (coupon: CouponModel) => void;
    onPurchase: (id: number) => void;
    isPurchable: boolean;
}

const CouponCard = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCoupon, setEditedCoupon] = useState<CouponModel>({ ...props.coupon });

    const handleDelete = () => {
        props.onDelete(props.coupon.id);
    }

    const handlePurchase = () => {
        props.onPurchase(props.coupon.id);
    }

    const handleUpdate = () => {
        setIsEditing(false);
        props.onUpdate(editedCoupon);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setEditedCoupon(prev => ({
            ...prev,
            [name]: name === 'category' ? value as unknown as Category : value
        }));
    }

    return (
        <div className="card">
            <table className="coupon-table">
                <tbody>
                    <tr>
                        <th>Image:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="image"
                                    value={editedCoupon.image}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <img src={props.coupon.image} alt="Coupon" />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>ID:</th>
                        <td>{props?.coupon.id}</td>
                    </tr>
                    <tr>
                        <th>Title:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="title"
                                    value={editedCoupon.title}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.coupon.title
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="description"
                                    value={editedCoupon.description}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.coupon.description
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Category:</th>
                        <td>
                            {isEditing ? (
                                <select
                                    name="category"
                                    value={editedCoupon.category}
                                    onChange={handleInputChange}
                                >
                                    {Object.keys(Category).map((key) => (
                                        <option value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                props.coupon.category
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Start Date:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="startDate"
                                    value={new Date(editedCoupon.startDate).toISOString().split('T')[0]}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                moment(props.coupon.startDate).format("DD/MM/YYYY")
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>End Date:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="endDate"
                                    value={new Date(editedCoupon.endDate).toISOString().split('T')[0]}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                moment(props.coupon.endDate).format("DD/MM/YYYY")
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Amount:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="amount"
                                    value={editedCoupon.amount}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.coupon.amount
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={editedCoupon.price}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.coupon.price
                            )}
                        </td>
                    </tr>

                </tbody>
            </table>

            <div className="coupon-card-actions">
                {props.isPurchable === false ?
                    isEditing ? (
                        <>
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )
                    :
                    <button onClick={handlePurchase}>Purchase</button>
                }

            </div>
        </div>
    );
}

export default CouponCard;