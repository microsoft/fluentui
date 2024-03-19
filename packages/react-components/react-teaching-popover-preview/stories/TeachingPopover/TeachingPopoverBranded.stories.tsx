import * as React from 'react';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverFooter,
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

export const DefaultBrand = (props: TeachingPopoverProps) => (
  <TeachingPopover appearance="brand" withArrow={true} {...props}>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
      <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
        <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
        {ExampleContent(1)}
      </TeachingPopoverBody>
      <TeachingPopoverFooter strings={{ primary: 'Learn more', secondary: 'Got it' }} />
    </TeachingPopoverSurface>
  </TeachingPopover>
);
