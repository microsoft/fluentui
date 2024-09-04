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
    ...typographyStyles.title1,
    position: 'absolute',
    left: '10%',
    top: '25%',
    background: tokens.colorNeutralBackground1,
    padding: '18px',
    maxWidth: '270px',
    width: '50%',
  },
  subtext: {
    ...typographyStyles.body1,
    paddingTop: '18px',
  },
});

const fullScreenImages = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
];

const BannerCard: React.FC<{ children: React.ReactNode; imageSrc: string }> = props => {
  const { children, imageSrc } = props;
  const classes = useClasses();

  return (
    <CarouselCard className={classes.bannerCard}>
      <Image fit="cover" src={imageSrc} />
      <div className={classes.cardContainer}>
        {children}
        <div className={classes.subtext}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
          }
        </div>
        <Button size="small" shape="square" appearance="primary">
          Call to action
        </Button>
      </div>
    </CarouselCard>
  );
};

export const Default = () => (
  <Carousel groupSize={1}>
    <CarouselSlider>
      {fullScreenImages.concat(fullScreenImages).map((imageSrc, index) => {
        return <BannerCard imageSrc={imageSrc}>{`Card ${index + 1}`}</BannerCard>;
      })}
    </CarouselSlider>
    <CarouselNavContainer layout={'inline'} autoplay={''}>
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
);
