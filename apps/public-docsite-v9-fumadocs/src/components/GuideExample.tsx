'use client';

import * as React from 'react';
import { defineStoryFactory } from '@fumadocs/story/vite/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

const { defineStory } = defineStoryFactory();

/** Guide demos use Fumadocs Story with explicit controls; package stories keep their existing renderer. */
export function createGuideExample(Component: React.ComponentType, displayName: string): React.ComponentType {
  const Preview: ForwardRefComponent<React.ComponentProps<'div'>> = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} data-fluent-preview="">
      <FluentProvider theme={webLightTheme}>
        <Component />
      </FluentProvider>
    </div>
  ));
  Preview.displayName = `${displayName}Preview`;
  return defineStory({
    Component: Preview,
    displayName,
    args: { initial: {}, controls: { node: { type: 'object', properties: [] } } },
  }).WithControl;
}
