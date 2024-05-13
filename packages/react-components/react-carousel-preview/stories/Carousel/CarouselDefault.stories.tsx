import * as React from 'react';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselProps,
} from '@fluentui/react-carousel-preview';

export const Default = (props: Partial<CarouselProps>) => (
  <Carousel defaultValue={'test-1'} {...props}>
    <CarouselCard value="test-1">{'test-1'}</CarouselCard>
    <CarouselCard value="test-2">{'test-2'}</CarouselCard>
    <CarouselCard value="test-3">{'test-3'}</CarouselCard>
    <CarouselCard value="test-4">{'test-4'}</CarouselCard>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CarouselButton navType="prev">{'prev'}</CarouselButton>
      <CarouselNav>{() => <CarouselNavButton />}</CarouselNav>
      <CarouselButton navType="next">{'next'}</CarouselButton>
    </div>
  </Carousel>
);
