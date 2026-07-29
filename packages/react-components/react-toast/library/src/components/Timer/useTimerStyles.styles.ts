'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeResetStyles`
 * is gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import styles from './Timer.module.css';

/**
 * Class name for the `Timer` span's no-op `opacity` animation, whose `animationend` event
 * drives toast dismissal. See `Timer.module.css` for why the keyframes are a deliberate
 * no-op and why `animation-duration` / `animation-play-state` stay inline style.
 *
 * Kept as a zero-argument function rather than collapsed to a bare constant so the single
 * call site in `Timer.tsx` — and the exported name, which the cookbook's "delete no exports"
 * rule protects — are unchanged by the conversion. It is no longer a React hook; the `use`
 * prefix is retained for the same reason, and the Phase 3 sweep that removes the `'use
 * client'` directives is the right place to revisit it.
 */
export const useBaseAnimationStyles = (): string => styles.root;
