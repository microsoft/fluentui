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
    margin: '0px 10px',
  },
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

export const FreeLayout = () => {
  const classes = useClasses();

  return (
    <Carousel circular defaultValue={'test-5'}>
      <CarouselSlider>
        <CarouselCard className={classes.card} value="test-1" style={{ maxWidth: '30%' }}>
          {TestDiv('test-1', 'lightgrey')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-2" style={{ maxWidth: '45%' }}>
          {TestDiv('test-2', 'lightblue')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-3" style={{ maxWidth: '20%' }}>
          {TestDiv('test-3', 'BlanchedAlmond')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-4" style={{ maxWidth: '80%' }}>
          {TestDiv('test-4', 'DarkKhaki')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-5" style={{ maxWidth: '75%' }}>
          {TestDiv('test-5', 'blue')}
        </CarouselCard>
        <CarouselCard className={classes.card} value="test-6" style={{ maxWidth: '30%' }}>
          {TestDiv('test-6', 'green')}
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
