/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from 'office-ui-fabric-react';

const DivDecorator = story => (
  // Shimmer without a specified width needs a container with a fixed width or it's collapsing.
  // tslint:disable-next-line:jsx-ban-props
  <div style={{ width: '500px' }}>{story()}</div>
);

const ScreenerDecorator = story => (
  <Screener steps={new Screener.Steps().snapshot('default').end()}>{story()}</Screener>
);

const shimmerStories = {
  decorators: [DivDecorator, FabricDecorator, ScreenerDecorator],
  stories: {
    'Basic': () => <Shimmer />,
    '50% width': () => <Shimmer width={'50%'} />,
    'Circle Gap Line': () => (
      <Shimmer
        shimmerElements={[{ type: ElemType.circle }, { type: ElemType.gap, width: '2%' }, { type: ElemType.line }]}
      />
    ),
    'Custom elements': () => (
      <Shimmer
        customElementsGroup={
          <div
            // tslint:disable-next-line:jsx-ban-props
            style={{ display: 'flex' }}
          >
            <ShimmerElementsGroup
              shimmerElements={[{ type: ElemType.circle, height: 40 }, { type: ElemType.gap, width: 16, height: 40 }]}
            />
            <ShimmerElementsGroup
              flexWrap={true}
              width={'100%'}
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
    ),
    'Data not loaded': () => (
      <Shimmer isDataLoaded={false} ariaLabel={'Loading content'}>
        <div>Example content</div>
      </Shimmer>
    ),
    'Data loaded': () => (
      <Shimmer isDataLoaded={true} ariaLabel={'Loading content'}>
        <div>Example content</div>
      </Shimmer>
    )
  }
};

runStories('Shimmer', shimmerStories);
