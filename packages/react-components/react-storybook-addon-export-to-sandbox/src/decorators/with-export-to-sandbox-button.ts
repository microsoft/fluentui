import { addDemoActionButton } from '../sandbox-factory';

import { StoryContext } from '../types';

export const withExportToSandboxButton = (
  storyFn: (context: StoryContext) => // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSX.Element,
  context: StoryContext,
) => {
  if (context.viewMode === 'docs') {
    addDemoActionButton(context);
  }

  return storyFn(context);
};
