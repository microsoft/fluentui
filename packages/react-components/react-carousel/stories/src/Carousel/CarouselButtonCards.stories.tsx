import { Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselCardButton,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  CarouselAnnouncerFunction,
  CarouselSlider,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    textAlign: 'left',
    position: 'relative',
    margin: '10px',
    maxWidth: '350px',
    boxShadow: tokens.shadow16,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    background: tokens.colorNeutralBackground1,
    textDecoration: 'none',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: tokens.colorNeutralBackground1,
    padding: '18px',
  },
  text: {
    ...typographyStyles.body1,
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
  },
});

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
    <CarouselCardButton
      className={classes.bannerCard}
      aria-label={`${index + 1} of ${IMAGES.length}`}
      id={`test-${index}`}
      href="http://www.google.com"
    >
      <div>
        <Image fit="cover" src={imageSrc} role="presentation" height={250} />

        <div className={classes.cardContainer}>
          <div className={classes.text}>{children}</div>
        </div>
      </div>
    </CarouselCardButton>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const CarouselButtonCards = () => (
  <Carousel draggable circular announcement={getAnnouncement}>
    <CarouselViewport>
      <CarouselSlider cardFocus>
        {IMAGES.map((imageSrc, index) => (
          <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
            This card is an accessible link
          </BannerCard>
        ))}
      </CarouselSlider>
    </CarouselViewport>
    <CarouselNavContainer
      layout="inline"
      nextTooltip={{ content: 'Go to next', relationship: 'label' }}
      prevTooltip={{ content: 'Go to prev', relationship: 'label' }}
    >
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
);
