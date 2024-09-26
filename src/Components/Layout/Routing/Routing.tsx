import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import NotFound from "../../../Pages/NotFound/NotFound";
import Home from "../../../Pages/Home/Home";
import Login from "../../Auth/Login/Login";
import Logout from "../../Auth/Logout/Logout";
import AllCompanies from "../../AdminArea/AllCompanies/AllCompanies";
import AllCustomers from "../../AdminArea/AllCustomers/AllCustomers";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import AllCoupons from "../../CompanyArea/AllCoupons/AllCoupons";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import PurchasedCoupons from "../../CustomerArea/PurchasedCoupons/PurchasedCoupons";
import AllCouponsToShow from "../../CustomerArea/AllCouponsToShow/AllCouponsToShow";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* General */}
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} /> // default
                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                {/* Admin Area */}
                <Route path="/adminArea/allCompanies" element={<AllCompanies />} />
                <Route path="/adminArea/allCustomers" element={<AllCustomers />} />
                {/* Company Area */}
                <Route path="/companyArea/companyDetails" element={<CompanyDetails />} />
                <Route path="/companyArea/allCoupons" element={<AllCoupons />} />
                {/* Customer Area */}
                <Route path="/customerArea/customerDetails" element={<CustomerDetails />} />
                <Route path="/customerArea/allCouponsToShow" element={<AllCouponsToShow />} />
                <Route path="/customerArea/purchasedCoupons" element={<PurchasedCoupons />} />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;