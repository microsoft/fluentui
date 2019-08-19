import { IRawStyle } from '@uifabric/merge-styles';

/**
 * UI Fabric font set.
 * {@docCategory IFontStyles}
 */
export interface IFontStyles {
  tiny: IRawStyle;
  xSmall: IRawStyle;
  small: IRawStyle;
  smallPlus: IRawStyle;
  medium: IRawStyle;
  mediumPlus: IRawStyle;
  large: IRawStyle;
  xLarge: IRawStyle;
  /**
   * @deprecated Exists for forward compatibility with Fabric 7's Fluent theme.
   * Not recommended for use with Fabric 6.
   */
  xLargePlus: IRawStyle;
  xxLarge: IRawStyle;
  /**
   * @deprecated Exists for forward compatibility with Fabric 7's Fluent theme
   * Not recommended for use with Fabric 6.
   */
  xxLargePlus: IRawStyle;
  superLarge: IRawStyle;
  mega: IRawStyle;
}
