// @ts-check
import * as React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withPerformance } from 'storybook-addon-performance';
import { withCompatKeytipLayer, withStrictMode, withThemeProvider } from '@fluentui/storybook';

addDecorator(withPerformance);
addDecorator(withInfo());
addDecorator(withA11y());
addDecorator(withKnobs({ escapeHTML: false }));
if (['react-button', 'react-cards'].includes('PACKAGE_NAME')) {
  addDecorator(withThemeProvider);
  addDecorator(withStrictMode);
}
if (['office-ui-fabric-react'].includes('PACKAGE_NAME')) {
  addDecorator(withCompatKeytipLayer);
}
addParameters({
  a11y: {
    manual: true,
  },
});

initializeIcons();

configure(loadStories, module);

function loadStories() {
  const stories = new Map();

  // This will be updated by preview-loader with the actual current package name
  const req = require.context('../src/PACKAGE_NAME', true, /\.(Example|stories)\.tsx$/);

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, stories, req });
  });

  // convert stories Set to array
  return [...stories.values()];
}

/**
 * @param {{ key: string, stories: Map, req: (key: string) => any }} options
 */
function generateStoriesFromExamples({ key, stories, req }) {
  const nameMatcher = /\.\/([^/]+)\//;
  const matches = key.match(nameMatcher);
  if (!matches) {
    return;
  }

  const componentName = matches[1];

  if (!stories.has(componentName)) {
    stories.set(componentName, {
      default: {
        title: componentName,
      },
    });
  }

  const storyName = key
    .substr(key.lastIndexOf('/') + 1)
    .replace('.tsx', '')
    .replace(/\./g, '_');

  const story = stories.get(componentName);
  const exampleModule = req(key);

  for (let moduleExport of Object.keys(exampleModule)) {
    const ExampleComponent = exampleModule[moduleExport];
    const subStoryName = moduleExport || storyName;

    if (typeof ExampleComponent === 'function') {
      if (ExampleComponent.prototype.render) {
        // class component
        story[subStoryName] = () => React.createElement(ExampleComponent);
      } else {
        // function component
        story[subStoryName] = ExampleComponent;
      }
    }
  }
}
