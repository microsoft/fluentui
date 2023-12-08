import * as React from 'react';
import { useNavGroup_unstable } from './useNavGroup';
import { renderNavGroup_unstable } from './renderNavGroup';
import type { NavGroupProps } from './NavGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavGroupStyles_unstable } from './useNavGroup.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A Nav group provides a selectable item in a Nav.
 */
export const NavGroup: ForwardRefComponent<NavGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavGroup_unstable(props, ref);

  useNavGroupStyles_unstable(state);

  // todo: add custom style hook
  // useCustomStyleHook_unstable('useNavGroupStyles')(state);

  return renderNavGroup_unstable(state);
});

NavGroup.displayName = 'NavGroup';
