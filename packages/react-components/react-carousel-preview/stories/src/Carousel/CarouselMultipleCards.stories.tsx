import { makeStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavImageButton,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const useClasses = makeStyles({
  card: {
    flex: '0 0 45%',
    margin: '0px 10px',
  },
  slider: {},
});

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

const TestDiv = (text: string, bgColor: string) => {
  return (
    <div
      style={{
        height: '200px',
        borderRadius: '12px',
        backgroundColor: bgColor,
        alignContent: 'center',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};

export const MultipleCards = () => {
  const classes = useClasses();

  return (
    <Carousel circular defaultValue={'test-5'}>
      <CarouselSlider className={classes.slider}>
        <CarouselCard className={classes.card} value="test-1">
          {TestDiv('test-1', 'lightgrey')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-2">
          {TestDiv('test-2', 'lightblue')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-3">
          {TestDiv('test-3', 'BlanchedAlmond')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-4">
          {TestDiv('test-4', 'DarkKhaki')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-5">
          {TestDiv('test-5', 'blue')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-6">
          {TestDiv('test-6', 'green')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-7">
          {TestDiv('test-7', 'red')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-8">
          {TestDiv('test-8', 'yellow')}
        </CarouselCard>
      </CarouselSlider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <CarouselButton navType="prev" />
        <CarouselNav>{() => <CarouselNavImageButton image={{ src: swapImage }} />}</CarouselNav>
        <CarouselButton navType="next" />
      </div>
    </Carousel>
  );
};
