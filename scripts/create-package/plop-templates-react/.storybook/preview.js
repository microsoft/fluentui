import generateStoriesFromExamples from '@uifabric/build/storybook/generateStoriesFromExamples';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withPerformance } from 'storybook-addon-performance';
import { withThemeProvider, withStrictMode } from '@fluentui/storybook';

addDecorator(withPerformance);
addDecorator(withInfo());
addDecorator(withA11y());
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(withThemeProvider);
addDecorator(withStrictMode);
addParameters({
  a11y: {
    manual: true,
  },
});

const req = require.context('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  const stories = new Map();

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, req, stories });
  });

  // convert stories Set to array
  return [...stories.values()];
}

configure(loadStories, module);
