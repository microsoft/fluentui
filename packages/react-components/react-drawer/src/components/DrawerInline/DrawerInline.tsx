import * as React from 'react';
import { useDrawerInline_unstable } from './useDrawerInline';
import { renderDrawerInline_unstable } from './renderDrawerInline';
import { useDrawerInlineStyles_unstable } from './useDrawerInlineStyles.styles';
import type { DrawerInlineProps } from './DrawerInline.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DrawerInline is often used for navigation that is not dismissible. As it is on the same level as
 * the main surface, users can still interact with other UI elements.
 */
export const DrawerInline: ForwardRefComponent<DrawerInlineProps> = React.forwardRef((props, ref) => {
  const state = useDrawerInline_unstable(props, ref);

  useDrawerInlineStyles_unstable(state);
  return renderDrawerInline_unstable(state);
});

DrawerInline.displayName = 'DrawerInline';
