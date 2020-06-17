import { initializeIcons } from '@uifabric/icons';
import generateStoriesFromExamples from '@uifabric/build/storybook/generateStoriesFromExamples';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withPerformance } from 'storybook-addon-performance';
import { withKnobs } from '@storybook/addon-knobs';
import { withThemeProvider } from './decorators/withThemeProvider';

addDecorator(withA11y());
addDecorator(withPerformance);
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(withThemeProvider);
addParameters({
  a11y: {
    manual: true,
  },
});

initializeIcons();

const req = require.context('../src/components', true, /\.Example\.tsx$/);

function loadStories() {
  const stories = new Map();

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, req, stories });
  });

  // Wrap examples with ThemeProvider
  for (let [key, story] of stories) {
    Object.keys(story).forEach(exampleName => {
      const example = story[exampleName];
      if (typeof example === 'function') {
        story[exampleName] = () => example();
      }
    });
  }

  // convert stories Set to array
  return [...stories.values()];
}

configure(loadStories, module);
