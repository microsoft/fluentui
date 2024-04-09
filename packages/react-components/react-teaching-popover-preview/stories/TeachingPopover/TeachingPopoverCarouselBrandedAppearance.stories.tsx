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
} from '@fluentui/react-teaching-popover-preview';
import type { TeachingPopoverProps } from '@fluentui/react-teaching-popover-preview';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const CarouselBrand = (props: TeachingPopoverProps) => (
  <TeachingPopover appearance="brand" withArrow={true} {...props}>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
      <TeachingPopoverCarousel
        footer={{
          next: 'Next',
          previous: 'Previous',
          initialStepText: 'Close',
          finalStepText: 'Finish',
        }}
      >
        <TeachingPopoverCarouselCard value="test-0">
          <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={swapImage} />}>
            <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
            <div>{`This is page: 1`}</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="test-1">
          <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={swapImage} />}>
            <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
            <div>{`This is page: 2`}</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="test-2">
          <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={swapImage} />}>
            <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
            <div>{`This is page: 3`}</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
