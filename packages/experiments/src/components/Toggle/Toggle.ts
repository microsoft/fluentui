import * as React from 'react';
import { ToggleView } from './Toggle.view';
import { ToggleStyles as styles, ToggleTokens as tokens } from './Toggle.styles';
import { useToggleState as state } from './Toggle.state';
import { IToggleProps } from './Toggle.types';
import { createComponent } from '@uifabric/foundation';

export const Toggle: React.FunctionComponent<IToggleProps> = createComponent(ToggleView, {
  displayName: 'Toggle',
  state,
  styles,
  tokens,
});
