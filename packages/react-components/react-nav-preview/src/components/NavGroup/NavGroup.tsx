import * as React from 'react';
import { useNavGroup } from './useNavGroup';
import { renderNavGroup } from './renderNavGroup';
import type { NavGroupProps } from './NavGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavGroupStyles } from './useNavGroup.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A tab provides a selectable item in a tab list.
 */
export const NavGroup: ForwardRefComponent<NavGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavGroup(props, ref);

  useNavGroupStyles(state);

  // todo: add custom style hook
  // useCustomStyleHook_unstable('useNavGroupStyles')(state);

  return renderNavGroup(state);
});

NavGroup.displayName = 'NavGroup';
