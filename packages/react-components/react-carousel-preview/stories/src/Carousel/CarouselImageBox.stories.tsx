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

type ImageDefinition = {
  previewUrl: string;
  url: string;

  label: string;
  disabled?: boolean;
};

const IMAGES: ImageDefinition[] = [
  {
    previewUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    url: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
    label: 'sea',
  },
  {
    previewUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    url: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
    label: 'bridge',
    disabled: true,
  },
  {
    previewUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    url: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
    label: 'park',
  },
];

const ImageCard: React.FC<ImageDefinition> = props => {
  const classes = useClasses();
  const { url } = props;

  return <Image className={classes.image} src={url} role="presentation" />;
};

export const ImageSlideshow = () => {
  const classes = useClasses();

  return (
    <Carousel groupSize={1} align="center">
      <CarouselSlider className={classes.slider}>
        {IMAGES.map(image => (
          <CarouselCard key={image.url} className={classes.card}>
            <ImageCard {...image} />
          </CarouselCard>
        ))}
      </CarouselSlider>

      <CarouselNavContainer
        layout="overlay-expanded"
        next={{ 'aria-label': 'Go to next slide' }}
        prev={{ 'aria-label': 'Go to prev slide' }}
      >
        <CarouselNav>
          {index => (
            <CarouselNavImageButton
              image={{ src: IMAGES[index].previewUrl }}
              aria-label={`Carousel Nav Button ${index}`}
            />
          )}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
