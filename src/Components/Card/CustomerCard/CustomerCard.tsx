import React, { useState } from 'react'
import { CustomerModel } from "../../../Models/CustomerModel";
import './CustomerCard.css'

type Props = {
    customer: CustomerModel;
    onDelete: (id: number) => void;
    onUpdate: (customer: CustomerModel) => void;
}

const CustomerCard = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState<CustomerModel>({ ...props.customer });

    const handleDelete = () => {
        props.onDelete(props.customer.id); // Update parent component
    }

    const handleUpdate = () => {
        setIsEditing(false);
        props.onUpdate(editedCustomer); // Update parent component
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("value " + value)
        setEditedCustomer({ ...editedCustomer, [name]: value });
    }

    return (
        <div className="card">
            <table className="customer-table">
                <tbody>
                    <tr>
                        <th>ID:</th>
                        <td>{props?.customer.id}</td>
                    </tr>
                    <tr>
                        <th>First Name:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedCustomer.firstName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.customer.firstName
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Last Name:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedCustomer.lastName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.customer.lastName
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedCustomer.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.customer.email
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Password:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="password"
                                    name="password"
                                    value={editedCustomer.password}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.customer.password
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='customer-card-actions'>
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default CustomerCard;