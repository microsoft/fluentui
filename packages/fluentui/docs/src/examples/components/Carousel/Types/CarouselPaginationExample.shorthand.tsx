import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const carouselItems = [
  {
    key: 'allan',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        fluid
        alt={'Portrait of Allan'}
      />
    ),
  },
  {
    key: 'carole',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
        fluid
        alt={'Portrait of Carole'}
      />
    ),
  },
  {
    key: 'elvia',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
        fluid
        alt={'Portrait of Elvia'}
      />
    ),
  },
  {
    key: 'kat',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg"
        fluid
        alt={'Portrait of Kat'}
      />
    ),
  },
];

const CarouselExample = () => (
  <Carousel
    aria-roledescription="carousel"
    aria-label="Portrait collection"
    items={carouselItems}
    paddleNext={{ 'aria-label': 'go to next slide' }}
    paddlePrevious={{ 'aria-label': 'go to previous slide' }}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
);

export default CarouselExample;
