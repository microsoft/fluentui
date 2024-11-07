import * as React from 'react';
import type { Decorator } from '@storybook/react';

export const TestWrapperDecorator: Decorator = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorTall: Decorator = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorTallFixedWidth: Decorator = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorFixedWidth: Decorator = (story, context) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story(context)}
    </div>
  </div>
);

export const TestWrapperDecoratorFullWidth: Decorator = (story, context) => (
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
