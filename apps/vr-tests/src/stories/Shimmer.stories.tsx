import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';

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

storiesOf('Shimmer', module)
  .addDecorator(story => (
    // Shimmer without a specified width needs a container with a fixed width or it's collapsing.
    <div style={{ width: '500px' }}>{story()}</div>
  ))
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Basic', () => <Shimmer />)
  .addStory('50% width', () => <Shimmer width="50%" />)
  .addStory(
    'Circle Gap Line',
    () => (
      <Shimmer
        shimmerElements={[
          { type: ElemType.circle },
          { type: ElemType.gap, width: '2%' },
          { type: ElemType.line },
        ]}
      />
    ),
    { includeRtl: true },
  )
  .addStory('Custom elements', () => (
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
  ))
  .addStory('Custom elements on themed background', () => (
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
  ))
  .addStory('Data not loaded', () => (
    <Shimmer isDataLoaded={false} ariaLabel={'Loading content'}>
      <div>Example content</div>
    </Shimmer>
  ))
  .addStory('Data loaded', () => (
    <Shimmer isDataLoaded={true} ariaLabel={'Loading content'}>
      <div>Example content</div>
    </Shimmer>
  ));
