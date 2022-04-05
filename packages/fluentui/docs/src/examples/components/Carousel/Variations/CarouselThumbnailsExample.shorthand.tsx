import * as React from 'react';
import { Carousel, Image } from '@fluentui/react-northstar';

const imageAltTags = {
  allan: 'Portrait of Allan',
  carole: 'Portrait of Carole',
  johnie: 'Portrait of Johnie',
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
    thumbnail: (
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
    thumbnail: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
        fluid
        alt={imageAltTags.carole}
      />
    ),
    'aria-label': imageAltTags.carole,
  },
  {
    key: 'johnie',
    id: 'johnie',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/JohnieMcConnell.jpg"
        fluid
        alt={imageAltTags.johnie}
      />
    ),
    thumbnail: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/JohnieMcConnell.jpg"
        fluid
        alt={imageAltTags.johnie}
      />
    ),
    'aria-label': imageAltTags.johnie,
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
    thumbnail: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg"
        fluid
        alt={imageAltTags.kat}
      />
    ),
    'aria-label': imageAltTags.kat,
  },
  {
    key: 'carole1',
    id: 'carole1',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
        fluid
        alt={imageAltTags.carole}
      />
    ),
    thumbnail: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
        fluid
        alt={imageAltTags.carole}
      />
    ),
    'aria-label': imageAltTags.carole,
  },
  {
    key: 'allan1',
    id: 'allan1',
    content: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        fluid
        alt={imageAltTags.allan}
      />
    ),
    thumbnail: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        fluid
        alt={imageAltTags.allan}
      />
    ),
    'aria-label': imageAltTags.allan,
  },
];

const CarouselExample = () => (
  <Carousel
    aria-roledescription="carousel"
    aria-label="Portrait collection"
    thumbnails
    navigation={{
      'aria-label': 'people portraits',
      items: carouselItems.map((item, index) => ({
        key: index,
        'aria-controls': item.id,
        'aria-label': item['aria-label'],
        content: item.thumbnail,
      })),
    }}
    items={carouselItems}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
);

export default CarouselExample;
