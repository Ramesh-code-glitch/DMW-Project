import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../page/Home/Home';
import UserHome from "../page/UserHome/UserHome"; 
import SignIn from '../page/SignIn/Singin';
import SignUp from '../page/RegPage/Signup';
import BusinessDetail from '../page/BusinessDetail/BusinessDetails'
import ResultsPage from "../component/Searchbar/SearchAndResults";
import PersonalDetail from "../page/PersonalDetail/PersonalDetail";
import MyOrders from '../page/MyOrders/MyOrders'; 
import Break from "../page/SubCatagory/Break/break"
import FrontBreakPads from "../page/SubCatagory/Break/FrontBreakPads/FrontBreakPads"
import FrontBreakPadsPrice from "../page/SubCatagory/Break/FrontBreakPads/FrontBreakPadsPrice"
import BodyPanel from "../page/SubCatagory/Body/BodyPanel/bodypanel"
import BodyParts from "../page/SubCatagory/Body/BodyPanel/bodyparts"
import BodyPartsPrice from "../page/SubCatagory/Body/BodyPanel/bodyshellprice"
import EandL from "../page/SubCatagory/Electrics&Lighting/EandL/E&L"
import AlarmimmobilisersHorns from "../page/SubCatagory/Electrics&Lighting/EandL/AlarmimmobilisersHorns"
import AlarmPartsPrice from "../page/SubCatagory/Electrics&Lighting/EandL/AlarmPartsPrice"
import UserOrder from '../page/UserOrders/UserOrders'; // Adjust the import path
import Cart from '../page/Cart/Cart';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" element={<Home />}/>
        <Route Component={SignUp} path="/signup" element={<signup />}/>
        <Route Component={SignIn} path="/login" element={<singin />}/>
        <Route Component={BusinessDetail} path="/businessdetails" element={<businessdetail />}/>
        <Route Component={ResultsPage} path="/results" element={<ResultsPage />} />
        <Route Component={PersonalDetail} path="/personaldetail" element={<personaldetail />}/>
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route Component={Break} path="/break_subcatagory" element={<Break />} />
        <Route Component={FrontBreakPads} path="/Front_Break_Pads" element={<FrontBreakPads />} />
        <Route Component={FrontBreakPadsPrice} path="/Front_Break_Pads_Price" element={<FrontBreakPadsPrice />} />
        <Route Component={BodyPanel} path="/body_subcatagory" element={<BodyPanel />} />
        <Route Component={BodyParts} path="/body_parts" element={<BodyParts />} />
        <Route Component={BodyPartsPrice} path="/body_parts_price" element={<BodyPartsPrice />} />
        <Route Component={EandL} path="/EandL_subcatagory" element={<EandL />} />
        <Route Component={AlarmimmobilisersHorns} path="/EandL_AlarmimmobilisersHorns" element={<AlarmimmobilisersHorns />} />
        <Route Component={AlarmPartsPrice} path="/EandL_AlarmPartsPrice" element={<AlarmPartsPrice />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user-orders" element={<UserOrder />} /> {/* User view */}
      </Routes>
    </>
  );
};

export default Routing;
