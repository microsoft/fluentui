import { makeStyles, tokens, Tooltip, typographyStyles } from '@fluentui/react-components';
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
    margin: '0px 10px',
  },
  test: {
    ...typographyStyles.largeTitle,
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '200px',
    textAlign: 'center',
    padding: '25px',
    maxWidth: '100%',
  },
  largeCardContent: {
    minWidth: '350px',
  },
  mediumCardContent: {
    minWidth: '200px',
  },
  smallCardContent: {
    minWidth: '50px',
  },
});

const TestComponent: React.FC<{ accentColor: string; children: string; className?: string }> = props => {
  const { accentColor, children, className } = props;
  const classes = useClasses();

  return (
    <div className={classes.test + ' ' + className} style={{ backgroundColor: accentColor }}>
      {children}
    </div>
  );
};

export const Responsive = () => {
  const classes = useClasses();

  return (
    <Carousel>
      <CarouselSlider>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#B99095">Responsive sizing without a minWidth!</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#FCB5AC" className={classes.smallCardContent}>
            Card 2
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#B5E5CF" className={classes.mediumCardContent}>
            Card 3
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#3D5B59" className={classes.largeCardContent}>
            Card 4
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#F9EAC2" className={classes.mediumCardContent}>
            Card 5
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#FEE7E6" className={classes.largeCardContent}>
            Card 6
          </TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card} autoSize={true}>
          <TestComponent accentColor="#FFD898" className={classes.smallCardContent}>
            Card 7
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
          <CarouselButton navType="prev" aria-label={`Previous Carousel Page Button`} />
        </Tooltip>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
        <Tooltip content={'Go To Next Page'} relationship={'label'}>
          <CarouselButton navType="next" aria-label={'Next Carousel Page Button'} />
        </Tooltip>
      </div>
    </Carousel>
  );
};
