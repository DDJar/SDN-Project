import React from 'react';


import Banner from '../../components/banner/Banner.js';
import Hero from '../../components/hero/Hero.js';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Blog from '../../components/blog/Blog.js';
import Product from '../../components/product/Product.js';

const BannerData = {
    discount: '30% OFF',
    title: 'Fine Smile',
    date: '10 Jan to 28 Jan',
    image: "./assets/img/bsb-logo-light.png",
    title2: 'Air Solo Bass',
    title3: 'Winter Sale',
    title4: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis',
    bgColor: '#f42c37',
};

const BannerData2 = {
    discount: '30% OFF',
    title: 'Happy Hours',
    date: '14 Jan to 28 Jan',
    image: "./assets/img/bsb-logo-light.png",
    title2: 'Smart Solo',
    title3: 'Winter Sale',
    title4: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis',
    bgColor: '#2dcc6f',
};

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
            <Hero handleOrderPopup={handleOrderPopup} />
         
          <Product/>
         
            <Blog/>
            <Banner data={BannerData2} />
          
        </div>
    );
};

export default Home;