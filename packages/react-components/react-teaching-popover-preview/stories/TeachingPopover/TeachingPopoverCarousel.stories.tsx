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

export const Carousel = (props: TeachingPopoverProps) => {
  const [arrayFlag, setArrayFlag] = React.useState(true);
  const array = [1, 2, 3];
  const array1 = [1, 2, 4, 3];
  const useArray = !!arrayFlag ? array : array1;
  console.log('arrayFlag: ', !!arrayFlag);
  console.log('ARRAY: ', useArray);
  return (
    <TeachingPopover withArrow={true} {...props}>
      <TeachingPopoverTrigger>
        <Button>TeachingPopover trigger</Button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
        <TeachingPopoverCarousel next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}

          {useArray.map((arrItem, index) => {
            return (
              <TeachingPopoverBody
                value={'test-' + arrItem}
                key={arrItem}
                media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}
              >
                <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
                {ExampleContent(arrItem)}
                <Button
                  onClick={() => {
                    console.log('Setting array flag: ', !arrayFlag);
                    setArrayFlag(!arrayFlag);
                  }}
                >
                  {'Add more pages'}
                </Button>
              </TeachingPopoverBody>
            );
          })}
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>
  );
};
