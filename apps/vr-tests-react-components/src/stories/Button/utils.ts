import { Steps } from 'storywright';

import styles from './utils.module.css';

export const buttonId = 'button-id';

/** Story-scaffolding classes (see utils.module.css). Kept as a hook-shaped function so the
 * consuming stories are untouched by the Griffel -> CSS Modules conversion. */
export const useStyles = (): typeof styles => styles;

export const steps = new Steps()
  .snapshot('default')
  .hover('#button-id')
  .snapshot('hover')
  .mouseDown('#button-id')
  .snapshot('pressed')
  .end();
