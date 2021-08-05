import * as React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

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

const mapper = { default: '', fixed: '300px', full: '100%' };

/**
 *
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
 storiesOf('SpinButton', module).addDecorator(FabricDecorator)...

 // this adds another decorator to same DOM tree
 storiesOf('SpinButton', module).addDecorator(FabricDecoratorFullWidth)...

 // this results having following DOM tree
 // ↓ ↓ ↓
   <FabricDecoratorFullWidth>
     <FabricDecorator>
       <Story/>
    </FabricDecorator>
  </FabricDecoratorFullWidth>
```
 */
export function modifyDeprecatedDecoratorStyles(options: {
  mode: keyof typeof mapper;
}): DecoratorFunction<StoryFnReactReturnType> {
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
