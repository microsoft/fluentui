import { useEffect } from '@storybook/addons';
import { addDemoActionButton } from '../sandbox-factory';

import { StoryContext } from '../types';

export const withExportToSandboxButton = (storyFn: (context: StoryContext) => JSX.Element, context: StoryContext) => {
  useEffect(() => {
    if (context.viewMode === 'docs') {
      addDemoActionButton(context);
    }
  }, [context]);

  return storyFn(context);
};
