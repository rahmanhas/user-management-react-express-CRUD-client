import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenet/Navbar';
import Footer from '../Componenet/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='h-[85vh]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;