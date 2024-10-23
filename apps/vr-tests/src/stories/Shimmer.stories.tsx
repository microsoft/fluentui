import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';

import { getStoryVariant, RTL, StoryWrightDecorator } from '../utilities';

const wrapperClassName = mergeStyles({
  width: 400,
  height: 100,
  margin: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#0078D4',
  outline: `1px solid #333333`,
  outlineOffset: '-10px',
});

export default {
  title: 'Shimmer',
  decorators: [
    (story, context) => (
      <div style={{ display: 'flex' }}>
        <div
          className="testWrapper"
          style={{ padding: '10px', overflow: 'hidden', width: '500px' }}
        >
          {story(context)}
        </div>
      </div>
    ),
    StoryWrightDecorator(new Steps().snapshot('default').end()),
  ],
} satisfies Meta<typeof Shimmer>;

export const Basic = () => <Shimmer />;
export const _50Width = () => <Shimmer width="50%" />;

_50Width.storyName = '50% width';

export const CircleGapLine = () => (
  <Shimmer
    shimmerElements={[
      { type: ElemType.circle },
      { type: ElemType.gap, width: '2%' },
      { type: ElemType.line },
    ]}
  />
);

export const CircleGapLineRTL = getStoryVariant(CircleGapLine, RTL);

export const CustomElements = () => (
  <Shimmer
    customElementsGroup={
      <div style={{ display: 'flex' }}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ElemType.circle, height: 40 },
            { type: ElemType.gap, width: 16, height: 40 },
          ]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          width="100%"
          shimmerElements={[
            { type: ElemType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
            { type: ElemType.line, width: '90%', height: 8 },
            { type: ElemType.gap, width: '10%', height: 20 },
          ]}
        />
      </div>
    }
    width={300}
  />
);

CustomElements.storyName = 'Custom elements';

export const CustomElementsOnThemedBackground = () => (
  <div className={wrapperClassName}>
    <Shimmer
      width={300}
      shimmerColors={{
        shimmer: '#71afe5',
        shimmerWave: '#2b88d8',
      }}
      customElementsGroup={
        <div style={{ display: 'flex' }}>
          <ShimmerElementsGroup
            backgroundColor={'#0078D4'}
            shimmerElements={[
              { type: ElemType.circle, height: 40 },
              { type: ElemType.gap, width: 16, height: 40 },
            ]}
          />
          <ShimmerElementsGroup
            backgroundColor={'#0078D4'}
            flexWrap={true}
            width="100%"
            shimmerElements={[
              { type: ElemType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
              { type: ElemType.line, width: '90%', height: 8 },
              { type: ElemType.gap, width: '10%', height: 20 },
            ]}
          />
        </div>
      }
    />
  </div>
);

CustomElementsOnThemedBackground.storyName = 'Custom elements on themed background';

export const DataNotLoaded = () => (
  <Shimmer isDataLoaded={false} ariaLabel={'Loading content'}>
    <div>Example content</div>
  </Shimmer>
);

DataNotLoaded.storyName = 'Data not loaded';

export const DataLoaded = () => (
  <Shimmer isDataLoaded={true} ariaLabel={'Loading content'}>
    <div>Example content</div>
  </Shimmer>
);

DataLoaded.storyName = 'Data loaded';
