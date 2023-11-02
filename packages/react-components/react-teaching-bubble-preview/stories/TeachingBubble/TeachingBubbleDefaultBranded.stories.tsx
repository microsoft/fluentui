import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { TeachingBubble } from '../../src/components/TeachingBubble/TeachingBubble';
import type { TeachingBubbleProps } from '../../src/components/TeachingBubble/index';
import { TeachingBubbleTrigger } from '../../src/components/TeachingBubbleTrigger/index';
import { TeachingBubbleSurface } from '../../src/components/TeachingBubbleSurface/index';
import { TeachingBubbleHeader } from '../../src/components/TeachingBubbleHeader/TeachingBubbleHeader';
import { TeachingBubbleBody } from '../../src/components/TeachingBubbleBody/index';
import { TeachingBubbleActions } from '../../src/components/TeachingBubbleActions/index';
import { TeachingBubbleTitle } from '../../src/components/TeachingBubbleTitle/index';
import { TeachingBubbleButton } from '../../src/components/TeachingBubbleButton/TeachingBubbleButton';

const ExampleContent = (index: number) => {
  return (
    <>
      <div>{`This is page: ${index}`}</div>
    </>
  );
};

export const DefaultBrand = (props: TeachingBubbleProps) => (
  <TeachingBubble appearance="brand" withArrow={true} {...props}>
    <TeachingBubbleTrigger>
      <Button>TeachingBubble trigger</Button>
    </TeachingBubbleTrigger>
    <TeachingBubbleSurface>
      <TeachingBubbleHeader>{'Tips'}</TeachingBubbleHeader>
      <TeachingBubbleBody
        media={{
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg',
        }}
      >
        <TeachingBubbleTitle>{'Teaching Bubble Title'}</TeachingBubbleTitle>
        {ExampleContent(1)}
      </TeachingBubbleBody>
      <TeachingBubbleActions>
        {/* TeachingBubbleActions ensure that carousel & popover functionality work in sync */}
        <TeachingBubbleButton buttonType="secondary" altStepText="Close">
          {'Learn More'}
        </TeachingBubbleButton>
        <TeachingBubbleButton buttonType="primary" altStepText="Finish">
          {'Got it'}
        </TeachingBubbleButton>
      </TeachingBubbleActions>
    </TeachingBubbleSurface>
  </TeachingBubble>
);
