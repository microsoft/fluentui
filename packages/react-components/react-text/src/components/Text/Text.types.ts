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
   * Aligns text based on the parent container.
   *
   * @default start
   */
  align?: 'start' | 'center' | 'end' | 'justify';

  /**
   * Applies a block display for the content.
   *
   * @default false
   */
  block?: boolean;

  /**
   * Suppresses all default styling. Styles will only be applied for provided props.
   *
   * @default false
   */
  disableDefaultStyling?: boolean;

  /**
   * Applies the font family to the content.
   *
   * @default base
   */
  font?: 'base' | 'monospace' | 'numeric';

  /**
   * Applies the italic font style to the content.
   *
   * @default false
   */
  italic?: boolean;

  /**
   * Applies font size and line height based on the theme typography tokens.
   *
   * @default 300
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

  /**
   * Applies the strikethrough text decoration to the content.
   *
   * @default false
   */
  strikethrough?: boolean;

  /**
   * Truncate overflowing text for block displays.
   *
   * @default false
   */

  truncate?: boolean;

  /**
   * Applies the underline text decoration to the content.
   *
   * @default false
   */
  underline?: boolean;

  /**
   * Applies font weight to the content.
   *
   * @default regular
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';

  /**
   * Wraps the text content on white spaces.
   *
   * @default true
   */
  wrap?: boolean;
};

/**
 * TextPreset Props
 */
export type TextPresetProps = Omit<TextProps, 'font' | 'size' | 'weight'>;

export type TextStateProps =
  | 'align'
  | 'block'
  | 'disableDefaultStyling'
  | 'font'
  | 'italic'
  | 'size'
  | 'strikethrough'
  | 'truncate'
  | 'underline'
  | 'weight'
  | 'wrap';

/**
 * State used in rendering Text
 */
export type TextState = ComponentState<TextSlots> & Pick<TextProps, TextStateProps>;
