import { ButtonBase } from './ButtonBase';
import { compose, createClassResolver } from '@fluentui/react-compose';
import * as classes from './Button.scss';
import { ButtonProps } from './Button.types';

export const Button = compose<'button', {}, {}, ButtonProps, ButtonProps>(ButtonBase, {
  classes: createClassResolver(classes),
  displayName: 'Button',
});
