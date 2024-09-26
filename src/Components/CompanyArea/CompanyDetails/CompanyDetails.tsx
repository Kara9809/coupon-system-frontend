import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import './CompanyDetails.css';

const CompanyDetails: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <div className="company-details-loading">Loading...</div>;
    }

    return (
        <div className="company-details-container">
            <div className="company-details">
                <h1 className="company-details-title">Company Details</h1>
                <div className="company-details-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
