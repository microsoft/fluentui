import * as React from 'react';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavImageButton,
  CarouselProps,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

const TestDiv = (text: string, bgColor: string) => {
  return (
    <div
      style={{
        height: '100px',
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

export const Default = (props: Partial<CarouselProps>) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
    <Carousel circular={true} peeking={true} defaultValue={'test-1'} {...props}>
      <CarouselSlider>
        <CarouselCard value="test-1">{TestDiv('test-1', 'lightgrey')}</CarouselCard>
        <CarouselCard value="test-2">{TestDiv('test-2', 'lightblue')}</CarouselCard>
        <CarouselCard value="test-3">{TestDiv('test-3', 'BlanchedAlmond')}</CarouselCard>
        <CarouselCard value="test-4">{TestDiv('test-4', 'DarkKhaki')}</CarouselCard>
        <CarouselCard value="test-5">{TestDiv('test-5', 'magenta')}</CarouselCard>
        <CarouselCard value="test-6">{TestDiv('test-6', 'lightpink')}</CarouselCard>
        <CarouselCard value="test-7">{TestDiv('test-7', 'lightgreen')}</CarouselCard>
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

    <Carousel circular={true} peeking={true} defaultValue={'test-1'} {...props}>
      <CarouselSlider peeking>
        <CarouselCard value="test-1">{TestDiv('test-1', 'lightgrey')}</CarouselCard>
        <CarouselCard value="test-2">{TestDiv('test-2', 'lightblue')}</CarouselCard>
        <CarouselCard value="test-3">{TestDiv('test-3', 'BlanchedAlmond')}</CarouselCard>
        <CarouselCard value="test-4">{TestDiv('test-4', 'DarkKhaki')}</CarouselCard>
        <CarouselCard value="test-5">{TestDiv('test-5', 'magenta')}</CarouselCard>
        <CarouselCard value="test-6">{TestDiv('test-6', 'lightpink')}</CarouselCard>
        <CarouselCard value="test-7">{TestDiv('test-7', 'lightgreen')}</CarouselCard>
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

    <Carousel circular={true} defaultValue={'test-1'} {...props}>
      <CarouselSlider cards={3}>
        <CarouselCard value="test-1">{TestDiv('test-1', 'lightgrey')}</CarouselCard>
        <CarouselCard value="test-2">{TestDiv('test-2', 'lightblue')}</CarouselCard>
        <CarouselCard value="test-3">{TestDiv('test-3', 'BlanchedAlmond')}</CarouselCard>
        <CarouselCard value="test-4">{TestDiv('test-4', 'DarkKhaki')}</CarouselCard>
        <CarouselCard value="test-5">{TestDiv('test-5', 'magenta')}</CarouselCard>
        <CarouselCard value="test-6">{TestDiv('test-6', 'lightpink')}</CarouselCard>
        <CarouselCard value="test-7">{TestDiv('test-7', 'lightgreen')}</CarouselCard>
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
  </div>
);
