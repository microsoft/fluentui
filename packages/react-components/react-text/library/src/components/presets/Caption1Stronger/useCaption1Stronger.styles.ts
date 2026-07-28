'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- kept per CONVERSION_GUIDE §3; see ../../Text/useTextStyles.styles.ts for the full note

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';

import styles from '../presets.module.css';

export const caption1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Stronger',
};

/**
 * Styles for the root slot
 *
 * Griffel → Tailwind + CSS Modules migration: the four `typographyStyles.caption1Stronger`
 * declarations now live in `../presets.module.css` at `fui.components.l2` (the preset is
 * applied over Text's own hook output — see that file's header). The class map is a static
 * object, so the returned shape is hoisted rather than rebuilt on every render.
 */
const classes: Record<'root', string> = { root: styles['caption1-stronger'] };

export const useCaption1StrongerStyles = (): Record<'root', string> => classes;
