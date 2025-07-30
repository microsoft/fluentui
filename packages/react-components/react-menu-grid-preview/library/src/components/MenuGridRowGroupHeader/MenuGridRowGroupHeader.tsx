import * as React from 'react';
import { useMenuGridRowGroupHeader_unstable } from './useMenuGridRowGroupHeader';
import { renderMenuGridRowGroupHeader_unstable } from './renderMenuGridRowGroupHeader';
import type { MenuGridRowGroupHeaderProps } from './MenuGridRowGroupHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridRowGroupHeaderStyles_unstable } from './useMenuGridRowGroupHeaderStyles.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridRowGroupHeader, using the `useMenuGridRowGroupHeader_unstable` hook.
 */
export const MenuGridRowGroupHeader: ForwardRefComponent<MenuGridRowGroupHeaderProps> = React.forwardRef(
  (props, ref) => {
    const state = useMenuGridRowGroupHeader_unstable(props, ref);

    useMenuGridRowGroupHeaderStyles_unstable(state);

    // useCustomStyleHook_unstable('useMenuGridRowGroupHeaderStyles_unstable')(state);

    return renderMenuGridRowGroupHeader_unstable(state);
  },
);

MenuGridRowGroupHeader.displayName = 'MenuGroup';
