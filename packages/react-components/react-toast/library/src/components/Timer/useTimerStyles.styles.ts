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
