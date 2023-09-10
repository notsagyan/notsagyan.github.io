import { useEffect, cloneElement } from "react";
import '../css/slider.css';

const Slider = (props) => {
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

    useEffect(() => {

    }, []);
    return (
        <div className="slider-container">
            <i class="fa-solid fa-chevron-left slider-left"></i>
            {transformChildren()}
            <i class="fa-solid fa-chevron-right slider-right"></i>
        </div>
    );
}

export default Slider;