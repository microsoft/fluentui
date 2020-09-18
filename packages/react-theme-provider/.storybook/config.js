import { addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withPerformance } from 'storybook-addon-performance';

addDecorator(withPerformance);
addDecorator(withA11y());
addParameters({
  a11y: {
    manual: true,
  },
});
