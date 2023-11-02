import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { TeachingBubble, TeachingBubbleTrigger, TeachingBubbleSurface } from '@fluentui/react-components/unstable';
import type { TeachingBubbleProps } from '@fluentui/react-components/unstable';
import { TeachingBubbleHeader } from '../../src/components/TeachingBubbleHeader/TeachingBubbleHeader';
import { TeachingBubbleBody } from '../../src/components/TeachingBubbleBody/index';
import { TeachingBubbleActions } from '../../src/components/TeachingBubbleActions/index';
import { TeachingBubbleTitle } from '../../src/components/TeachingBubbleTitle/index';
import { TeachingBubblePageCount } from '../../src/components/TeachingBubblePageCount/index';
import { TeachingBubbleCarousel } from '../../src/components/TeachingBubbleCarousel/index';
import { TeachingBubbleButton } from '../../src/components/TeachingBubbleButton/TeachingBubbleButton';

const ExampleContent = (index: number) => {
  return (
    <>
      <div>{`This is page: ${index}`}</div>
    </>
  );
};

export const Carousel = (props: TeachingBubbleProps) => (
  <TeachingBubble withArrow={true} {...props}>
    <TeachingBubbleTrigger>
      <Button>TeachingBubble trigger</Button>
    </TeachingBubbleTrigger>
    <TeachingBubbleSurface>
      <TeachingBubbleHeader>{'Tips'}</TeachingBubbleHeader>
      <TeachingBubbleCarousel>
        {/* Multiple TeachingBubbleBody will be wrapped by a 'TeachingBubbleCarousel'*/}
        <TeachingBubbleBody
          media={{
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg',
          }}
        >
          <TeachingBubbleTitle>{'Teaching Bubble Title'}</TeachingBubbleTitle>
          {ExampleContent(1)}
        </TeachingBubbleBody>

        {/* Multiple TeachingBubbleBody will be wrapped by a 'TeachingBubbleCarousel'*/}
        <TeachingBubbleBody
          media={{
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg',
          }}
        >
          <TeachingBubbleTitle>{'Teaching Bubble Title'}</TeachingBubbleTitle>
          {ExampleContent(2)}
        </TeachingBubbleBody>

        {/* Multiple TeachingBubbleBody will be wrapped by a 'TeachingBubbleCarousel'*/}
        <TeachingBubbleBody
          media={{
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg',
          }}
        >
          <TeachingBubbleTitle>{'Teaching Bubble Title'}</TeachingBubbleTitle>
          {ExampleContent(3)}
        </TeachingBubbleBody>
      </TeachingBubbleCarousel>
      <TeachingBubbleActions>
        {/* TeachingBubbleActions ensure that carousel & popover functionality work in sync */}
        <TeachingBubbleButton buttonType="secondary" altStepText="Close">
          {'Back'}
        </TeachingBubbleButton>
        <TeachingBubblePageCount countStyle="text">{'of'}</TeachingBubblePageCount>
        <TeachingBubbleButton buttonType="primary" altStepText="Finish">
          {'Next'}
        </TeachingBubbleButton>
      </TeachingBubbleActions>
    </TeachingBubbleSurface>
  </TeachingBubble>
);
