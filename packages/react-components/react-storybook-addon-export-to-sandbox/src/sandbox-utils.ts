import * as dedent from 'dedent';

import { getDependencies } from './getDependencies';
import { StoryContext, ParametersExtension } from './types';

type ParametersConfig = NonNullable<ParametersExtension['exportToSandbox']>;

export function addHiddenInput(form: HTMLFormElement, name: string, value: string) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

export function prepareSandboxContainer(context: StoryContext) {
  const docsSelector = `#anchor--${context.id} .docs-story`;
  const rootElement = document.querySelector(docsSelector);

  if (!rootElement) {
    throw new Error(`css selector: ${docsSelector}, doesn't exist `);
  }

  const showCodeButton = rootElement.querySelector('.docblock-code-toggle');
  const container = showCodeButton?.parentElement;

  if (!container) {
    throw new Error(`css selector: '.docblock-code-toggle', doesn't exist `);
  }

  const classList = (showCodeButton.classList.value + ' with-code-sandbox-button').split(' ');

  // remove button if it already existed
  const ourButtons = container.querySelectorAll(`.with-code-sandbox-button`);
  ourButtons.forEach(node => node.remove());

  return {
    container,
    cssClasses: classList,
  };
}

const addonConfigDefaults = { requiredDependencies: {}, optionalDependencies: {} };
export type Data = Pick<Required<ParametersConfig>, 'provider' | 'bundler'> & {
  storyFile: string;
  // use originalStoryFn because users can override the `storyName` property.
  // We need the name of the exported function, not the actual story
  // https://github.com/microsoft/fluentui-storybook-addons/issues/12
  // originalStoryFn.name someties looks like this: ProgressBarDefault_stories_Default
  // just get the "Default"
  // @TODO - im not sure this is still needed, wasn't able to repro. Can we remove it ?
  storyExportToken: string;
  dependencies: Record<string, string>;
  title: string;
  description: string;
};

export function prepareData(context: StoryContext): Data | null {
  if (!context.parameters.exportToSandbox) {
    throw new Error('exportToSandbox config parameter cannot be empty');
  }

  const addonConfig: Required<ParametersConfig> = {
    ...addonConfigDefaults,
    ...context.parameters.exportToSandbox,
  };
  const { provider, bundler } = addonConfig;
  const storyFile = context.parameters?.fullSource;

  if (!storyFile) {
    console.error(
      dedent`Export to Sandbox Addon: Couldn't find source for story ${context.story}. Did you install the babel plugin?`,
    );
    return null;
  }

  const { requiredDependencies, optionalDependencies } = addonConfig;
  const dependencies = getDependencies(storyFile, requiredDependencies, optionalDependencies);

  const title = 'FluentUI React v9';
  const description = `Story demo: ${context.title} - ${context.name}`;

  // use originalStoryFn because users can override the `storyName` property.
  // We need the name of the exported function, not the actual story
  // https://github.com/microsoft/fluentui-storybook-addons/issues/12
  // originalStoryFn.name someties looks like this: ProgressBarDefault_stories_Default
  // just get the "Default"
  // @TODO - im not sure this is still needed, wasn't able to repro. Can we remove it ?
  const storyExportToken = context.originalStoryFn.name.split('_stories_').slice(-1).pop();
  if (!storyExportToken) {
    throw new Error('issues processing story export token');
  }

  const demoData = {
    storyFile,
    storyExportToken,
    provider,
    bundler,
    dependencies,
    title,
    description,
  };

  return demoData;
}
