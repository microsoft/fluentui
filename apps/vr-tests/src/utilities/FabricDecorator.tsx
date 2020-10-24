import * as React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

export const FabricDecorator: DecoratorFunction<StoryFnReactReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorTall: DecoratorFunction<StoryFnReactReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorTallFixedWidth: DecoratorFunction<StoryFnReactReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorFixedWidth: DecoratorFunction<StoryFnReactReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorFullWidth: DecoratorFunction<StoryFnReactReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '100%', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);
