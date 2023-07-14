import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUser = () => {
    const params = useParams();
    
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users/${params.id}`)
            .then(res => res.json())
            .then(result => setUser(result))
    }, [])
    console.log(user);
    const handleUpdate = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const user = { id: params.id,
            name, email, phone };
        console.log(user);
        fetch(`${import.meta.env.VITE_SERVER_URL}/users/${params.id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire(
                        'Congratulations!!!',
                        'Your user is Updated!',
                        'success'
                    )
                    event.target.reset()
                }
            })
            .catch(error => console.log(error));
    }
    if (params.id) {
        return <div>
            <h1 className='text-6xl text-center font-bold'>Update information of {user[0]?.name}</h1>
            <Form onSubmit={handleUpdate} className='flex justify-center items-center flex-col'>
                <div className="form-control w-full max-w-xs py-5">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input defaultValue={user[0]?.name} type="text" name="name" placeholder="Type Your Name" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs py-5">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input defaultValue={user[0]?.email} type="email" name="email" placeholder="Type Your Email" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs py-5">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input defaultValue={user[0]?.phone} type="text" name="phone" placeholder="Type Your Phone Number" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='form-control w-full max-w-xs py-5'>
                    <input className='btn btn-info' type="submit" value="Update" />
                </div>
            </Form>
        </div>
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const user = { name, email, phone };
        console.log(user);
        fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire(
                        'Congratulations!!!',
                        'Your user is Added!',
                        'success'
                    )
                    event.target.reset()
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1 className='text-6xl text-center font-bold'>Add User</h1>
            <Form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                <div className="form-control w-full max-w-xs py-5">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Type Your Name" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs py-5">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="Type Your Email" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs py-5">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input type="text" name="phone" placeholder="Type Your Phone Number" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='form-control w-full max-w-xs py-5'>
                    <input className='btn btn-info' type="submit" value="Submit" />
                </div>
            </Form>
        </div>
    );
};

export default AddUser;