import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/** Class of an app element wrapping the component (`'.parity-app-parent:hover &'`). */
export const APP_PARENT_CLASS_NAME = 'parity-app-parent';

const background = { backgroundColor: tokens.colorPaletteBerryBackground2, color: tokens.colorPaletteBerryForeground2 };
const focusBorder = shorthands.borderColor(tokens.colorPaletteBerryBorderActive);

/**
 * App selector shapes. Griffel buckets a rule by its selector's first pseudo-class, so shapes that hide or nest the
 * pseudo-class (attribute selectors, `:is()`, `:not()`, parent states) land in other buckets than a plain `:hover`.
 */
export const useSelectorStyles = makeStyles({
  attribute: { '&[data-app-state="on"]': background },
  notDisabledHover: { ':not(:disabled):hover': background },
  isHoverOrFocusVisible: { ':is(:hover, :focus-visible)': background },
  whereHover: { ':where(:hover)': background },
  focus: { ':focus': focusBorder },
  focusVisible: { ':focus-visible': focusBorder },
  fluentFocusVisible: { '&[data-fui-focus-visible]': focusBorder },
  parentHover: { [`.${APP_PARENT_CLASS_NAME}:hover &`]: background },
  after: { '::after': { borderBottomColor: tokens.colorPaletteBerryBorderActive } },
  before: { '::before': { backgroundColor: tokens.colorPaletteBerryBackground2 } },
});

/** `& .fui-<Component>__<slot>` descendant selectors on Fluent's static slot classes. */
export const useSlotDescendantStyles = makeStyles({
  Button: { '& .fui-Button__icon': { color: tokens.colorPaletteBerryForeground2 } },
  Input: { '& .fui-Input__input': { color: tokens.colorPaletteBerryForeground2 } },
  Checkbox: { '& .fui-Checkbox__indicator': { backgroundColor: tokens.colorPaletteBerryBackground2 } },
  Link: {},
});
