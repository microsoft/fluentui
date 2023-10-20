import * as React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import { ExtendedStoryFnReturnType } from './types';

export const TestWrapperDecorator: DecoratorFunction<ExtendedStoryFnReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorTall: DecoratorFunction<ExtendedStoryFnReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorTallFixedWidth: DecoratorFunction<ExtendedStoryFnReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorFixedWidth: DecoratorFunction<ExtendedStoryFnReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorFullWidth: DecoratorFunction<ExtendedStoryFnReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '100%', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);
