'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import styles from './SafeZoneArea.module.css';

/**
 * Module classes for the internal `SafeZoneArea` overlay.
 *
 * Module-local class names are authored lowercase-kebab (DECISIONS.md D15.3); this map
 * re-exposes them under the camelCase keys the Griffel `makeStyles` call used, so
 * `SafeZoneArea.tsx` keeps reading `styles.wrapperActive` / `styles.triangleDebug` and the
 * conversion stays a pure styling change (CONVERSION_GUIDE.md §3, "delete no exports").
 *
 * Hoisted to module scope rather than rebuilt per call: the map is frozen at build time by
 * the CSS-Modules class map, so there is nothing to recompute.
 */
const safeZoneAreaStyles = {
  wrapper: styles.wrapper,
  wrapperActive: styles['wrapper-active'],
  svg: styles.svg,
  triangle: styles.triangle,
  triangleDebug: styles['triangle-debug'],
  rectDebug: styles['rect-debug'],
} as const;

type SafeZoneAreaStyles = typeof safeZoneAreaStyles;

/**
 * Style classes for `SafeZoneArea`.
 *
 * The function shape and the export name are kept from the Griffel version so the call site
 * in `SafeZoneArea.tsx` is unchanged (CONVERSION_GUIDE.md §3). Unlike a component styles hook
 * this one composes nothing: `SafeZoneArea` is an internal component with no slot objects and
 * no `className` prop, so the four class strings are assembled at the JSX sites.
 */
export const useStyles = (): SafeZoneAreaStyles => safeZoneAreaStyles;
