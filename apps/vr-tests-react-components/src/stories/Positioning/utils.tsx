import * as React from 'react';

import styles from './utils.module.css';

/** Story-scaffolding classes (see utils.module.css, which includes the hand-expanded
 * `createArrowStyles` output). Kept as a hook-shaped function so the consuming stories
 * are untouched by the Griffel -> CSS Modules conversion. */
export const useStyles = (): typeof styles => styles;

export const positions = [
  ['above', 'start'],
  ['above', 'center'],
  ['above', 'end'],
  ['below', 'start'],
  ['below', 'center'],
  ['below', 'end'],
  ['before', 'top'],
  ['before', 'center'],
  ['before', 'bottom'],
  ['after', 'top'],
  ['after', 'center'],
  ['after', 'bottom'],
] as const;

export const Box = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div {...props} className={[styles.box, props.className].filter(Boolean).join(' ')} ref={ref}>
      {props.children}
    </div>
  );
});
