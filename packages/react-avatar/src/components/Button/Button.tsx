import { ButtonBase } from './Button.base';
import { extractFromSass } from '../utils/compose';
import { compose } from '@fluentui/react-compose';
import * as classes from './Button.scss';
import { ButtonProps } from './Button.types';

export const Button = compose<'button', {}, {}, ButtonProps, ButtonProps>(ButtonBase, {
  ...extractFromSass(classes),
  slots: {
    icon: 'div',
  },
  displayName: 'Button',
});
