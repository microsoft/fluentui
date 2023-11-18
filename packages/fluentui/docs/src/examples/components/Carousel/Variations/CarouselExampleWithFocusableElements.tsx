import * as React from 'react';
import { Carousel, Image, Flex, Text, Button, Toolbar, Header } from '@fluentui/react-northstar';

const imageAltTags = {
  allan: 'Portrait of Allan',
  carole: 'Portrait of Carole',
  elvia: 'Portrait of Elvia',
  kat: 'Portrait of Kat',
};

const tabAriaLabel = {
  allan: 'Allan',
  carole: 'Carole',
  elvia: 'Elvia',
  kat: 'Kat',
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
    key: 'allan',
    id: 'allan',
    content: (
      <div>
        <Flex gap="gap.medium">
          <Image
            styles={imageStyles}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
            fluid
            alt={imageAltTags.allan}
          />
          {carouselTextContent}
        </Flex>
        <Button content="Open" styles={buttonStyles} />
      </div>
    ),
    'aria-label': 'Allan card',
  },
  {
    key: 'carole',
    id: 'carole',
    content: (
      <div>
        <Flex gap="gap.medium">
          <Image
            styles={imageStyles}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
            fluid
            alt={imageAltTags.carole}
          />
          {carouselTextContent}
        </Flex>
        {carouselToolbarContent}
      </div>
    ),
    'aria-label': 'Carole card',
  },
  {
    key: 'elvia',
    id: 'elvia',
    content: (
      <div>
        <Flex gap="gap.medium">
          <Image
            styles={imageStyles}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
            fluid
            alt={imageAltTags.elvia}
          />
          {carouselTextContent}
        </Flex>
        <Flex gap="gap.medium" styles={buttonStyles}>
          <Button content="Call" />
          <Button content="Video call" />
        </Flex>
      </div>
    ),
    'aria-label': 'Elvia card',
  },
];

const CarouselExample = () => (
  <Carousel
    aria-roledescription="carousel"
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
