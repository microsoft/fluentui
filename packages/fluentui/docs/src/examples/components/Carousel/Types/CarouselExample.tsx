import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const imageAltTags = {
  ade: 'Portrait of Ade',
  elliot: 'Portrait of Elliot',
  kristy: 'Portrait of Kristy',
  nan: 'Portrait of Nan',
};
const carouselItems = [
  {
    key: 'ade',
    id: 'ade',
    content: <Image src="public/images/avatar/large/ade.jpg" fluid alt={imageAltTags.ade} />,
    'aria-label': imageAltTags.ade,
  },
  {
    key: 'elliot',
    id: 'elliot',
    content: <Image src="public/images/avatar/large/elliot.jpg" fluid alt={imageAltTags.elliot} />,
    'aria-label': imageAltTags.elliot,
  },
  {
    key: 'kristy',
    id: 'kristy',
    content: <Image src="public/images/avatar/large/kristy.png" fluid alt={imageAltTags.kristy} />,
    'aria-label': imageAltTags.kristy,
  },
  {
    key: 'nan',
    id: 'nan',
    content: <Image src="public/images/avatar/large/nan.jpg" fluid alt={imageAltTags.nan} />,
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
