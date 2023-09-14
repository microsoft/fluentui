import type { IRawStyle } from '@fluentui/merge-styles';

export interface IGetFocusStylesOptions {
  /**
   * The number of pixels to inset the border.
   * @defaultvalue 0
   */
  inset?: number;

  /**
   * The width of the border in pixels.
   * @defaultvalue 1
   */
  width?: number;

  /**
   * The positioning applied to the container.
   * Must be 'relative' or 'absolute' so that the focus border can live around it.
   * @defaultvalue 'relative'
   */
  position?: 'relative' | 'absolute';

  /**
   * Style for high contrast mode.
   */
  highContrastStyle?: IRawStyle;

  /**
   * Color of the border.
   * @defaultvalue theme.palette.white
   */
  borderColor?: string;

  /**
   * Color of the outline.
   * @defaultvalue theme.palette.neutralSecondary
   */
  outlineColor?: string;

  /**
   * If the styles should apply on `:focus` pseudo element.
   * @defaultvalue true
   */
  isFocusedOnly?: boolean;

  /**
   * If the style should include a rounded border.
   */
  borderRadius?: string | number | undefined;

  /**
   * If default pointer events should be overridden.
   * @defaultvalue undefined
   */
  pointerEvents?: IRawStyle['pointerEvents'];
}
