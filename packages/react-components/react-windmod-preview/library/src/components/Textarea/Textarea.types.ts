import type {
  TextareaProps as TextareaHeadlessProps,
  TextareaState as TextareaHeadlessState,
} from '@fluentui/react-headless-components-preview/textarea';

export type { TextareaSlots } from '@fluentui/react-headless-components-preview/textarea';

/** Colours and borders of the Textarea. `'outline'` is the base look. */
export type TextareaAppearance = 'outline' | 'filled-darker' | 'filled-lighter';

/** Size of the Textarea — changes its height bounds, font size and padding. */
export type TextareaSize = 'small' | 'medium' | 'large';

/**
 * Windmod Textarea props: the headless textarea plus the look props the headless surface
 * deliberately omits (they exist purely to select styles). `resize` stays headless — it is a
 * structural prop the headless hook resolves and stamps.
 */
export type TextareaProps = TextareaHeadlessProps & {
  /** @default 'outline' */
  appearance?: TextareaAppearance;
  /** @default 'medium' */
  size?: TextareaSize;
};

/** Windmod Textarea state: headless state plus the resolved look props. */
export type TextareaState = TextareaHeadlessState & Required<Pick<TextareaProps, 'appearance' | 'size'>>;
