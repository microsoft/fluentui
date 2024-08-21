import { mergeClasses, makeStyles, makeResetStyles } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  content: 'fui-MenuItem__content',
  secondaryContent: 'fui-MenuItem__secondaryContent',
};

const useRootBaseStyles = makeResetStyles({
  borderRadius: `var(--1307, var(--1308, ${tokens.borderRadiusMedium}))`,
  position: 'relative',
  color: `var(--1309, var(--1310, ${tokens.colorNeutralForeground2}))`,
  backgroundColor: `var(--1311, var(--1312, ${tokens.colorNeutralBackground1}))`,
  paddingRight: `var(--1313, var(--1314, ${tokens.spacingVerticalSNudge}))`, // 6px
  paddingLeft: `var(--1315, var(--1316, ${tokens.spacingVerticalSNudge}))`,
  paddingTop: `var(--1317, var(--1318, ${tokens.spacingVerticalSNudge}))`,
  paddingBottom: `var(--1319, var(--1320, ${tokens.spacingVerticalSNudge}))`,
  boxSizing: 'border-box',
  maxWidth: '290px',
  minHeight: '32px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'start',
  fontSize: `var(--1321, var(--1322, ${tokens.fontSizeBase300}))`,
  cursor: 'pointer',
  gap: '4px',

  ':hover': {
    backgroundColor: `var(--1323, var(--1324, ${tokens.colorNeutralBackground1Hover}))`,
    color: `var(--1325, var(--1326, ${tokens.colorNeutralForeground2Hover}))`,

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
    [`& .${menuItemClassNames.icon}`]: {
      color: `var(--1327, var(--1328, ${tokens.colorNeutralForeground2BrandSelected}))`,
    },
  },

  ':hover:active': {
    backgroundColor: `var(--1329, var(--1330, ${tokens.colorNeutralBackground1Pressed}))`,
    color: `var(--1331, var(--1332, ${tokens.colorNeutralForeground2Pressed}))`,
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

  userSelect: 'none',
  ...createFocusOutlineStyle(),
});

const useContentBaseStyles = makeResetStyles({
  paddingLeft: '2px',
  paddingRight: '2px',
  backgroundColor: 'transparent',
  flexGrow: 1,
});

const useSecondaryContentBaseStyles = makeResetStyles({
  paddingLeft: '2px',
  paddingRight: '2px',
  ...typographyStyles.caption1,
  lineHeight: `var(--1333, var(--1334, ${tokens.lineHeightBase300}))`,
  color: `var(--1335, var(--1336, ${tokens.colorNeutralForeground3}))`,
  ':hover': {
    color: `var(--1337, var(--1338, ${tokens.colorNeutralForeground3Hover}))`,
  },
  ':focus': {
    color: `var(--1339, var(--1340, ${tokens.colorNeutralForeground3Hover}))`,
  },
});

const useIconBaseStyles = makeResetStyles({
  width: '20px',
  height: '20px',
  fontSize: '20px',
  lineHeight: 0,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
});

const useSubmenuIndicatorBaseStyles = makeResetStyles({
  width: '20px',
  height: '20px',
  fontSize: '20px',
  lineHeight: 0,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
});

const useStyles = makeStyles({
  checkmark: {
    marginTop: '2px',
  },

  splitItemMain: {
    flexGrow: 1,
  },

  splitItemTrigger: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 0,
    '::before': {
      content: '""',
      width: `var(--1341, var(--1342, ${tokens.strokeWidthThin}))`,
      height: '24px',
      backgroundColor: `var(--1343, var(--1344, ${tokens.colorNeutralStroke1}))`,
    },
  },
  disabled: {
    color: `var(--1345, var(--1346, ${tokens.colorNeutralForegroundDisabled}))`,
    ':hover': {
      color: `var(--1347, var(--1348, ${tokens.colorNeutralForegroundDisabled}))`,
      backgroundColor: `var(--1349, var(--1350, ${tokens.colorNeutralBackground1}))`,
      cursor: 'not-allowed',
      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${menuItemClassNames.icon}`]: {
        color: `var(--1351, var(--1352, ${tokens.colorNeutralForegroundDisabled}))`,
      },
    },

    ':hover:active': {
      color: `var(--1353, var(--1354, ${tokens.colorNeutralForegroundDisabled}))`,
      backgroundColor: `var(--1355, var(--1356, ${tokens.colorNeutralBackground1}))`,
    },

    ':focus': {
      color: `var(--1357, var(--1358, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
      ':hover': {
        color: 'GrayText',
        backgroundColor: 'Canvas',
        [`& .${menuItemClassNames.icon}`]: {
          color: 'GrayText',
          backgroundColor: 'Canvas',
        },
      },
      ':focus': {
        color: 'GrayText',
        backgroundColor: 'Canvas',
      },
    },
  },
});

/** Applies style classnames to slots */
export const useMenuItemStyles_unstable = (state: MenuItemState): MenuItemState => {
  'use no memo';

  const styles = useStyles();
  const rootBaseStyles = useRootBaseStyles();
  const contentBaseStyles = useContentBaseStyles();
  const secondaryContentBaseStyles = useSecondaryContentBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const submenuIndicatorBaseStyles = useSubmenuIndicatorBaseStyles();
  state.root.className = mergeClasses(
    menuItemClassNames.root,
    rootBaseStyles,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(menuItemClassNames.content, contentBaseStyles, state.content.className);
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemClassNames.secondaryContent,
      !state.disabled && secondaryContentBaseStyles,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemClassNames.icon, iconBaseStyles, state.icon.className);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      menuItemClassNames.submenuIndicator,
      submenuIndicatorBaseStyles,
      state.submenuIndicator.className,
    );
  }

  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);

  return state;
};
