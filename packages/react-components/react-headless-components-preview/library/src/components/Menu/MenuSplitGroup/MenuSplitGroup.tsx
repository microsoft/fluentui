'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuSplitGroup } from './useMenuSplitGroup';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import type { MenuSplitGroupProps } from '@fluentui/react-menu';

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  // useIsInMenuSplitGroup compares the provided value against the module-level default BY IDENTITY,
  // so supplying a contexts argument is what lets a descendant tell it is inside a split group. The
  // memo keeps that identity stable across renders; setMultiline stays the documented no-op.
  const contexts = React.useMemo(
    () => ({ menuSplitGroup: { setMultiline: state.setMultiline } }),
    [state.setMultiline],
  );

  return renderMenuSplitGroup(state, contexts);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
