import { makeStyles } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';

const filled = `.${iconFilledClassName}`;
const regular = `.${iconRegularClassName}`;

/**
 * Unlayered app rules on bundled icons. The default `bundleIcon` hides a variant with a Griffel class, the headless one
 * with `[data-fui-icon-hidden]`; flipped icons get a Griffel `transform` class or `[data-fui-icon-rtl]`.
 */
export const useIconOverrideStyles = makeStyles({
  filledOnHover: {
    [`:hover ${filled}`]: { display: 'inline' },
    [`:hover ${regular}`]: { display: 'none' },
  },
  /** Opposite of Button's subtle/transparent and MenuItem's hover swap. */
  regularOnHover: {
    [`:hover ${filled}`]: { display: 'none' },
    [`:hover ${regular}`]: { display: 'inline' },
  },
  alwaysFilled: {
    [`& ${filled}`]: { display: 'inline' },
    [`& ${regular}`]: { display: 'none' },
  },
  /** On a `flipInRtl` icon: replaces its RTL `scaleX(-1)`. */
  rotated: {
    [`& ${filled}`]: { transform: 'rotate(90deg)' },
    [`& ${regular}`]: { transform: 'rotate(90deg)' },
  },
});
