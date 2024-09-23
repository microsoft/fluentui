import { Button, Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncer,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '450px',
    textAlign: 'left',
    position: 'relative',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    position: 'absolute',
    left: '10%',
    top: '25%',
    background: tokens.colorNeutralBackground1,
    padding: '18px',
    maxWidth: '270px',
    width: '50%',
  },
  title: {
    ...typographyStyles.title1,
  },
  subtext: {
    ...typographyStyles.body1,
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
    <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`} id={`test-${index}`}>
      <Image fit="cover" src={imageSrc} role="presentation" />

      <div className={classes.cardContainer}>
        <div className={classes.title}>{children}</div>
        <div className={classes.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </div>
        <div>
          <Button size="small" shape="square" appearance="primary">
            Call to action
          </Button>
        </div>
      </div>
    </CarouselCard>
  );
};

export const Default = () => (
  <Carousel groupSize={1} circular>
    <CarouselSlider>
      {IMAGES.map((imageSrc, index) => (
        <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
          Card {index + 1}
        </BannerCard>
      ))}
    </CarouselSlider>
    <CarouselNavContainer
      layout="inline"
      autoplay={{
        'aria-label': 'Enable autoplay',
      }}
      next={{ 'aria-label': 'go to next' }}
      prev={{ 'aria-label': 'go to prev' }}
    >
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
    </CarouselNavContainer>
    <CarouselAnnouncer>
      {(currentIndex, totalSlides, _slideGroupList) => {
        return `Slide ${currentIndex + 1} of ${totalSlides}`;
      }}
    </CarouselAnnouncer>
  </Carousel>
);
