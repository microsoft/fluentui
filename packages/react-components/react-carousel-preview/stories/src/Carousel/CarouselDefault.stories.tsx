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
        height: '450px',
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
  <Carousel circular={true} defaultValue={'test-1'} cardWidth={'70%'} {...props}>
    <CarouselSlider>
      <CarouselCard value="test-1">{TestDiv('test-1', 'lightgrey')}</CarouselCard>
      <CarouselCard value="test-2">{TestDiv('test-2', 'lightblue')}</CarouselCard>
      <CarouselCard value="test-3">{TestDiv('test-3', 'BlanchedAlmond')}</CarouselCard>
      <CarouselCard value="test-4">{TestDiv('test-4', 'DarkKhaki')}</CarouselCard>
      <CarouselCard value="test-5">{TestDiv('test-5', 'blue')}</CarouselCard>
      <CarouselCard value="test-6">{TestDiv('test-6', 'green')}</CarouselCard>
      <CarouselCard value="test-7">{TestDiv('test-7', 'red')}</CarouselCard>
      <CarouselCard value="test-8">{TestDiv('test-8', 'yellow')}</CarouselCard>
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
