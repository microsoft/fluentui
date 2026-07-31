import { Button, CarouselSlider, Image } from '@fluentui/react-components';
import type { CarouselAnnouncerFunction } from '@fluentui/react-components';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  Text,
} from '@fluentui/react-components';
import * as React from 'react';

import styles from './CarouselTopNavigation.module.css';

const useClasses = () => styles;

const IMAGES = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
];

const BannerCard: React.FC<{ children: React.ReactNode; imageSrc: string; index: number }> = props => {
  const { children, imageSrc, index } = props;
  const classes = useClasses();

  return (
    <CarouselCard autoSize className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`}>
      <Image fit="cover" src={imageSrc} role="presentation" className={classes.image} />

      <div className={classes.cardContainer}>
        <div className={classes.title}>{children}</div>
        <div className={classes.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </div>
        <div>
          <Button appearance="primary">Call to action</Button>
        </div>
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const TopNavigation = (): React.ReactElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Carousel circular draggable announcement={getAnnouncement} className={classes.carousel}>
          <div className={classes.carouselHeader}>
            <Text as="h1" className={classes.carouselHeaderTitle}>
              Carousel Title
            </Text>
            <CarouselNavContainer
              next={{ 'aria-label': 'go to next' }}
              prev={{ 'aria-label': 'go to prev' }}
              className={classes.carouselNavigation}
            >
              <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
            </CarouselNavContainer>
          </div>
          <CarouselViewport>
            <CarouselSlider className={classes.slider}>
              {IMAGES.map((imageSrc, index) => (
                <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
                  Card {index + 1}
                </BannerCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
        </Carousel>
      </div>
    </div>
  );
};

TopNavigation.parameters = {
  docs: {
    description: {
      story:
        'Top navigation places carousel controls at the header so users can see the title, page position, and navigation in one line. This story shows the default variant with previous and next buttons and dot pagination using CarouselNav inside CarouselNavContainer.',
    },
  },
};
