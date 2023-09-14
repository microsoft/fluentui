import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const imageAltTags = {
  allan: 'Portrait of Allan',
  carole: 'Portrait of Carole',
  elvia: 'Portrait of Elvia',
  kat: 'Portrait of Kat',
};
const carouselItems = [
  {
    key: 'allan',
    id: 'allan',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        fluid
        alt={imageAltTags.allan}
      />
    ),
  },
  {
    key: 'carole',
    id: 'carole',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
        fluid
        alt={imageAltTags.carole}
      />
    ),
  },
  {
    key: 'elvia',
    id: 'elvia',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
        fluid
        alt={imageAltTags.elvia}
      />
    ),
  },
  {
    key: 'kat',
    id: 'kat',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg"
        fluid
        alt={imageAltTags.kat}
      />
    ),
  },
];

const CarouselExample = () => (
  <Carousel
    circular
    aria-roledescription="carousel"
    aria-label="Portrait collection"
    navigation={{
      'aria-label': 'people portraits',
      items: carouselItems.map((item, index) => ({
        key: index,
        'aria-controls': item.id,
        'aria-label': imageAltTags[item.id],
      })),
    }}
    items={carouselItems}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
);

export default CarouselExample;
