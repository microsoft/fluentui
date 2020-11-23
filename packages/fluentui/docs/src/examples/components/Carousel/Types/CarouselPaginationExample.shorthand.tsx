import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const carouselItems = [
  {
    key: 'ade',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg"
        fluid
        alt={'Portrait of Ade'}
      />
    ),
  },
  {
    key: 'elliot',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elliot.jpg"
        fluid
        alt={'Portrait of Elliot'}
      />
    ),
  },
  {
    key: 'kristy',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/kristy.png"
        fluid
        alt={'Portrait of Kristy'}
      />
    ),
  },
  {
    key: 'nan',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/nan.jpg"
        fluid
        alt={'Portrait of Nan'}
      />
    ),
  },
];

const CarouselExample = () => (
  <Carousel
    ariaRoleDescription="carousel"
    ariaLabel="Portrait collection"
    items={carouselItems}
    paddleNext={{ 'aria-label': 'go to next slide' }}
    paddlePrevious={{ 'aria-label': 'go to previous slide' }}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
);

export default CarouselExample;
