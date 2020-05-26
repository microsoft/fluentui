import { ButtonBase } from './ButtonBase';
import { ButtonProps } from './Button.types';
import { compose, createClassResolver } from '@fluentui/react-compose';
import * as classes from './Button.scss';

export const Button = compose<'button', ButtonProps, ButtonProps, {}, {}>(ButtonBase, {
  classes: createClassResolver(classes),
  slots: {},
  displayName: 'Button',
});
