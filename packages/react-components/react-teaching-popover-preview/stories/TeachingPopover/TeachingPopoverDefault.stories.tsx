import * as React from 'react';
import { Button } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverActions,
  TeachingPopoverBody,
  TeachingPopoverButton,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
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

export const Default = (props: TeachingPopoverProps) => (
  <TeachingPopover withArrow={true} {...props}>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
      <TeachingPopoverBody media={<img src={SwapImage} />}>
        <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
        {ExampleContent(1)}
      </TeachingPopoverBody>
      <TeachingPopoverActions>
        {/* TeachingPopoverActions ensure that carousel & popover functionality work in sync */}
        <TeachingPopoverButton buttonType="secondary" altStepText="Close">
          {'Learn More'}
        </TeachingPopoverButton>
        <TeachingPopoverButton buttonType="primary" altStepText="Finish">
          {'Got it'}
        </TeachingPopoverButton>
      </TeachingPopoverActions>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
