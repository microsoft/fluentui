import { makeStyles, Image } from '@fluentui/react-components';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const useClasses = makeStyles({
  slider: {
    /* Optional: Prevent image from overlapping the 'overlay-expanded' controls */
    marginBottom: '72px',
  },
  card: {
    boxSizing: 'border-box',
    width: '100%',
    /*  Optional: Padding provides a buffer space for the 'overlay-expanded' next/prev buttons without cutting off viewport */
    paddingLeft: '52px',
    paddingRight: '52px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});

const images = [
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    value: 'image-0',
    label: 'sea',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    value: 'image-1',
    label: 'bridge',
    disabled: true,
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    value: 'image-2',
    label: 'park',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  },
];

const ImageCardComponent: React.FC<{ index: number }> = props => {
  const classes = useClasses();
  const { index } = props;

  return <Image className={classes.image} src={images[index].fullImageSrc} role="presentation" />;
};

export const ImageSlideshow = () => {
  const classes = useClasses();
  return (
    <Carousel groupSize={1} align={'center'}>
      <CarouselSlider className={classes.slider}>
        {images.map((image, index) => {
          return (
            <CarouselCard className={classes.card}>
              <ImageCardComponent index={index} />
            </CarouselCard>
          );
        })}
      </CarouselSlider>
      <CarouselNavContainer
        layout={'overlay-expanded'}
        next={{
          'aria-label': 'Go to next slide',
        }}
        prev={{
          'aria-label': 'Go to prev slide',
        }}
      >
        <CarouselNav>
          {index => (
            <CarouselNavImageButton
              image={{ src: images[index].swatchSrc }}
              aria-label={`Carousel Nav Button ${index}`}
            />
          )}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
