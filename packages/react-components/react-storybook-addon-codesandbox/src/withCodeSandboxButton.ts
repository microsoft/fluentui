import { StoryContext, useEffect } from '@storybook/addons';
import { getParameters } from 'codesandbox-import-utils/lib/api/define';
import * as dedent from 'dedent';
import { getDependencies } from './getDepdencies';
import type { PackageDependencies } from './getDepdencies';

export const withCodeSandboxButton = (storyFn: (context: StoryContext) => JSX.Element, context: StoryContext) => {
  useEffect(() => {
    if (context.viewMode === 'docs') {
      displayToolState(`#anchor--${context.id} .docs-story`, context);
    }
  }, [context]);

  return storyFn(context);
};

const displayToolState = (selector: string, context: StoryContext) => {
  const exportLink = document.createElement('a');
  exportLink.className = 'with-code-sandbox-button';
  exportLink.style.setProperty('position', 'absolute');
  exportLink.style.setProperty('bottom', '0');
  exportLink.style.setProperty('right', '90px');
  exportLink.style.setProperty('border', '1px solid rgba(0,0,0,.1)');
  exportLink.style.setProperty('border-bottom', 'none');
  exportLink.style.setProperty('border-radius', '4px 4px 0 0');
  exportLink.style.setProperty('padding', '4px 10px');
  exportLink.style.setProperty('background', 'white');
  exportLink.style.setProperty(
    'font-family',
    '"Nunito Sans",".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
  );
  exportLink.style.setProperty('font-weight', '700');
  exportLink.style.setProperty('font-size', '12px');
  exportLink.style.setProperty('text-decoration', 'none');
  exportLink.style.setProperty('line-height', '16px');
  exportLink.setAttribute('target', '_blank');

  // set to error state by default, overwritten later
  exportLink.style.setProperty('color', 'darkred');
  exportLink.innerText = `CodeSandbox Error: See console`;

  const rootElement = document.querySelector(selector);
  rootElement?.appendChild(exportLink);

  const storyFile = context.parameters?.fullSource;

  if (!storyFile) {
    console.error(
      `Export to CodeSandbox: Couldn’t find source for story ${context.story}. Did you install the babel plugin?`,
    );
    return false;
  }

  const requiredDependencies: PackageDependencies = context.parameters?.exportToCodeSandbox?.requiredDependencies ?? {};
  const optionalDependencies: PackageDependencies = context.parameters?.exportToCodeSandbox?.optionalDependencies ?? {};

  const dependencies = getDependencies(storyFile, requiredDependencies, optionalDependencies);

  const indexTsx = context.parameters?.exportToCodeSandbox?.indexTsx;
  if (indexTsx === null) {
    console.error(
      dedent`Export to CodeSandbox: Please set parameters.exportToCodeSandbox.indexTsx
             to the desired content of index.tsx file.`,
    );
    return false;
  }
  console.log(context);

  const defaultFileToPreview = encodeURIComponent('/example.tsx');
  const codeSandboxParameters = getParameters({
    files: {
      'example.tsx': {
        isBinary: false,
        content: storyFile,
      },
      'index.html': {
        isBinary: false,
        content: '<div id="root"></div>',
      },
      'index.tsx': {
        isBinary: false,
        // use originalStoryFn because users can override the `storyName` property.
        // We need the name of the exported function, not the actual story
        // https://github.com/microsoft/fluentui-storybook-addons/issues/12
        // originalStoryFn.name someties looks like this: ProgressBarDefault_stories_Default
        // just get the "Default"
        content: indexTsx.replace('STORY_NAME', context.originalStoryFn.name.split('_stories_').slice(-1).pop()),
      },
      'package.json': {
        isBinary: false,
        content: JSON.stringify({ dependencies }),
      },
    },
  });

  exportLink.setAttribute(
    'href',
    `https://codesandbox.io/api/v1/sandboxes/define?parameters=${codeSandboxParameters}&query=file%3D${defaultFileToPreview}`,
  );
  exportLink.style.setProperty('color', '#333333');
  exportLink.innerText = `Open in CodeSandbox`;
};
