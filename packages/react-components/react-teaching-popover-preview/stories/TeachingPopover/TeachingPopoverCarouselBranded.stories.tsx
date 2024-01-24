import * as React from 'react';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverActions,
  TeachingPopoverBody,
  TeachingPopoverButton,
  TeachingPopoverCarousel,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverPageCount,
} from '@fluentui/react-teaching-popover-preview';
import type { TeachingPopoverProps } from '@fluentui/react-teaching-popover-preview';
import SwapImage from '../../etc/images/swapImage.png';

const ExampleContent = (index: number) => {
  return (
    <>
      <div>{`This is page: ${index}`}</div>
    </>
  );
};

export const CarouselBrand = (props: TeachingPopoverProps) => (
  <TeachingPopover appearance="brand" withArrow={true} {...props}>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
      <TeachingPopoverCarousel
        strings={{
          next: 'Next',
          previous: 'Previous',
          initialStepText: 'Close',
          finalStepText: 'Finish',
        }}
      >
        {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
        <TeachingPopoverBody media={<Image fit={'cover'} src={SwapImage} />}>
          <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
          {ExampleContent(1)}
        </TeachingPopoverBody>

        {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
        <TeachingPopoverBody media={<Image fit={'cover'} src={SwapImage} />}>
          <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
          {ExampleContent(2)}
        </TeachingPopoverBody>

        {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
        <TeachingPopoverBody media={<Image fit={'cover'} src={SwapImage} />}>
          <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
          {ExampleContent(3)}
        </TeachingPopoverBody>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
