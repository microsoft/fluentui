import { addDemoActionButton } from '../sandbox-factory';
import { StoryContext } from '../types';

export const withExportToSandboxButton = (
  // eslint-disable-line @typescript-eslint/no-deprecated
  storyFn: (context: StoryContext) => JSX.Element,
  context: StoryContext,
) => {
  if (context.viewMode === 'docs' && typeof window !== 'undefined') {
    const observer = new MutationObserver(() => {
      const toolbarContainer = document.querySelector('.docblock-controls');
      if (toolbarContainer) {
        addDemoActionButton(context);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  return storyFn(context);
};
