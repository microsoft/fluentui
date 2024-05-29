import * as React from 'react';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavImageButton,
  CarouselProps,
} from '@fluentui/react-carousel-preview';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const Default = (props: Partial<CarouselProps>) => (
  <Carousel circular={true} defaultValue={'test-1'} {...props}>
    <CarouselCard value="test-1">{'test-1'}</CarouselCard>
    <CarouselCard value="test-2">{'test-2'}</CarouselCard>
    <CarouselCard value="test-3">{'test-3'}</CarouselCard>
    <CarouselCard value="test-4">{'test-4'}</CarouselCard>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CarouselButton navType="prev" />
      <CarouselNav>{() => <CarouselNavImageButton image={{ src: swapImage }} />}</CarouselNav>
      <CarouselButton navType="next" />
    </div>
  </Carousel>
);
