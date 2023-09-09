import { useEffect, cloneElement } from "react"
import '../css/carousel.css';

const Carousel = (props) => {
    useEffect((props) => {
        const el = document.getElementsByClassName('carousel-item');
        var max = el.length;

        Array.from(el).forEach((element, index, arr) => {
            element.onwheel = (e) => {
                e.preventDefault();
                var num;
                var id = element.id;

                id = id.replace('carousel-', '');
                id = parseInt(id);

                if (e.deltaY > 0){
                    num = id+1 < max ? id+1 : id;
                    num.toString();
                    document.getElementById(`carousel-${num}`).scrollIntoView({
                        'behavior': 'smooth'
                    });

                }
                else if (e.deltaY < 0){
                    num = id-1 >= 0 ? id-1 : id;
                    num.toString();
                    document.getElementById(`carousel-${num}`).scrollIntoView({
                        'behavior': 'smooth'
                    });
                }
            }
        });
    }, []);

    const transformer = () => {
        var elements = props.children.map((item, index) => {
            return cloneElement(item, {
                'className': item.props.className.length > 0 ? item.props.className + ' carousel-item': item.props.className + 'carousel-item',
                'id':  `carousel-${index}`,
                'key': index
            });
        });
        return elements;
    }

    return (
        <div className="carousel" id='carousel'>
            {transformer()}
        </div>
    );
}

export default Carousel;