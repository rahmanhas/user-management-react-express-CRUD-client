import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
    const [users, setUsers] = useState([]);
    


    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users`)
            .then(res => res.json())
            .then(result => setUsers(result))
    }, [])

    const handleDeleteUser = (user) => {
       
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_SERVER_URL}/users/${user._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {

                            const remaining = users.filter(u => u._id !== user._id)
                            setUsers(remaining);

                        }
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <h1 className="text-center text-6xl">List of Users</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>View</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => <tr
                                    key={user._id}
                                >
                                    <th>{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>
                                        <Link to={`/user/${user._id}`}><button className="btn btn-accent">View</button></Link>
                                    </td>
                                    <td>
                                        
                                        <Link  
                                         to={{
                                            pathname: `/updateuser/${user._id}`
                                            
                                        }}
                                        
                                        ><button className="btn btn-primary">Edit</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-warning">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;