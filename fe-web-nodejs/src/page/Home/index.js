import React, { useEffect } from 'react';
import { setAuthToken } from '../../service/loginService';
import Banner from '../../components/banner/Banner.js';
import Hero from '../../components/hero/Hero.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Blog from '../../components/blog/Blog.js';
import Product from '../../components/product/Product.js';


const Home = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);
    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };

    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-sine',
            delay: 100,
            offset: 100,
        });
        AOS.refresh();
    }, []);

    return (
        <div>
            <Hero  />
         
          <Product/>
         
            <Blog/>
            <Banner  />
          
        </div>
    );
};

export default Home;