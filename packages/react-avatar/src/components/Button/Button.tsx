import { ButtonBase } from './Button.base';
import { compose, extractFromSass } from '../utils/compose';
import * as classes from './Button.scss';

export const Button = compose(ButtonBase, {
  ...extractFromSass(classes),
  slots: {
    icon: 'div',
  },
  statics: {
    displayName: 'Button',
  },
});
