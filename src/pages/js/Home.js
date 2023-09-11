import '../css/home.css';
import { useEffect, useRef, useState } from 'react';
import Carousel from '../../components/carousel/js/carousel';
import Slider from '../../components/slider/js/slider';

const getRandom = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Moon{
    constructor(ctx){
        this.x = 1200;
        this.y = 100;
        this.r = 70;
        this.ctx = ctx;
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.ctx.canvas.width - 150, 100, this.r, 0, 2 * Math.PI, true);
        this.ctx.fillStyle = '#Eff3f5';
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#Eff3f5';
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'destination-over'; 
        this.ctx.shadowBlur = 0;
    }

    update = () => {
        this.draw();
    }
}

class Star {
    constructor(ctx){
        this.ctx = ctx;
        this.x = getRandom(0, this.ctx.canvas.width);
        this.y = getRandom(0, this.ctx.canvas.height);
        this.r = 1;
        this.color = 'white';
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update = () => {
        if (Math.floor(Math.random()*30) === 23){
            this.r = 0;
        }
        else {
            this.r = 1.2;
        }
        this.draw();
    }
}

class Meteor {
    constructor(){

    }

    draw = () => {

    }
}

class Animate {
    constructor(ctx) {
        this.ctx = ctx;
        this.stars = [];
    }

    init = () => {
        // Draw moon
        this.moon = new Moon(this.ctx);
        this.moon.draw();
    }

    start = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.moon.update();

        this.stars.forEach((item) => {
            item.update();
        });

        window.requestAnimationFrame(this.start);
    }
}

const Home = () => {
    const [contact, setContact] = useState({});
    const canvasRef = useRef();
    const first = useRef();
    const contactForm = useRef();

    const handleContact = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setContact(prevState => ({
            ...prevState,
            [name]: [value]
        }));
    }

    const handleContactSubmit = (e) => {
        e.preventDefault();
        contactForm.current.isValid();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const ctx = canvas.getContext('2d');

        const a = new Animate(ctx);
        a.init();
    }, []);

    return (
        <>
            <canvas className='canvas' ref={canvasRef}> 
            </canvas>
            <div className='social-container'>
                <i className="fa-brands fa-github social-icon"></i>
                <i className="fa-brands fa-linkedin-in social-icon"></i>
                <i className="fa-solid fa-envelope social-icon"></i>
                <i className="fa-brands fa-twitter social-icon"></i>
                <i className="fa-brands fa-facebook social-icon"></i>
            </div>
            {/* <div className='scroll-info'>
                <p>Scroll to navigate</p>
                <i className="fa-solid fa-angles-down"></i>
            </div> */}

            <div className='content'>
                <Carousel>
                    <div className='my-section landing-container' ref={first}>
                        <div className='text-container'>    
                            <div className='name'>
                                <p className='first-name'>Sagyan&nbsp;</p>
                                <p className='last-name'>Singh</p>
                            </div>
                            <p className='description'>Software Developer</p>
                        </div>

                        <button className='primary-btn'>Download CV</button>
                    </div>

                    <div className='my-section technology-container'>
                        <div className='header-section'>
                            <p className='heading'>Skills</p>
                            <p className='sub-heading'>Tools and Technologies</p>
                        </div>
                        <Slider>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-html5"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-js"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                            <div className='card single-technology'>
                                <i className="fa-brands fa-python"></i>
                            </div>
                        </Slider>
                    </div>

                    <div className='my-section contact-container'>
                        <div className='header-section'>
                            <p className='heading'>Contact</p>
                            <p className='sub-heading'>Send a Message</p>
                        </div>
                        <form ref={contactForm}>
                            <div className='row'>
                                <div className='form-group col-md-4'>
                                    <input className='form-control' name='first_name' placeholder='First Name*' onChange={handleContact} required></input>
                                </div>
                                <div className='form-group col-md-4'>
                                    <input className='form-control' name='middle_name' placeholder='Middle Name' onChange={handleContact}></input>
                                </div>
                                <div className='form-group col-md-4'>
                                    <input className='form-control' name='last_name' placeholder='Last Name*' onChange={handleContact} required></input>
                                </div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <input className='form-control' type='email' name='email' placeholder='Email*' onChange={handleContact} required></input>
                                </div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <textarea className='form-control' rows='10' name='message' placeholder='Message*' onChange={handleContact} required></textarea>
                                </div>
                            </div>
                            <br></br>
                            <button className='primary-btn' onClick={handleContactSubmit}>Send</button>
                        </form>
                    </div> 
                </Carousel> 
            </div>
        </>
    );
}

export default Home;