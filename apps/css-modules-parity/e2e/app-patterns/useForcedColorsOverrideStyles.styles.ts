import { makeStyles, shorthands } from '@griffel/react';

const forcedColors = '@media (forced-colors: active)';

const rest = { color: 'LinkText' };
const hover = { color: 'LinkText', backgroundColor: 'Canvas', ...shorthands.borderColor('LinkText') };
const pressed = { color: 'ButtonText', backgroundColor: 'Canvas', ...shorthands.borderColor('ButtonText') };

/**
 * App overrides of component forced colors styles, with system colors the components don't use in that state. Every
 * rule only matches with `FUI_PARITY_FORCED_COLORS=1`.
 *
 * - `plain`: the specificity of Griffel's component rules (one class and the state). Griffel ordered app and component
 *   `@media` rules by insertion, so the app won; component forced colors rules now have one more type selector.
 * - `doubled`: `&&&` doubles the class (Griffel compiles `&&` to a single class, so it adds nothing), which beats
 *   component forced colors rules (one class and a type selector). Each state needs its own doubled rule: Button's
 *   `:hover:active` forced colors rule has one class more than `&&&:active`.
 */
export const useForcedColorsOverrideStyles = makeStyles({
  plain: {
    [forcedColors]: { ...rest, ':hover': hover, ':active': pressed },
  },
  doubled: {
    [forcedColors]: {
      '&&&': rest,
      '&&&:hover': hover,
      '&&&:active': pressed,
      '&&&:hover:active': pressed,
    },
  },
  /** Switch: on the indicator slot, whose forced colors color is a class rule. */
  indicatorPlain: {
    [forcedColors]: rest,
  },
  indicatorDoubled: {
    [forcedColors]: { '&&&': rest },
  },
});
