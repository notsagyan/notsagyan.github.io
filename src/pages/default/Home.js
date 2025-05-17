import '../../assets/css/home.css';
import { useEffect, useRef, useState } from 'react';
import Carousel from '../../components/carousel/js/carousel';
import Slider from '../../components/slider/js/slider';
import { Link } from 'react-router-dom';
import Resume from '../../assets/misc/resume.pdf';
import Django from '../../assets/images/logos/django.svg';
import Flask from '../../assets/images/logos/flask.png';
import Photo from '../../assets/images/misc/photo.jpg';
import Logo from '../../assets/images/logos/logo.svg';
import Issurkhet from '../../assets/images/projects/mainlogo.jpg';
import { ToastContainer, toast } from 'react-toastify';

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
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#Eff3f5';
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'source-over'; 

        // Crescent Moon
        this.ctx.beginPath();
        this.ctx.arc(this.ctx.canvas.width - 120, 90, 80, 0, 2 * Math.PI, true);
        this.ctx.fillStyle = '#0a192f';
        this.ctx.shadowBlur = 0;
        this.ctx.fill();
    }

    update = () => {
        this.draw();
    }

    remove = () => {
        this.r = 0;
        this.draw();
    }
}

class Meteor {
    constructor(ctx){
        this.x = 600;
        this.y = 500;
        this.length = 0;
        this.thickness = 0;
        this.color = "yellow";
        this.ctx = ctx;
    }

    draw = () => {
        // Draw meteor head
        this.ctx.fillStyle = "yellow";
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, 20, 10, Math.PI * 0.25, 0, Math.PI);
        this.ctx.fill();

        // Draw meteor trail
        this.ctx.rotate(1);
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.x, this.y, 200, 2);
        this.ctx.rotate(-1);
    }

    update = () => {
        this.x -= 0;
        this.y += 0;
        this.draw();
    }
}

class Animate {
    constructor(ctx) {
        this.ctx = ctx;
    }

    init = () => {
        // Draw moon
        this.moon = new Moon(this.ctx);
        this.moon.draw();

        // this.meteor = new Meteor(this.ctx);
        // this.meteor.draw();
    }

    start = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.moon.update();
        // this.meteor.update();

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
        if (contactForm.current.reportValidity()){
            fetch('https://formspree.io/f/xjkwljvk', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: contact.first_name[0],
                    middle_name: contact.middle_name[0],
                    last_name: contact.last_name[0],
                    email: contact.email[0],
                    message: contact.message[0]
                })
            }).then(response => {
                if (response.ok) {
                    toast('✉️ Message sent successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                    setContact({});
                    contactForm.current.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            console.log("Oops! There was a problem submitting your form");
                        }
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
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

            
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            if (window.innerWidth <= 900){
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                console.log("clearnign");
            }
            else {
                var moon = new Moon(ctx);
                moon.draw();
            }
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <canvas className='canvas' ref={canvasRef}> 
            </canvas>
            <div className='social-container'>
                <Link to='https://github.com/notsagyan' target='_blank' className='social-icon-link'>
                    <i className="fa-brands fa-github social-icon"></i>
                </Link>                    
                <Link to='https://www.linkedin.com/in/sagyan-singh-2a66a7221/' target='_blank' className='social-icon-link'>
                    <i className="fa-brands fa-linkedin social-icon"></i>
                </Link>
                <Link to='#' className='social-icon-link'>
                    <img style={{height: '35px', width: '35px'}} src={Logo} />
                </Link>
                <Link to='https://medium.com/@workonsagyan' target='_blank' className='social-icon-link'>
                    <i className="fa-brands fa-medium social-icon"></i>
                </Link>
                <Link to='mailto:workonsagyan@gmail.com' className='social-icon-link'>
                    <i className="fa-solid fa-envelope social-icon"></i>
                </Link>
            </div>

            <div className='content'>
                <Carousel>
                    <div className='my-section landing-container' ref={first}>
                        <div className='text-container'>    
                            <div className='name'>
                                <p className='first-name'>Sagyan&nbsp;</p>
                                <p className='last-name'>Singh</p>
                            </div>
                            <p className='description'>Software Engineer</p>
                        </div>

                        <Link to={Resume} className='primary-btn' target='_blank' download='Resume - Sagyan Singh'>Download CV</Link>
                        
                        <div className='angle-down-wrapper'>
                            <i className="fa-solid fa-angles-down"></i>
                        </div>
                    </div>

                    <div className='my-section about-us-container'>
                        <div className='header-section'>
                            <p className='heading'>Sagyan</p>
                            <p className='sub-heading'>About Me</p>
                        </div>
                        <div className='info-container'>
                            <div className='img-container'>
                                <img className='display-picture' src={Photo}></img>
                            </div>
                            <div className='info'>
                                <p>Software Engineer with strong practical experience in designing, developing, and deploying full stack web applications using Python, React, and modern cloud tools. Seeking a developer role to contribute to scalable, maintainable software system. </p>
                                <br></br>
                                <p>Programming Languages: Python, JavaScript (ES6+), TypeScript. </p>
                                <p>Frameworks: Django, DRF, FastAPI, React, Next.js, Express, Node.js. </p>
                                <p>Cloud: AWS (Lightsail).</p>
                                <p>Database Systems: PostgreSQL, MySQL, MongoDB, SQLite. </p>
                                <p>Tools and Others: HTML5, CSS3, jQuery, Jinja, Docker, Git, Nginx, Pytest, Jest.</p>
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
                                    <img src={Django} />
                                </div>
                                <p className='caption'>Django</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <img src={Flask} />
                                </div>
                                <p className='caption'>Flask</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>FastAPI</p>
                                </div>
                                <p className='caption'>FastAPI</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-js"></i>
                                </div>
                                <p className='caption'>Javascript (ES6+)</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>TypeScript</p>
                                </div>
                                <p className='caption'>TypeScript</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>React</p>
                                </div>
                                <p className='caption'>React</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>Next.js</p>
                                </div>
                                <p className='caption'>Next.js</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-html5"></i>
                                </div>
                                <p className='caption'>HTML</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-css3-alt"></i>
                                </div>
                                <p className='caption'>CSS</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <i className="fa-brands fa-docker" style={{fontSize: '100px' }}></i>
                                </div>
                                <p className='caption'>Docker</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>PostgreSQL</p>
                                </div>
                                <p className='caption'>PostgreSQL</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>MySQL</p>
                                </div>
                                <p className='caption'>MySQL</p>
                            </div>
                            <div className='card-container'>
                                <div className='card single-technology'>
                                    <p>SqLite</p>
                                </div>
                                <p className='caption'>SqLite</p>
                            </div>
                        </Slider>
                    </div>

                    {/* <div className='my-section project-container'>
                        <div className='header-section'>
                            <p className='heading'>Works</p>
                            <p className='sub-heading'>My Projects</p>
                        </div>
                        <Slider>
                            <div className='card-container'>
                                <div className='card'>
                                    <img className='project-img' src={Issurkhet}></img>
                                </div>
                                <p className='caption'>Interdependent Society Surkhet</p>   
                            </div>
                            <div className='card-container'>
                                <div className='card'>
                                    <img className='project-img' src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                                </div>
                                <p className='caption'>Kubernetes</p>
                            </div>
                        </Slider>
                    </div> */}

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