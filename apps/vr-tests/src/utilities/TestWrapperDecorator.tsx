import * as React from 'react';
import type { DecoratorFn } from '@storybook/react';

export const TestWrapperDecorator: DecoratorFn = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorTall: DecoratorFn = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorTallFixedWidth: DecoratorFn = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorFixedWidth: DecoratorFn = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div id="testWrapper" className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorFullWidth: DecoratorFn = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div
      className="testWrapper"
      style={{
        padding: '10px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {story(context)}
    </div>
  </div>
);
