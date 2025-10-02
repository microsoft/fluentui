import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselSlider,
  CarouselViewport,
  Dialog,
  DialogSurface,
  DialogTrigger,
  Image,
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  surface: {
    padding: 0,
    ...shorthands.border('none'),
    overflow: 'hidden',
  },
  carousel: { padding: 0 },
  card: {},
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingVerticalXXL} ${tokens.spacingVerticalXXL} ${tokens.spacingVerticalXXL}`,
  },
  header: {
    display: 'block',
    // We use margin instead of padding to avoid messing with the focus indicator in the header
    margin: `${tokens.spacingVerticalXXL} ${tokens.spacingVerticalXXL} ${tokens.spacingVerticalS} ${tokens.spacingVerticalXXL}`,
    ...typographyStyles.subtitle1,
  },
  text: {
    display: 'block',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingVerticalXXL}`,
    ...typographyStyles.body1,
  },
});

const PAGES = [
  {
    id: 'Copilot-page-1',
    alt: 'Copilot logo',
    imgSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
    header: 'Discover Copilot, a whole new way to work',
    text: 'Explore new ways to work smarter and faster using the power of AI. Copilot in [Word] can help you [get started from scratch], [work from an existing file], [get actionable insights about documents], and more.',
  },
  {
    id: 'Copilot-page-2',
    alt: 'Copilot logo 2',
    imgSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
    header: 'Use your own judgment',
    text: 'Copilot can make mistakes so remember to verify the results. To help improve the experience, please share your feedback with us.',
  },
];

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}, ${PAGES[index].header}`;
};

export const FirstRunExperience = (): JSXElement => {
  const styles = useStyles();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [open, setModalOpen] = React.useState(false);
  const totalPages = PAGES.length;

  const setPage = (page: number) => {
    if (page < 0 || page >= totalPages) {
      setModalOpen(false);
      return;
    }
    setActiveIndex(page);
  };

  React.useEffect(() => {
    // Reset or initialize page on open if necessary
    if (open) {
      setActiveIndex(0);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(e, data) => setModalOpen(data.open)}>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogSurface className={styles.surface} aria-label="Discover Copilot">
        <Carousel
          className={styles.carousel}
          groupSize={1}
          circular
          announcement={getAnnouncement}
          activeIndex={activeIndex}
          motion="fade"
          onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
        >
          <CarouselViewport>
            <CarouselSlider>
              {PAGES.map(page => (
                <CarouselCard className={styles.card} key={page.id}>
                  <Image src={page.imgSrc} width={600} height={324} alt={page.imgSrc} />
                  <h1 tabIndex={-1} className={styles.header}>
                    {page.header}
                  </h1>
                  <span className={styles.text}>{page.text}</span>
                </CarouselCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
          <div className={styles.footer}>
            <Button onClick={() => setPage(activeIndex - 1)}>{activeIndex <= 0 ? 'Not Now' : 'Previous'}</Button>

            <CarouselNav appearance="brand">
              {index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}
            </CarouselNav>

            <Button appearance="primary" onClick={() => setPage(activeIndex + 1)}>
              {activeIndex === totalPages - 1 ? 'Try Copilot' : 'Next'}
            </Button>
          </div>
        </Carousel>
      </DialogSurface>
    </Dialog>
  );
};

FirstRunExperience.parameters = {
  docs: {
    description: {
      story: 'Carousel can be used in a Dialog to create a _first-run_ experience.',
    },
  },
};
