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
