import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import type { DrawerInlineProps } from './DrawerInline.types';
import { useDrawerInline_unstable } from './useDrawerInline';
import { renderDrawerInline_unstable } from './renderDrawerInline';
import { useDrawerInlineStyles_unstable } from './useDrawerInlineStyles.styles';

/**
 * DrawerInline is often used for navigation that is not dismissible. As it is on the same level as
 * the main surface, users can still interact with other UI elements.
 */
export const DrawerInline: ForwardRefComponent<DrawerInlineProps> = React.forwardRef((props, ref) => {
  const state = useDrawerInline_unstable(props, ref);

  useDrawerInlineStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerInlineStyles_unstable')(state);

  return renderDrawerInline_unstable(state);
});

DrawerInline.displayName = 'DrawerInline';
