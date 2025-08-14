import { Button, CarouselSlider, Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    height: '450px',
    textAlign: 'left',
    position: 'relative',
  },
  image: {
    borderRadius: 'inherit',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    position: 'absolute',
    left: '10%',
    top: '25%',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
    background: tokens.colorNeutralBackground1,
    padding: '24px 32px',
    maxWidth: '270px',
    width: '50%',
  },
  title: {
    ...typographyStyles.title3,
  },
  subtext: {
    marginBottom: '12px',
    ...typographyStyles.body1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
  },
  card: {
    minHeight: '100px',
  },
  carousel: {
    flex: 1,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    padding: '10px',
  },
  field: {
    flex: 1,
    gridTemplateColumns: 'minmax(100px, max-content) 1fr',
  },
  dropdown: {
    maxWidth: 'max-content',
  },
  carouselHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  carouselHeaderTitle: { flex: '1', margin: '0', fontSize: '22px', fontWeight: 800 },
  carouselNavigation: { width: 'fit-content', alignSelf: 'center', margin: '0' },
  slider: {
    gap: '0',
    '& > *': {
      margin: '0 12px',
    },
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

export const DesignBestPractices = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Carousel circular draggable announcement={getAnnouncement}>
          <div className={classes.carouselHeader}>
            <h1 className={classes.carouselHeaderTitle}>Carousel Title</h1>
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

DesignBestPractices.parameters = {
  docs: {
    description: {
      story:
        'Carousel can have responsive cards that adjust their size based on the content, using `autoSize` prop on `CarouselCard`. This example demonstrates responsive banner cards with images.',
    },
  },
};
