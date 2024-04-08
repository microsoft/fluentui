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

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const Carousel = (props: TeachingPopoverProps) => {
  return (
    <TeachingPopover withArrow={true} {...props}>
      <TeachingPopoverTrigger>
        <Button>TeachingPopover trigger</Button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
        <TeachingPopoverCarousel next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          <TeachingPopoverBody value={'test-0'} media={<Image alt={'test image'} fit={'cover'} src={swapImage} />}>
            <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
            <div>{`This is page: 1`}</div>
          </TeachingPopoverBody>

          <TeachingPopoverBody value={'test-1'} media={<Image alt={'test image'} fit={'cover'} src={swapImage} />}>
            <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
            <div>{`This is page: 2`}</div>
          </TeachingPopoverBody>

          <TeachingPopoverBody value={'test-2'} media={<Image alt={'test image'} fit={'cover'} src={swapImage} />}>
            <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
            <div>{`This is page: 3`}</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>
  );
};
