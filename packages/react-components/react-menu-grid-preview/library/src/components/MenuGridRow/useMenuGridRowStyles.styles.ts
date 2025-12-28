'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses, makeResetStyles } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import type { MenuGridRowSlots, MenuGridRowState } from './MenuGridRow.types';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

export const menuGridRowClassNames: SlotClassNames<MenuGridRowSlots> = {
  root: 'fui-MenuGridRow',
};

// Base styles similar to regular menu item
// Right now ecludes icon color, hover active style for secondary text
const useRootBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
  position: 'relative',
  color: tokens.colorNeutralForeground2,
  backgroundColor: tokens.colorNeutralBackground1,
  padding: `${tokens.spacingVerticalXS} ${tokens.spacingVerticalSNudge}`,
  boxSizing: 'border-box',
  maxWidth: '290px',
  minHeight: '32px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'start',
  fontSize: tokens.fontSizeBase300,
  cursor: 'pointer',
  gap: '4px',
  userSelect: 'none',
  ...createFocusOutlineStyle(),

  ':hover': {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    color: tokens.colorNeutralForeground2Hover,

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },

  ':hover:active': {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    color: tokens.colorNeutralForeground2Pressed,
  },

  // High contrast styles
  '@media (forced-colors: active)': {
    ':hover': {
      backgroundColor: 'Canvas',
      borderColor: 'Highlight',
      color: 'Highlight',
    },
    ...createFocusOutlineStyle({ style: { outlineColor: 'Highlight' } }),
  },
});

export const useMenuGridRowStyles_unstable = (state: MenuGridRowState): MenuGridRowState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(menuGridRowClassNames.root, rootBaseStyles, state.root.className);

  return state;
};
