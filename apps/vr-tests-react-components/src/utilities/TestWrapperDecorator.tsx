import * as React from 'react';
import type { DecoratorFn } from '@storybook/react';

export const TestWrapperDecorator: DecoratorFn = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorTall: DecoratorFn = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorTallFixedWidth: DecoratorFn = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorFixedWidth: DecoratorFn = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const TestWrapperDecoratorFullWidth: DecoratorFn = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '100%', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);
