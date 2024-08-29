import { Button, makeStyles, tokens, Tooltip, typographyStyles } from '@fluentui/react-components';
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
  test: {
    ...typographyStyles.largeTitle,
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    minHeight: '450px',
    textAlign: 'center',
  },
});

const TestComponent: React.FC<{ accentColor: string; children: React.ReactNode }> = props => {
  const { accentColor, children } = props;
  const classes = useClasses();

  return (
    <div className={classes.test} style={{ backgroundColor: accentColor }}>
      {children}
    </div>
  );
};

export const Default = () => (
  <Carousel groupSize={1} enableDrag align="start">
    <CarouselSlider>
      <CarouselCard>
        <TestComponent accentColor="#B99095">
          <Button>Card 1</Button>
        </TestComponent>
      </CarouselCard>
      <CarouselCard>
        <TestComponent accentColor="#FCB5AC">
          <Button>Card 2</Button>
        </TestComponent>
      </CarouselCard>
      <CarouselCard>
        <TestComponent accentColor="#B5E5CF">
          <Button>Card 3</Button>
        </TestComponent>
      </CarouselCard>
      <CarouselCard>
        <TestComponent accentColor="#3D5B59">
          <Button>Card 4</Button>
        </TestComponent>
      </CarouselCard>
      <CarouselCard>
        <TestComponent accentColor="#F9EAC2">
          <Button>Card 5</Button>
        </TestComponent>
      </CarouselCard>
      <CarouselCard>
        <TestComponent accentColor="#FEE7E6">
          <Button>Card 7</Button>
        </TestComponent>
      </CarouselCard>
      <CarouselCard>
        <TestComponent accentColor="#FFD898">
          <Button>Card 8</Button>
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
      <Tooltip content={'Go To Previous Page'} relationship={'label'}>
        <CarouselButton navType="prev" aria-label={'Previous Carousel Page Button'} />
      </Tooltip>
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      <Tooltip content={'Go To Next Page'} relationship={'label'}>
        <CarouselButton navType="next" aria-label={'Next Carousel Page Button'} />
      </Tooltip>
    </div>
  </Carousel>
);
