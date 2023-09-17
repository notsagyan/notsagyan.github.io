import { useEffect, useRef, cloneElement } from "react"
import '../css/carousel.css';

const Carousel = (props) => {
    const wrapper = useRef();

    const transformer = () => {
        var elements = props.children.map((item, index) => {
            return cloneElement(item, {
                'className': item.props.className.length > 0 ? item.props.className + ' my-carousel-item': item.props.className + 'my-carousel-item',
                'id':  `carousel-${index}`,
                'key': index
            });
        });
        return elements;
    }

    const handleScroll = (e, max, index) => {
        e.preventDefault();
            
        if (e.deltaY < 0){
            var count = index-1 < 0 ? 0 : index-1;
            document.getElementsByClassName('carousel-wrapper')[0].style.transitionDuration = '700ms';
            document.getElementsByClassName('carousel-wrapper')[0].style.transform = `translateY(-${count}00vh)`;
        }
        else {
            var count = index+1 >= max ? index : index+1;
            document.getElementsByClassName('carousel-wrapper')[0].style.transitionDuration = '700ms';
            document.getElementsByClassName('carousel-wrapper')[0].style.transform = `translateY(-${count}00vh)`;
        }
    }

    useEffect(() => {
        var max = document.getElementsByClassName('my-carousel-item').length;
        Array.from(document.getElementsByClassName('my-carousel-item')).forEach((item, index) => {
            item.onTouchEnd = (e) => {
                handleScroll(e, max, index);
            }
        });
    }, []);

    return (
        <div className="carousel-container" id='carousel'>
            <div className="carousel-wrapper">
                {transformer()}
            </div>
        </div>
    );
}

export default Carousel;