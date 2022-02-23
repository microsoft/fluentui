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

const mapper = { default: '', fixed: '300px', full: '100%' };

/**
 * Temporary helper to modify already decorated stories for screener DOM container
 * This should be used for all stories that use same story ID multiple times and need different decorator
 *
 * > **Why is this needed:**
 * >
 * > SB6 duplicates same story ID decorators (until we migrate to CSF format duplication problem this is a workaround)
 *
 * @example
 * ```
 // this adds first decorator
 storiesOf('SpinButton', module).addDecorator(TestWrapperDecorator)...

 // this adds another decorator to same DOM tree
 storiesOf('SpinButton', module).addDecorator(TestWrapperDecoratorFullWidth)...

 // this results having following DOM tree
 // ↓ ↓ ↓
   <TestWrapperDecoratorFullWidth>
     <TestWrapperDecorator>
       <Story/>
    </TestWrapperDecorator>
  </TestWrapperDecoratorFullWidth>
```
 */
export function modifyDeprecatedDecoratorStyles(options: {
  mode: keyof typeof mapper;
}): DecoratorFunction<ExtendedStoryFnReturnType> {
  const { mode } = options;
  return story => {
    return (
      <span
        ref={el => {
          if (!el) {
            return;
          }
          const testWrapperNode = el.querySelector('.testWrapper') as HTMLDivElement;
          testWrapperNode && (testWrapperNode.style.width = mapper[mode]);
        }}
      >
        {story()}
      </span>
    );
  };
}
