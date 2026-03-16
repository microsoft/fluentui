import { makeStyles, Image, CarouselSlider } from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  viewport: {
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

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const ImageSlideshow = (): JSXElement => {
  const classes = useClasses();

  return (
    <Carousel groupSize={1} align="center" announcement={getAnnouncement}>
      <CarouselViewport className={classes.viewport}>
        <CarouselSlider>
          {IMAGES.map((image, index) => (
            <CarouselCard key={image.url} className={classes.card} aria-label={`${index + 1} of ${IMAGES.length}`}>
              <ImageCard {...image} />
            </CarouselCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>

      <CarouselNavContainer
        layout="overlay-expanded"
        next={{ 'aria-label': 'go to next' }}
        prev={{ 'aria-label': 'go to prev' }}
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
