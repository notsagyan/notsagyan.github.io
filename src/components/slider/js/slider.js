import { useEffect, useRef, useState, cloneElement } from "react";
import '../css/slider.css';

const Slider = (props) => {
    const [autoScroll, setAutoScroll] = useState(true);
    const slider = useRef();

    const transformChildren = () => {
        var element = props.children.map((item, index) => {
            return cloneElement(item, {
                'className': item.props.className.length > 0 ? item.props.className + ' slider-item': item.props.className + 'slider-item',
                'id':  `slider-${index}`,
                'key': index
            });
        });
        return element;
    }

    const toggleAutoScroll = (bool) => {
        setAutoScroll(bool);
    }

    useEffect(() => {
        console.log(autoScroll);
        const id = setInterval(() => {
            if (autoScroll){
                slider.current.scrollBy({
                    left: 100,
                    behavior: 'smooth'
                }); 
            }
        }, 1000);

        return () => clearInterval(id);
    }, [autoScroll]);
    return (
        <div className="slider-container" ref={slider} onMouseOver={() => toggleAutoScroll(false)} onMouseLeave={() => toggleAutoScroll(true)}>
            <i class="fa-solid fa-chevron-left slider-left"></i>
            {transformChildren()}
            <i class="fa-solid fa-chevron-right slider-right"></i>
        </div>
    );
}

export default Slider;