/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  Shimmer,
  ShimmerElementType as ElemType,
  ShimmerElementsGroup
} from 'office-ui-fabric-react';

storiesOf('Shimmer', module)
  .addDecorator(story => (
    // Shimmer without a specified width needs a container with a fixed width or it's collapsing.
    <div style={{ width: '500px' }}>{story()}</div>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </Screener>
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
          { type: ElemType.line }
        ]}
      />
    ),
    { rtl: true }
  )
  .addStory('Custom elements', () => (
    <Shimmer
      customElementsGroup={
        <div style={{ display: 'flex' }}>
          <ShimmerElementsGroup
            shimmerElements={[
              { type: ElemType.circle, height: 40 },
              { type: ElemType.gap, width: 16, height: 40 }
            ]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width="100%"
            shimmerElements={[
              { type: ElemType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
              { type: ElemType.line, width: '90%', height: 8 },
              { type: ElemType.gap, width: '10%', height: 20 }
            ]}
          />
        </div>
      }
      width={300}
    />
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
