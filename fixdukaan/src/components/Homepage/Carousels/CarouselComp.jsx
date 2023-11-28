import React from 'react';
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import slider from './sampleImage.json'
function CarouselComp()
{

    return (
        <Carousel interval = {2000} stopAutoPlayOnHover = {false} animation ={'slide'}>
            {
                slider.map( (item, i) => <CarouselItem key={item.id} item={item} /> )
            }
        </Carousel>
    )
}
 export default CarouselComp;