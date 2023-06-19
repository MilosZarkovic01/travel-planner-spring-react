import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import IntroSection from "./components/IntroSection";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

const Home = () => {

    const usenavigate = useNavigate();

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            usenavigate('/login');
        }
    }, []);
    return (
        < div >
            <Navbar />
            <IntroSection />
            <Cards />
            <Footer />
        </div >
    );

}
export default Home; 