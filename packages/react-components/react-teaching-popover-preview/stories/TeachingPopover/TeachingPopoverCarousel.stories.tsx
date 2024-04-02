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
} from '@fluentui/react-teaching-popover-preview';
import type { TeachingPopoverProps } from '@fluentui/react-teaching-popover-preview';

const SwapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

const ExampleContent = (index: number) => {
  return (
    <>
      <div>{`This is page: ${index}`}</div>
    </>
  );
};

export const Carousel = (props: TeachingPopoverProps) => (
  <TeachingPopover withArrow={true} {...props}>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
      <TeachingPopoverCarousel next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
        {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
        <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
          <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
          {ExampleContent(1)}
        </TeachingPopoverBody>

        {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
        <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
          <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
          {ExampleContent(2)}
        </TeachingPopoverBody>

        {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
        <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
          <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
          {ExampleContent(3)}
        </TeachingPopoverBody>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
