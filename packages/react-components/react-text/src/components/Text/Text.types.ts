import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Text slots
 */
export type TextSlots = {
  root: Slot<'span', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre'>;
};

/**
 * Text Props
 */
export type TextProps = ComponentProps<TextSlots> & {
  /**
   * Wraps the text content on white spaces.
   *
   * @default true
   */
  wrap?: boolean;

  /**
   * Truncate overflowing text for block displays.
   *
   * @default false
   */
  truncate?: boolean;

  /**
   * Applies a block display for the content.
   *
   * @default false
   */
  block?: boolean;

  /**
   * Applies the italic font style to the content.
   *
   * @default false
   */
  italic?: boolean;

  /**
   * Applies the underline text decoration to the content.
   *
   * @default false
   */
  underline?: boolean;

  /**
   * Applies the strikethrough text decoration to the content.
   *
   * @default false
   */
  strikethrough?: boolean;

  /**
   * Applies font size and line height based on the theme tokens.
   *
   * @default 300
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

  /**
   * Applies the font family to the content.
   *
   * @default base
   */
  font?: 'base' | 'monospace' | 'numeric';

  /**
   * Applies font weight to the content.
   *
   * @default regular
   */
  weight?: 'regular' | 'medium' | 'semibold';

  /**
   * Aligns text based on the parent container.
   *
   * @default start
   */
  align?: 'start' | 'center' | 'end' | 'justify';
};

/**
 * State used in rendering Text
 */
export type TextState = ComponentState<TextSlots> &
  Required<
    Pick<
      TextProps,
      'align' | 'block' | 'font' | 'italic' | 'size' | 'strikethrough' | 'truncate' | 'underline' | 'weight' | 'wrap'
    >
  >;
