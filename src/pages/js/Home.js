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
        contactForm.current.reportValidity();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        var ctx = canvas.getContext('2d');

        var moon = new Moon(ctx);
        moon.draw();

        window.onresize = () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;

            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            var moon = new Moon(ctx);
            moon.draw();
        }
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

                        <button className='primary-btn'>Resume</button>
                    </div>

                    <div className='my-section about-us-container'>
                        <div className='header-section'>
                            <p className='heading'>Sagyan</p>
                            <p className='sub-heading'>About Me</p>
                        </div>
                        <div className='info-container'>
                            <div className='img-container'>
                                <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                            </div>
                            <div className='info'>
                                <p>Software developer with a strong foundation in software engineering and programming principles. Proficient in a wide range of languages on different platforms with a passion to learn and master new technologies. 3+ years of experience in Full Stack Development with a strong focus on backend.</p>
                                <br></br>
                                <p>Python (Django, FastAPI, Flask, Selenium)</p>
                                <p>HTML/CSS</p>
                                <p>Javascript (React JS, Typescript, JQuery)</p>
                                <p>Docker</p>
                                <p>Kubernetes</p>
                                <p>Agile</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-section technology-container'>
                        <div className='header-section'>
                            <p className='heading'>Skills</p>
                            <p className='sub-heading'>Tools and Technologies</p>
                        </div>
                        <Slider>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-python"></i>
                                </div>
                                <p className='caption'>Python</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-python"></i>
                                </div>
                                <p className='caption'>Python</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-python"></i>
                                </div>
                                <p className='caption'>Python</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-python"></i>
                                </div>
                                <p className='caption'>Python</p>
                            </div>
                        </Slider>
                    </div>

                    <div className='my-section project-container'>
                        <div className='header-section'>
                            <p className='heading'>Works</p>
                            <p className='sub-heading'>My Projects</p>
                        </div>
                        <Slider>
                            <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                            <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                            <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                            <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                            <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                            <img className='img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                        </Slider>
                    </div>

                    <div className='my-section contact-container'>
                        <div className='header-section'>
                            <p className='heading'>Contact</p>
                            <p className='sub-heading'>Let's Talk !</p>
                        </div>
                        <form ref={contactForm}>
                            <div className='row name-group'>
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
                                    <textarea className='form-control' rows='7' name='message' placeholder='Message*' onChange={handleContact} required></textarea>
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