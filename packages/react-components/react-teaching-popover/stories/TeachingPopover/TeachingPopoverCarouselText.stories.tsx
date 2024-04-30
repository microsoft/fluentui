import * as React from 'react';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselPageCount,
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const CarouselText = () => (
  <TeachingPopover>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>Tips"</TeachingPopoverHeader>
      <TeachingPopoverCarousel defaultValue="test-1">
        <TeachingPopoverCarouselCard value="test-1">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 1</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="test-2">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 2</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="test-3">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 3</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          <TeachingPopoverCarouselPageCount>
            {(currentIndex: number, totalPages: number) => `${currentIndex} of ${totalPages}`}
          </TeachingPopoverCarouselPageCount>
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
