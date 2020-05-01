import * as React from 'react';
import { Carousel, Image, Flex, Text, Button, Toolbar, Header } from '@fluentui/react-northstar';

const imageAltTags = {
  ade: 'Portrait of Ade',
  elliot: 'Portrait of Elliot',
  kristy: 'Portrait of Kristy',
  nan: 'Portrait of Nan',
};

const tabAriaLabel = {
  ade: 'Ade',
  elliot: 'Elliot',
  kristy: 'Kristy',
  nan: 'Nan',
};

const carouselTextContent = (
  <Text>
    <Header as="h3"> Card </Header>
    text or any other text 1 , text or any other text 2, text or any other text 3 text or any other text 4, text or any
    other text 5, text or any other text 6
  </Text>
);

const buttonStyles = { margin: '40px 0px 0px 10px' };
const imageStyles = { maxWidth: '70px', maxHeight: '70px', margin: '15px 0px 0px 5px' };

const carouselToolbarContent = (
  <Toolbar
    aria-label="Actions"
    styles={{ marginTop: '40px' }}
    items={[
      {
        key: 'custom-button-1',
        kind: 'custom',
        content: <Button content="First" />,
        fitted: 'horizontally',
      },
      {
        key: 'custom-button-2',
        kind: 'custom',
        content: <Button content="Second" />,
        fitted: 'horizontally',
      },
      {
        key: 'custom-button-3',
        kind: 'custom',
        content: <Button content="Third" />,
        fitted: 'horizontally',
      },
    ]}
  />
);

const carouselItems = [
  {
    key: 'ade',
    id: 'ade',
    content: (
      <div>
        <Flex gap="gap.medium">
          <Image styles={imageStyles} src="public/images/avatar/large/ade.jpg" fluid alt={imageAltTags.ade} />
          {carouselTextContent}
        </Flex>
        <Button content="Open" styles={buttonStyles} />
      </div>
    ),
    'aria-label': 'Ade card',
  },
  {
    key: 'elliot',
    id: 'elliot',
    content: (
      <div>
        <Flex gap="gap.medium">
          <Image styles={imageStyles} src="public/images/avatar/large/elliot.jpg" fluid alt={imageAltTags.elliot} />
          {carouselTextContent}
        </Flex>
        {carouselToolbarContent}
      </div>
    ),
    'aria-label': 'Elliot card',
  },
  {
    key: 'kristy',
    id: 'kristy',
    content: (
      <div>
        <Flex gap="gap.medium">
          <Image styles={imageStyles} src="public/images/avatar/large/kristy.png" fluid alt={imageAltTags.kristy} />
          {carouselTextContent}
        </Flex>
        <Flex gap="gap.medium" styles={buttonStyles}>
          <Button content="Call" />
          <Button content="Video call" />
        </Flex>
      </div>
    ),
    'aria-label': 'Kristy card',
  },
];

const CarouselExample = () => (
  <Carousel
    ariaRoleDescription="carousel"
    navigation={{
      'aria-label': 'people cards',
      items: carouselItems.map((item, index) => ({
        key: item.id,
        'aria-label': tabAriaLabel[item.id],
        'aria-controls': item.id,
      })),
    }}
    items={carouselItems}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
);

export default CarouselExample;
