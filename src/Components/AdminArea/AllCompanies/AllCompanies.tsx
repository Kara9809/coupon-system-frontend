import React, { useEffect, useState } from 'react';
import { getCompaniesApi, createCompanyApi, getSingleCompanyApi, deleteCompanyApi, updateCompanyApi } from '../../../Services/AdminApiService';
import { CompanyModel } from '../../../Models/CompanyModel';
import store from '../../../Redux/Store';
import notificationService from '../../../Services/NotificationService';
import { deleteCompany, fetchCompanies, updateCompany } from '../../../Redux/Slices/AdminSlice';
import CompanyCard from '../../Card/CompanyCard/CompanyCard';
import './AllCompanies.css';

type Props = {
};

const AllCompanies: React.FC<Props> = () => {
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().admin.companies);
    const [newCompany, setNewCompany] = useState<CompanyModel>({
        id: 0,
        name: "",
        email: "",
        password: "",
    });
    const [showOptions, setShowOptions] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showGetSingleModal, setShowGetSingleModal] = useState(false);
    const [singleCompanyId, setSingleCompanyId] = useState<number | string>('');
    const [singleCompany, setSingleCompany] = useState<CompanyModel | null>(null);

    useEffect(() => {
        if (companies.length === 0) {
            getCompaniesApi()
                .then(res => {
                    const fetchedCompanies: CompanyModel[] = res?.data;
                    store.dispatch(fetchCompanies(fetchedCompanies));
                    setCompanies(fetchedCompanies);
                    notificationService.successPlainText("Companies fetched successfully");
                })
                .catch(err => {
                    notificationService.errorAxiosApiCall(err);
                });
        }
    }, []);

    const handleAddCompany = async () => {
        try {
            const response = await createCompanyApi(newCompany);
            setCompanies(prev => [...prev, response?.data]);
            notificationService.successPlainText("Company added successfully");
            setShowAddModal(false);
        } catch {
            notificationService.errorPlainText("Failed to add company");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCompany(prev => ({
            ...prev,
            [name]: name === 'id' ? Number(value) : value
        }));
    };

    const handleDeleteCompany = async (id: number) => {
        try {
            await deleteCompanyApi(id);
            store.dispatch(deleteCompany(id));
            setCompanies(prev => prev.filter(company => company.id !== id));
            notificationService.successPlainText("Company deleted successfully");
        } catch (error) {
            notificationService.errorAxiosApiCall(error);
        }
    };

    const handleUpdateCompany = async (updatedCompany: CompanyModel) => {
        try {
            await updateCompanyApi(updatedCompany);
            store.dispatch(updateCompany(updatedCompany));
            setCompanies(prev => prev.map(company => company.id === updatedCompany.id ? updatedCompany : company));
            notificationService.successPlainText("Company updated successfully");
        } catch (error) {
            notificationService.errorAxiosApiCall(error);
        }
    };

    const handleGetSingleCompany = async () => {
        try {
            const company = await getSingleCompanyApi(Number(singleCompanyId));
            setSingleCompany(company || null);
            notificationService.successPlainText(company ? "Company fetched successfully" : "Company not found");
        } catch {
            notificationService.errorPlainText("Failed to fetch company");
        }
    };

    return (
        <div className="all-companies-container">
            <h1>All Companies</h1>

            <div className="more-options">
                <button onClick={() => setShowOptions(prev => !prev)}>More Options</button>
                {showOptions && (
                    <div className="options-dropdown">
                        <button onClick={() => setShowAddModal(true)}>Add a New Company</button>
                        <button onClick={() => setShowGetSingleModal(true)}>Get a Single Company</button>
                    </div>
                )}
            </div>

            {companies.length > 0
                ? companies.map(company => (
                    <CompanyCard
                        key={company.id}
                        company={company}
                        onDelete={handleDeleteCompany}
                        onUpdate={handleUpdateCompany}
                    />
                ))
                : <div>No companies to show yet</div>}

            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add a New Company</h2>
                        <div className="add-company-form">
                            <input type="text" name="name" placeholder="Company Name" onChange={handleInputChange} />
                            <input type="email" name="email" placeholder="Company Email" onChange={handleInputChange} />
                            <input type="password" name="password" placeholder="Company Password" onChange={handleInputChange} />
                            <button onClick={handleAddCompany}>Add Company</button>
                            <button className="close-button" onClick={() => setShowAddModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {showGetSingleModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Get a Single Company</h2>
                        <div className="get-single-company-form">
                            <input type="text" name="companyId" placeholder="Enter the ID number" onChange={(e) => setSingleCompanyId(e.target.value)} />
                            <button onClick={handleGetSingleCompany}>Get Company</button>
                            <button className="close-button" onClick={() => setShowGetSingleModal(false)}>Close</button>
                        </div>
                        {singleCompany && (
                            <div className="company-details">
                                <h3>Company Details</h3>
                                <p>ID: {singleCompany.id}</p>
                                <p>Name: {singleCompany.name}</p>
                                <p>Email: {singleCompany.email}</p>
                                <p>Password: {singleCompany.password}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCompanies;
