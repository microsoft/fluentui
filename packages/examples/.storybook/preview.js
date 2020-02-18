// import fs from 'fs';
// import path from 'path';
import { initializeIcons } from '@uifabric/icons';
import generateStoriesFromExamples from '@uifabric/build/storybook/generateStoriesFromExamples';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withInfo());
addDecorator(withA11y());
addParameters({
  a11y: {
    manual: true
  }
});

initializeIcons();

// const packageName = path.basename(process.cwd());
// if (!fs.existsSync(path.join(__dirname, '../src', packageName))) {
//   console.error(`Package ${packageName} does not have examples!`);
//   process.exit(1);
// }

// const req = require.context('../src/' + packageName, true, /\.Example\.tsx$/);
const req = require.context('../src', true, /\.Example\.tsx$/);

function loadStories() {
  const stories = new Map();

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, req, stories });
  });

  // convert stories Set to array
  return [...stories.values()];
}

configure(loadStories, module);
