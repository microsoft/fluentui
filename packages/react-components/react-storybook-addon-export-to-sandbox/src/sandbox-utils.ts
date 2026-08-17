import dedent from 'dedent';

import { getDependencies } from './getDependencies';
import type { Data } from './public-types';
import type { StoryContext, ParametersExtension } from './types';

type ParametersConfig = NonNullable<ParametersExtension['exportToSandbox']>;

export type { Data };

/**
 * Uses the form's own document rather than an ambient global, so this works in any
 * host document (iframe, popup, test harness) — see repo rule #3.
 */
export function addHiddenInput(form: HTMLFormElement, name: string, value: string) {
  const input = form.ownerDocument.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

export function prepareSandboxContainers(context: StoryContext) {
  // Support anchor ID formats for our Storybook major versions range.
  // 10< `#anchor--{id}`
  // >=10 `#anchor--primary--{id}`
  // See: https://github.com/storybookjs/storybook/pull/33384
  const docsSelector = `#anchor--${context.id} .docs-story, #anchor--primary--${context.id} .docs-story`;
  const rootElements = document.querySelectorAll(docsSelector);

  if (!rootElements.length) {
    throw new Error(`css selector: ${docsSelector}, doesn't exist `);
  }

  return Array.from(rootElements).map(rootElement => {
    const showCodeButton = rootElement.querySelector(
      '.docblock-code-toggle:not(.with-code-sandbox-button):not(.with-open-in-new-tab-button)',
    );
    const container = showCodeButton?.parentElement;

    if (!container) {
      throw new Error(`css selector: '.docblock-code-toggle', doesn't exist `);
    }

    const classList = (showCodeButton.classList.value + ' with-code-sandbox-button').split(' ');

    // remove buttons if they already existed
    const ourButtons = container.querySelectorAll(`.with-code-sandbox-button, .with-open-in-new-tab-button`);
    ourButtons.forEach(node => node.remove());

    return {
      container,
      cssClasses: classList,
    };
  });
}

const addonConfigDefaults = { requiredDependencies: {}, optionalDependencies: {}, devDependencies: {} };

export function prepareData(context: StoryContext): Data | null {
  if (!context.parameters.exportToSandbox) {
    throw new Error('exportToSandbox config parameter cannot be empty');
  }

  const addonConfig: ParametersConfig & typeof addonConfigDefaults = {
    ...addonConfigDefaults,
    ...context.parameters.exportToSandbox,
  };
  const { provider, bundler } = addonConfig;
  const storyFile = context.parameters?.fullSource;

  if (!storyFile) {
    console.error(
      dedent`Export to Sandbox Addon: Couldn't find source for story ${context.title}. Did you install the babel plugin?`,
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

  const demoData: Data = {
    storyFile,
    storyExportToken,
    provider,
    bundler,
    dependencies,
    title,
    description,
    requiredDependencies: addonConfig.requiredDependencies,
    optionalDependencies: addonConfig.optionalDependencies,
    devDependencies: addonConfig.devDependencies,
    transformFiles: addonConfig.transformFiles,
    cssModuleSources: context.parameters.cssModuleSources,
  };

  return demoData;
}
