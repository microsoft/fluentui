import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const imageAltTags = {
  ade: 'Portrait of Allan Munger',
  elliot: 'Portrait of Carole Poland',
  kristy: 'Portrait of Elvia Atkins',
  nan: 'Portrait of Kat Larsson',
};
const carouselItems = [
  {
    key: 'ade',
    id: 'ade',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        fluid
        alt={imageAltTags.ade}
      />
    ),
    'aria-label': imageAltTags.ade,
  },
  {
    key: 'elliot',
    id: 'elliot',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
        fluid
        alt={imageAltTags.elliot}
      />
    ),
    'aria-label': imageAltTags.elliot,
  },
  {
    key: 'kristy',
    id: 'kristy',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
        fluid
        alt={imageAltTags.kristy}
      />
    ),
    'aria-label': imageAltTags.kristy,
  },
  {
    key: 'nan',
    id: 'nan',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg"
        fluid
        alt={imageAltTags.nan}
      />
    ),
    'aria-label': imageAltTags.nan,
  },
];

const CarouselExample = () => (
  <Carousel
    ariaRoleDescription="carousel"
    ariaLabel="Portrait collection"
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
