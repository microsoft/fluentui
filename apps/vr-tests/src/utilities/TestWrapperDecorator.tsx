import * as React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import { ExtendedStoryFnReturnType } from './types';

/**
 * Generate a decorator for adding a `.testWrapper` div with custom styles.
 */
export function getTestWrapperDecorator(
  style: React.CSSProperties,
): DecoratorFunction<ExtendedStoryFnReturnType> {
  return story => (
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={style}>
        {story()}
      </div>
    </div>
  );
}

/**
 * Adds a `.testWrapper` div which shrinks to fit the content and hides overflow.
 */
export const TestWrapperDecorator = getTestWrapperDecorator({
  padding: '10px',
  overflow: 'hidden',
});

/**
 * Adds a `.testWrapper` div which shrinks to fit the content and has 120px extra bottom+right
 * padding to accomodate flyouts. This is NOT TestWrapper-specific.
 */
export const TestWrapperDecoratorTall = getTestWrapperDecorator({ padding: '10px 10px 120px' });

/**
 * Adds a `.testWrapper` div which has 300px fixed width and 120px extra bottom+right padding
 * to accomodate flyouts.
 */
export const TestWrapperDecoratorTallFixedWidth = getTestWrapperDecorator({
  padding: '10px 10px 120px',
  width: '300px',
});

/**
 * Adds a `.testWrapper` div which has 300px fixed width.
 */
export const TestWrapperDecoratorFixedWidth = getTestWrapperDecorator({
  padding: '10px',
  width: '300px',
});

/**
 * Adds a `.testWrapper` div which has width 100%.
 */
export const TestWrapperDecoratorFullWidth = getTestWrapperDecorator({
  padding: '10px',
  width: '100%',
  overflow: 'hidden',
});

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
          testWrapperNode.style.width = mapper[mode];
        }}
      >
        {story()}
      </span>
    );
  };
}
