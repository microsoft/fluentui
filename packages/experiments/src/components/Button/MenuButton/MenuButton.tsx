import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useMenuButtonState as state } from './MenuButton.state';
import { MenuButtonStyles as styles, MenuButtonTokens as tokens } from './MenuButton.styles';
import { IMenuButtonProps } from './MenuButton.types';
import { MenuButtonSlots as slots, MenuButtonView as view } from './MenuButton.view';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const MenuButton: React.FunctionComponent<IMenuButtonProps> = composed({
  displayName: 'MenuButton',
  slots,
  state,
  styles,
  tokens,
  view,
});

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export default MenuButton;
