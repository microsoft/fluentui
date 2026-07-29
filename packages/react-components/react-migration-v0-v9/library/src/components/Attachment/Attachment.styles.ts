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

import styles from './Attachment.module.css';

/**
 * Replaces the `makeResetStyles` base class. The declarations moved to
 * `Attachment.module.css` at `@layer fui.base` — the layer equivalent of Griffel's reset
 * bucket: levelless, so it loses to every `fui.components.l*` rule.
 *
 * The `createCustomFocusIndicatorStyle` spread that used to select
 * `attachmentActionClassName` / `attachmentIconClassName` is gone with the statics; it set
 * only `color: undefined` on those descendants and therefore emitted nothing. See the module
 * header for the full accounting.
 */
export const useAttachmentBaseStyles = (): string => styles.root;

/**
 * Replaces the `makeStyles` slices. Hoisted to a module constant so the identity is stable
 * across renders — `Attachment.tsx` reads it in the render body, and Griffel's hook returned
 * a stable object too.
 */
const attachmentStyles = {
  actionable: styles.actionable,
  progressContainer: styles['progress-container'],
  progressBar: styles['progress-bar'],
};

export const useAttachmentStyles = (): typeof attachmentStyles => attachmentStyles;
