import styles from '../presets.module.css';

/**
 * Styles for the root slot
 *
 * Griffel → Tailwind + CSS Modules migration: the four `typographyStyles.caption1`
 * declarations now live in `../presets.module.css` at `fui.components.l2` (the preset is
 * applied over Text's own hook output — see that file's header). The class map is a static
 * object, so the returned shape is hoisted rather than rebuilt on every render.
 */
const classes: Record<'root', string> = { root: styles.caption1 };

export const useCaption1Styles = (): Record<'root', string> => classes;
