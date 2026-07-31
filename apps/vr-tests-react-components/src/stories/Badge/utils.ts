import type { BadgeProps } from '@fluentui/react-badge';

import styles from './utils.module.css';

type ValueArrays<T> = {
  [K in keyof T]: T[K][];
};

export const propValues: ValueArrays<Pick<Required<BadgeProps>, 'size' | 'color' | 'appearance' | 'shape'>> = {
  size: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'],
  color: ['brand', 'danger', 'severe', 'warning', 'success', 'important', 'informative', 'subtle'],
  appearance: ['filled', 'outline', 'tint', 'ghost'],
  shape: ['circular', 'rounded', 'square'],
};

/** Story-scaffolding classes (see utils.module.css). Kept as a hook-shaped function so the
 * consuming stories are untouched by the Griffel -> CSS Modules conversion. */
export const useStyles = (): typeof styles => styles;
