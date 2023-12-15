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

export const CarouselText = (props: TeachingPopoverProps) => (
  <TeachingPopover withArrow={true} {...props}>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
      <TeachingPopoverCarousel>
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
      <TeachingPopoverActions>
        {/* TeachingPopoverActions ensure that carousel & popover functionality work in sync */}
        <TeachingPopoverButton buttonType="secondary" altStepText="Close">
          {'Back'}
        </TeachingPopoverButton>
        {/* Shorthand version
        <TeachingPopoverPageCount countStyle="text">{'of'}</TeachingPopoverPageCount>
        */}
        {/*Function use*/}
        <TeachingPopoverPageCount countStyle="text">
          {(currentPage: number, totalPages: number) => {
            return `${currentPage} of ${totalPages}`;
          }}
        </TeachingPopoverPageCount>
        <TeachingPopoverButton buttonType="primary" altStepText="Finish">
          {'Next'}
        </TeachingPopoverButton>
      </TeachingPopoverActions>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
