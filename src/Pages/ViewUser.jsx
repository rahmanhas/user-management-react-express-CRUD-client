import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewUser = () => {
    const params = useParams();
    const id = params.id;

    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`)
            .then(res => res.json())
            .then(result => setUser(result))
    }, [user,id])
    
    return (
        <div>
            <h1 className="text-center text-6xl">User Detail</h1>
            <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user?.map(user => <tr
                                    key={user?._id}
                                >
                                    <th>{user?._id}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.phone}</td>
                                    
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default ViewUser;