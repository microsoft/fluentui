import { compose, createClassResolver } from '@fluentui/react-compose';
import { ToggleButtonBase } from './ToggleButtonBase';
import { ToggleButtonProps } from './ToggleButton.types';
import * as classes from './ToggleButton.scss';

export const ToggleButton = compose<'button', {}, {}, ToggleButtonProps, ToggleButtonProps>(ToggleButtonBase, {
  classes: createClassResolver(classes),
  displayName: 'ToggleButton',
});
