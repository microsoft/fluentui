import type { JSXElement } from '@fluentui/react-utilities';

import { addDemoActionButton } from '../sandbox-factory';
import type { StoryContext } from '../types';

/**
 * Decorator to add "Export to Sandbox" button in Storybook Docs view
 *
 * @param storyFn - original story function
 * @param context - story context
 * @returns - decorated story
 */
export const withExportToSandboxButton = (storyFn: (context: StoryContext) => JSXElement, context: StoryContext) => {
  if (context.viewMode === 'docs') {
    addDemoActionButton(context);
  }

  return storyFn(context);
};
