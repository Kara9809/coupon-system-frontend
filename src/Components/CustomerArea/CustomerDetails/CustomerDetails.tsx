import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import './CustomerDetails.css'

type Props = {}

const CustomerDetails: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <div className="customer-details-loading">Loading...</div>;
    }

    return (
        <div className="customer-details-container">
            <div className="customer-details">
                <h1 className="customer-details-title">Customer Details</h1>
                <div className="customer-details-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;