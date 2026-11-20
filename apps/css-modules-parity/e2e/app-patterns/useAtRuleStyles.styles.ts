import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const background = { backgroundColor: tokens.colorPaletteBerryBackground2, color: tokens.colorPaletteBerryForeground2 };

/**
 * App overrides inside at-rules. Griffel puts `@media` rules in its last bucket (`m`), `@supports`/`@layer` in `t` and
 * `@container` in `x`, after every state bucket, so they beat component state rules of equal specificity. Every
 * condition below matches in the test browser (reduced motion is emulated), except forced colors outside the
 * `FUI_PARITY_FORCED_COLORS=1` axis.
 */
export const useAtRuleStyles = makeStyles({
  media: { '@media (min-width: 1px)': background },
  mediaHover: { '@media (hover: hover)': { ':hover': background } },
  reducedMotion: { '@media (prefers-reduced-motion: reduce)': background },
  forcedColors: { '@media (forced-colors: active)': { ...shorthands.borderColor('Highlight'), color: 'LinkText' } },
  supports: { '@supports (display: flex)': background },
  container: { '@container (min-width: 1px)': background },
  layer: { '@layer app': background },
  containerParent: { containerType: 'inline-size' },
});
