import React from 'react';
import './CouponView.css';
import { CouponModel } from '../../../Models/CouponModel';
import moment from 'moment';

type Props = {
    coupon: CouponModel;
};

const CouponView = (props: Props) => {
    // Add any necessary state or logic here

    return (
        <div className="card">
            <table className="coupon-table">
                <tbody>
                    <tr>
                        <th>Image:</th>
                        <td>
                            <img src={props.coupon.image} alt="Coupon" />

                        </td>
                    </tr>
                    <tr>
                        <th>ID:</th>
                        <td>{props?.coupon.id}</td>
                    </tr>
                    <tr>
                        <th>Title:</th>
                        <td>
                            {props?.coupon.title}
                        </td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td>
                            {props?.coupon.description}
                        </td>
                    </tr>
                    <tr>
                        <th>Category:</th>
                        <td>
                            {props?.coupon.category}
                        </td>
                    </tr>
                    <tr>
                        <th>Start Date:</th>
                        <td>
                            {moment(props?.coupon.startDate).format("DD/MM/YYYY")}
                        </td>
                    </tr>
                    <tr>
                        <th>End Date:</th>
                        <td>
                            {moment(props?.coupon.endDate).format("DD/MM/YYYY")}
                        </td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td>
                            {props?.coupon.price}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CouponView;