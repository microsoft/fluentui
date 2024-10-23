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
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const Default = () => (
  <TeachingPopover>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
      <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
        <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
        <div>This is a teaching popover body</div>
      </TeachingPopoverBody>
      <TeachingPopoverFooter primary="Learn more" secondary="Got it" />
    </TeachingPopoverSurface>
  </TeachingPopover>
);
