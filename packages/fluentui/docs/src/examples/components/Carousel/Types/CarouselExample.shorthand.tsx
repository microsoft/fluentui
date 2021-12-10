import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const imageAltTags = {
  allan: 'Portrait of Allan Munger',
  carole: 'Portrait of Carole Poland',
  elvia: 'Portrait of Elvia Atkins',
  kat: 'Portrait of Kat Larsson',
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
    'aria-label': imageAltTags.allan,
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
    'aria-label': imageAltTags.carole,
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
    'aria-label': imageAltTags.elvia,
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
    'aria-label': imageAltTags.kat,
  },
];

const CarouselExample = () => (
  <Carousel
    aria-roledescription="carousel"
    aria-label="Portrait collection"
    navigation={{
      'aria-label': 'people portraits',
      items: carouselItems.map((item, index) => ({
        key: item.id,
        'aria-label': imageAltTags[item.id],
        'aria-controls': item.id,
      })),
    }}
    items={carouselItems}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
);

export default CarouselExample;
