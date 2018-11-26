import React from 'react';
import main from "../img/main.jpg";
import CompetitiveProgramming from "../img/CompetitiveProgramming.jpg"
import code from "../img/code.jpg"
import Carousel from "react-bootstrap/lib/Carousel"

const Home = () => {
    return (
        <header className="App-header">
            <Carousel>
                <Carousel.Item>
                    <img src={code} alt={code} width={2000} height={800}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={main} alt={main} width={2000} height={800}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CompetitiveProgramming} alt={CompetitiveProgramming} width={2000} height={800}/>
                </Carousel.Item>
            </Carousel>
            <div>
                <h1>ALCUK</h1>
                <hr/>
                <p>
                    Algorithm Leaders in the Catholic University of Korea
                </p>
            </div>
        </header>
    );
};

export default Home;
