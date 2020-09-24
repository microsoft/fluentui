import { initializeIcons } from '@uifabric/icons';
import generateStoriesFromExamples from '@uifabric/build/storybook/generateStoriesFromExamples';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withThemeProvider } from './decorators/withThemeProvider';

addDecorator(withInfo());
addDecorator(withA11y());
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(withThemeProvider);
addParameters({
  a11y: {
    manual: true,
  },
});

initializeIcons();

const req = require.context('../src', true, /\.(Example|stories)\.tsx$/);

function loadStories() {
  const stories = new Map();

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, req, stories });
  });

  // convert stories Set to array
  return [...stories.values()];
}

configure(loadStories, module);
