import { /* StoryContext, */ useEffect } from '@storybook/addons';
import { addActionButton } from './sandbox-factory';

import { prepareData, prepareSandboxContainer } from './sandbox-utils';
import { StoryContext } from './types';

export const withCodeSandboxButton = (storyFn: (context: StoryContext) => JSX.Element, context: StoryContext) => {
  useEffect(() => {
    if (context.viewMode === 'docs') {
      addDemoActionButton(context);
    }
  }, [context]);

  return storyFn(context);
};

function addDemoActionButton(context: StoryContext) {
  const { container, cssClasses } = prepareSandboxContainer(context);
  const config = prepareData(context);
  if (!config) {
    throw new Error('issues with data');
  }

  addActionButton(container, config, cssClasses);
}
