// @ts-check
import { initializeIcons } from '@uifabric/icons';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import * as React from 'react';

addDecorator(withInfo());
addDecorator(withA11y());
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
  const req = require.context('../src/PACKAGE_NAME', true, /\.Example\.tsx$/);

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, req, stories });
  });

  // convert stories Set to array
  return [...stories.values()];
}

/**
 * @param {{ key: string, stories: Map, req: (key: string) => any }} options stuff
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

    if (typeof ExampleComponent === 'function') {
      if (ExampleComponent.prototype.render) {
        // class component
        story[storyName] = () => React.createElement(ExampleComponent);
      } else {
        // function component
        story[storyName] = ExampleComponent;
      }
    }
  }
}
