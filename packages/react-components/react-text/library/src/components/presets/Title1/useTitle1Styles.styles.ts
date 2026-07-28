'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- kept per CONVERSION_GUIDE §3; see ../../Text/useTextStyles.styles.ts for the full note

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';

import styles from '../presets.module.css';

export const title1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title1',
};

/**
 * Styles for the root slot
 *
 * Griffel → Tailwind + CSS Modules migration: the four `typographyStyles.title1`
 * declarations now live in `../presets.module.css` at `fui.components.l2` (the preset is
 * applied over Text's own hook output — see that file's header). The class map is a static
 * object, so the returned shape is hoisted rather than rebuilt on every render.
 */
const classes: Record<'root', string> = { root: styles.title1 };

export const useTitle1Styles = (): Record<'root', string> => classes;
