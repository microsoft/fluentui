import React from 'react';

import { configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// import { withA11y } from '@storybook/addon-a11y';
import { addDecorator } from '@storybook/react';

addDecorator(withInfo());

// a11y addon has some perf issues, and we need to carefully evaluate its use before adopting it
// addDecorator(withA11y());

const req = require.context('../src/components', true, /\.Example\.tsx$/);

function isFunctionalComponent(Component) {
  return !Component.prototype.render;
}

function loadStories() {
  const stories = new Map();
  const nameMatcher = /\.\/([^/]+)\//;

  req.keys().forEach(key => {
    const matches = key.match(nameMatcher);

    if (matches) {
      const componentName = matches[1];

      if (!stories.has(componentName)) {
        stories.set(componentName, {
          default: {
            title: componentName
          }
        });
      }

      const storyName = key
        .substr(key.lastIndexOf('/') + 1)
        .replace('.tsx', '')
        .replace(/\./g, '_');

      const story = stories.get(componentName);
      const componentModule = req(key);

      for (let moduleExport of Object.keys(componentModule)) {
        const component = componentModule[moduleExport];

        if (typeof component === 'function') {
          if (!isFunctionalComponent(component)) {
            story[storyName] = () => React.createElement(component);
          } else {
            story[storyName] = component;
          }
        }
      }
    }
  });

  let s = [...stories.values()];

  return s;
}

configure(loadStories, module);
