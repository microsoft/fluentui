import { configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import { addDecorator } from '@storybook/react';

addDecorator(withInfo());
addDecorator(withA11y());

const req = require.context('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  return req.keys().map(req);
}

configure(loadStories, module);
