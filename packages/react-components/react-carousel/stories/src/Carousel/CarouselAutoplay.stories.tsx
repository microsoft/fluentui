import {
  Button,
  CarouselSlider,
  Field,
  Image,
  makeStyles,
  Switch,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselAutoplayButtonProps,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

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
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
    boxShadow: tokens.shadow16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    padding: '10px',
    minHeight: '100px',
  },
  carousel: {
    flex: 1,
    padding: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderBottom: 'none',
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    padding: '10px',
  },
  field: {
    flex: 1,
    gridTemplateColumns: 'minmax(100px, max-content) 1fr',
  },
  dropdown: {
    maxWidth: 'max-content',
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
    <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`}>
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

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Autoplay = (): JSXElement => {
  const classes = useClasses();
  const [autoplayEnabled, setAutoplayEnabled] = React.useState(false);
  const [autoplayButton, setAutoplayButton] = React.useState(true);

  const autoplayProps: CarouselAutoplayButtonProps | undefined = autoplayButton
    ? {
        'aria-label': 'Enable autoplay',
        checked: autoplayEnabled,
        onCheckedChange: (e, data) => {
          setAutoplayEnabled(data.checked);
        },
      }
    : undefined;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field label="Autoplay Present" orientation="horizontal" className={classes.field}>
          <Switch checked={autoplayButton} onChange={() => setAutoplayButton(!autoplayButton)} />
        </Field>

        <Field label="Autoplay Enabled" orientation="horizontal" className={classes.field}>
          <Switch checked={autoplayEnabled} onChange={() => setAutoplayEnabled(!autoplayEnabled)} />
        </Field>
      </div>
      <div className={classes.card}>
        <Carousel groupSize={1} circular announcement={getAnnouncement}>
          <CarouselViewport>
            <CarouselSlider>
              {IMAGES.map((imageSrc, index) => (
                <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
                  Card {index + 1}
                </BannerCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
          <CarouselNavContainer
            layout="inline"
            autoplay={autoplayProps}
            next={{ 'aria-label': 'go to next' }}
            prev={{ 'aria-label': 'go to prev' }}
          >
            <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
          </CarouselNavContainer>
        </Carousel>
      </div>
    </div>
  );
};

Autoplay.parameters = {
  docs: {
    description: {
      story:
        'The Autoplay button must be present to enable autoplay as it is an accessibility requirement. To enable, any valid prop (recommended ariaLabel) must be passed in, while setting the autoplay prop in CarouselNav to undefined will disable and remove it.',
    },
  },
};
