import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/**
 * Physical app overrides. Griffel flips physical properties in RTL (`paddingLeft` becomes `padding-right`), for app
 * and component styles alike; CSS Modules components use logical properties, which follow the element's direction.
 */
export const usePhysicalOverrideStyles = makeStyles({
  padding: { paddingLeft: tokens.spacingHorizontalXXL, paddingRight: tokens.spacingHorizontalXS },
  iconMargin: { marginRight: tokens.spacingHorizontalXL },
  /** Only matches in RTL; Griffel keeps the attribute selector as written. */
  rtlTransform: { '[dir="rtl"] & .fui-Button__icon': { transform: 'scaleX(-1)' } },
  borderLeft: { borderLeft: `${tokens.strokeWidthThick} solid ${tokens.colorPaletteBerryBorderActive}` },
});
