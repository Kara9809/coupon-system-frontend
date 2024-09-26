import React, { useState } from 'react'
import { CompanyModel } from '../../../Models/CompanyModel'
import './CompanyCard.css'

type Props = {
    company: CompanyModel;
    onDelete: (id: number) => void;
    onUpdate: (company: CompanyModel) => void;
}

const CompanyCard = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCompany, setEditedCompany] = useState<CompanyModel>({ ...props.company });

    const handleDelete = () => {
        props.onDelete(props.company.id); // Update parent component

    }

    const handleUpdate = () => {
        setIsEditing(false);
        props.onUpdate(editedCompany); // Update parent component
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCompany({ ...editedCompany, [name]: value });
    }

    return (
        <div className="card">
            <table className="company-table">
                <tbody>
                    <tr>
                        <th>ID:</th>
                        <td>{props.company.id}</td>
                    </tr>
                    <tr>
                        <th>Name:</th>
                        <td>{props.company.name}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedCompany.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.company.email
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
                                    value={editedCompany.password}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                props.company.password
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="company-card-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate}>Save</button>
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

export default CompanyCard;