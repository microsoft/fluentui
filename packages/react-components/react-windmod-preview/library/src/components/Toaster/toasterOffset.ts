import type { ToastPosition } from '@fluentui/react-headless-components-preview/toast';

import type { ToasterState } from './Toaster.types';

type ToastOffset = NonNullable<ToasterState['offset']>;
type ToastOffsetObject = { horizontal?: number; vertical?: number };

/** The two custom properties the position rules read — see Toaster.module.css. */
export type ToasterOffsetStyle = {
  '--fui-toaster-offset-inline': string;
  '--fui-toaster-offset-block': string;
};

const isShorthandOffset = (offset: ToastOffset): offset is ToastOffsetObject =>
  'horizontal' in offset || 'vertical' in offset;

/**
 * Resolves a supplied offset into the two custom properties the CSS reads, reproducing Griffel's
 * per-position defaults: 16 vertical everywhere, and 20 horizontal except on the centred `top` and
 * `bottom`, where it is 0. Returns undefined when no offset is supplied, so the module's own
 * defaults stand and the common case writes no inline style at all.
 */
export const toasterOffset = (
  position: ToastPosition,
  offset: ToasterState['offset'],
): ToasterOffsetStyle | undefined => {
  if (!offset) {
    return undefined;
  }

  const centred = position === 'top' || position === 'bottom';
  const resolved = isShorthandOffset(offset) ? offset : (offset[position] ?? {});
  const { horizontal = centred ? 0 : 20, vertical = 16 } = resolved;

  return {
    '--fui-toaster-offset-inline': `${horizontal}px`,
    '--fui-toaster-offset-block': `${vertical}px`,
  };
};
