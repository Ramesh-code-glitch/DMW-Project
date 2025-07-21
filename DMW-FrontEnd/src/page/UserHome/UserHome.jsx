import React from "react";
import Header from "../../component/UserHeader/UserHeader";
import Footer from "../../component/Footer/Footer";
import FCategorie from "../../component/FCategorie/FCategorie";
import UserNavbar from "../../page/UserNavbar/UserNavbar"; // Import the UserNavbar


const UserHome = () => {
    return (
        <>
            <UserNavbar /> {/* Use the separated Navbar component */}
            <Header />
            <FCategorie />
            <Footer />
            
        </>
    );
};

export default UserHome;
