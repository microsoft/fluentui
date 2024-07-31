import { Button, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const useClasses = makeStyles({
  card: {
    flex: '0 0 35%',
    margin: '0px 10px',
  },
  test: {
    ...typographyStyles.largeTitle,
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '200px',
    textAlign: 'center',
  },
});

const TestComponent: React.FC<{ accentColor: string }> = props => {
  const { accentColor, children } = props;
  const classes = useClasses();

  return (
    <div className={classes.test} style={{ backgroundColor: accentColor }}>
      {children}
    </div>
  );
};

export const CardFocus = () => {
  const classes = useClasses();

  return (
    <Carousel aria-roledescription="carousel">
      <CarouselSlider aria-label="carousel slider">
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#B99095">
            <Button>Card 1</Button>
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#FCB5AC">
            {' '}
            <Button>Card 2</Button>
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#B5E5CF">
            {' '}
            <Button>Card 3</Button>
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#3D5B59">
            {' '}
            <Button>Card 4</Button>
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#F9EAC2">
            {' '}
            <Button>Card 5</Button>
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#FEE7E6">
            {' '}
            <Button>Card 6</Button>
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} tabIndex={0}>
          <TestComponent accentColor="#FFD898">
            {' '}
            <Button>Card 7</Button>
          </TestComponent>
        </CarouselCard>
      </CarouselSlider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <CarouselButton navType="prev" aria-label="previous carousel page" />
        <CarouselNav aria-roledescription="carousel page navigation">{() => <CarouselNavButton />}</CarouselNav>
        <CarouselButton navType="next" aria-label="next carousel page" />
      </div>
    </Carousel>
  );
};
