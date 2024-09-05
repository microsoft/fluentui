import { Button, makeStyles, tokens, Tooltip, typographyStyles } from '@fluentui/react-components';
import { Carousel, CarouselButton, CarouselCard, CarouselSlider } from '@fluentui/react-carousel-preview';
import * as React from 'react';

const useClasses = makeStyles({
  carousel: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content 1fr',
    gap: '10px',
    placeItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  test: {
    ...typographyStyles.largeTitle,
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '200px',
    textAlign: 'center',
  },
  footer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  code: {
    justifyContent: 'end',
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusLarge,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase400,
    padding: '10px',
    placeSelf: 'end',
  },
  controls: {
    alignSelf: 'center',
    display: 'flex',
    gap: '10px',
  },
  control: {
    minWidth: '32px',
  },
});

const TestComponent: React.FC<{ accentColor: string; children: string }> = props => {
  const { accentColor, children } = props;
  const classes = useClasses();

  return (
    <div className={classes.test} style={{ backgroundColor: accentColor }}>
      {children}
    </div>
  );
};

export const Controlled = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <Carousel
        activeIndex={activeIndex}
        className={classes.carousel}
        groupSize={1}
        onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
      >
        <Tooltip content={'Go To Previous Page'} relationship={'label'}>
          <CarouselButton navType="prev" aria-label="Previous Carousel Page Button" />
        </Tooltip>

        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <CarouselSlider>
            <CarouselCard>
              <TestComponent accentColor="#B99095">Card 1</TestComponent>
            </CarouselCard>
            <CarouselCard>
              <TestComponent accentColor="#FCB5AC">Card 2</TestComponent>
            </CarouselCard>
            <CarouselCard>
              <TestComponent accentColor="#B5E5CF">Card 3</TestComponent>
            </CarouselCard>
            <CarouselCard>
              <TestComponent accentColor="#3D5B59">Card 4</TestComponent>
            </CarouselCard>
            <CarouselCard>
              <TestComponent accentColor="#F9EAC2">Card 5</TestComponent>
            </CarouselCard>
          </CarouselSlider>
        </div>

        <Tooltip content={'Go To Next Page'} relationship={'label'}>
          <CarouselButton navType="next" aria-label="Next Carousel Page Button" />
        </Tooltip>
      </Carousel>

      <div className={classes.footer}>
        <code className={classes.code}>{JSON.stringify({ activeIndex })}</code>
        <div className={classes.controls}>
          {new Array(5).fill(null).map((_, index) => (
            <Button
              key={`externalCarouselNavButton-${index}`}
              className={classes.control}
              disabled={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-label={`Carousel Nav Button ${index} `}
            >
              {index}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
