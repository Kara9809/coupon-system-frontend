import React, { useEffect, useState } from 'react'
import store from '../../../Redux/Store'
import { CustomerModel } from '../../../Models/CustomerModel'
import { createCustomerApi, deleteCustomerApi, getCustomersApi, getSingleCustomerApi, updateCustomerApi } from '../../../Services/AdminApiService'
import { deleteCustomer, fetchCustomers, updateCustomer } from '../../../Redux/Slices/AdminSlice'
import notificationService from '../../../Services/NotificationService'
import CustomerCard from '../../Card/CustomerCard/CustomerCard'
import './AllCustomers.css'

type Props = {};

const AllCustomers: React.FC<Props> = () => {
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().admin.customers)
    const [newCustomer, setNewCustomer] = useState<CustomerModel>({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [showOptions, setShowOptions] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showGetSingleModal, setShowGetSingleModal] = useState(false);
    const [singleCustomerId, setSingleCustomerId] = useState<number | string>('');
    const [singleCustomer, setSingleCustomer] = useState<CustomerModel | null>(null);

    useEffect(() => {
        if (customers.length === 0) {
            getCustomersApi()
                .then(res => {
                    const customers: CustomerModel[] = res?.data;
                    store.dispatch(fetchCustomers(customers));
                    setCustomers(customers);
                    notificationService.successPlainText("Customers fetched successfully");
                }).catch(err => {
                    notificationService.errorAxiosApiCall(err)
                })
        }
    }, [])

    const handleAddCustomer = async () => {
        try {
            const response = await createCustomerApi(newCustomer);
            setCustomers(prev => [...prev, response?.data]);
            notificationService.successPlainText("Customer added successfully");
            setShowAddModal(false);
        } catch {
            notificationService.errorPlainText("Failed to add customer");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCustomer(prev => ({
            ...prev,
            [name]: name === 'id' ? Number(value) : value
        }));
    };

    const handleDeleteCustomer = async (id: number) => {
        try {
            await deleteCustomerApi(id);
            setCustomers(prev => prev.filter(customer => customer.id !== id));
            store.dispatch(deleteCustomer(id));
            notificationService.successPlainText("Customer deleted successfully");
        } catch (error) {
            notificationService.errorAxiosApiCall(error)
        }

    };

    const handleUpdateCustomer = async (updatedCustomer: CustomerModel) => {
        try {
            await updateCustomerApi(updatedCustomer);
            setCustomers(prev => prev.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer));
            store.dispatch(updateCustomer(updatedCustomer));
            notificationService.successPlainText("Customer updated successfully");
        } catch (error) {
            notificationService.errorAxiosApiCall(error)
        }
    };

    const handleGetSingleCustomer = async () => {
        try {
            const customer = await getSingleCustomerApi(Number(singleCustomerId));
            setSingleCustomer(customer || null);
            notificationService.successPlainText(customer ? "Customer fetched successfully" : "Customer not found");
        } catch {
            notificationService.errorPlainText("Failed to fetch customer");
        }
    };

    return (
        <div className="all-customers-container">
            <h1>All Customers</h1>

            <div className="more-options">
                <button onClick={() => setShowOptions(prev => !prev)}>More Options</button>
                {showOptions && (
                    <div className="options-dropdown">
                        <button onClick={() => setShowAddModal(true)}>Add a new Customer</button>
                        <button onClick={() => setShowGetSingleModal(true)}>Get a Single Customer</button>
                    </div>
                )}
            </div>


            {customers.length > 0
                ? customers.map(customer => (
                    <CustomerCard
                        key={customer.id}
                        customer={customer}
                        onDelete={handleDeleteCustomer}
                        onUpdate={handleUpdateCustomer}
                    />
                ))
                : <div>No customers to show yet</div>}

            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add a new Customer</h2>
                        <div className="add-customer-form">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddCustomer}>Add Customer</button>
                            <button className="close-button" onClick={() => setShowAddModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {showGetSingleModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Get a Single Customer</h2>
                        <div className="get-single-customer-form">
                            <input
                                type="text"
                                name="customerId"
                                placeholder="Enter the ID number"
                                onChange={(e) => setSingleCustomerId(e.target.value)}
                            />
                            <button onClick={handleGetSingleCustomer}>Get Customer</button>
                            <button className="close-button" onClick={() => setShowGetSingleModal(false)}>Close</button>
                        </div>
                        {singleCustomer && (
                            <div className="customer-details">
                                <h3>Customer Details</h3>
                                <p>ID: {singleCustomer.id}</p>
                                <p>First Name: {singleCustomer.firstName}</p>
                                <p>Last Name: {singleCustomer.lastName}</p>
                                <p>Email: {singleCustomer.email}</p>
                                <p>Password: {singleCustomer.password}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCustomers;