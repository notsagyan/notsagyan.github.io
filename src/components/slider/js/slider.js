import { useEffect, useRef, useState, cloneElement } from "react";
import '../css/slider.css';

const Slider = (props) => {
    const [autoScroll, setAutoScroll] = useState(true);
    const [scrollLength, setScrollLength] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [total, setTotal] = useState(0);

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

    const jumpTo = (index) => {
        slider.current.scrollBy({
            'left': -(scrollLength*total),
            'behavior': 'smooth'
        });
    }

    const toggleAutoScroll = (bool) => {
        setAutoScroll(bool);
    }

    const handleLeftBtn = () => {
        slider.current.scrollBy({
            left: -scrollLength,
            behavior: "smooth"
        });

        setCurrentIndex((index) => {
            return index==0 ? index : index-1;
        });
    }

    const handleRightBtn = () => {
        if (currentIndex+1 == total){
            jumpTo(0);
            setCurrentIndex(0);
        }
        else {
            slider.current.scrollBy({
                left: scrollLength,
                behavior: "smooth"
            });

            setCurrentIndex((index) => {
                return index==total ? index:index+1
            });
        }
    }

    useEffect(() => {
        setTotal(props.children.length);
        const width = document.getElementsByClassName('slider-item')[0].getBoundingClientRect().width;
        setScrollLength(width);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            if (autoScroll){
                if (currentIndex+1 == total){
                    jumpTo(0);
                    setCurrentIndex(0);
                }
                else {
                    slider.current.scrollBy({
                        left: scrollLength,
                        behavior: "smooth"
                    });
        
                    setCurrentIndex((index) => {
                        return index==total ? index:index+1
                    });
                } 
            }
        }, 1000);

        return () => clearInterval(id);
    }, [autoScroll, scrollLength, currentIndex]);
    return (
        <div className="slider-container" ref={slider} onMouseOver={() => toggleAutoScroll(false)} onMouseLeave={() => toggleAutoScroll(true)}>
            <i className="fa-solid fa-chevron-left slider-left" onClick={handleLeftBtn}></i>
            {transformChildren()}
            <i className="fa-solid fa-chevron-right slider-right" onClick={handleRightBtn}></i>
        </div>
    );
}

export default Slider;