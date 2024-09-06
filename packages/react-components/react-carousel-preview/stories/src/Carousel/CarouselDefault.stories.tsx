import { Button, Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
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
];

const BannerCard: React.FC<{ children: React.ReactNode; imageSrc: string }> = props => {
  const { children, imageSrc } = props;
  const classes = useClasses();

  return (
    <CarouselCard className={classes.bannerCard}>
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
      {IMAGES.concat(IMAGES).map((imageSrc, index) => (
        <BannerCard key={`image-${index}`} imageSrc={imageSrc}>
          Card {index + 1}
        </BannerCard>
      ))}
    </CarouselSlider>
    <CarouselNavContainer
      layout="inline"
      autoplay={{
        autoplayAriaLabel: autoplay => (autoplay ? 'Enable Autoplay' : 'Disable Autoplay'),
      }}
      next={{ 'aria-label': 'Go to next slide' }}
      prev={{ 'aria-label': 'Go to prev slide' }}
    >
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
);
