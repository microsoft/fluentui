import type { JSXElement } from '@fluentui/react-utilities';

import { addDemoActionButton } from '../sandbox-factory';
import type { StoryContext } from '../types';

export const withExportToSandboxButton = (storyFn: (context: StoryContext) => JSXElement, context: StoryContext) => {
  if (context.viewMode === 'docs') {
    addDemoActionButton(context);
  }

  return storyFn(context);
};
