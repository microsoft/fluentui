import { IPalette } from './IPalette';
import { IFontStyles } from './IFontStyles';
import { ISemanticColors } from './ISemanticColors';
import { ITypography, IPartialTypography } from './ITypography';
import { ISpacing } from './ISpacing';

/**
 * @internal
 * Predefined scheme identifiers.
 * Schemes are is still in an experimental phase.
 * This interface's naming and values are not finalized and are subject to change.
 */
export type ISchemeNames = 'default' | 'neutral' | 'soft' | 'strong';

export interface IScheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors: ISemanticColors;
  isInverted: boolean;

  /**
   * This setting is for a very narrow use case and you probably don't need to worry about,
   * unless you share a environment with others that also use fabric.
   * It is used for disabling global styles on fabric components. This will prevent global
   * overrides that might have been set by other fabric users from applying to your components.
   * When you set this setting to `true` on your theme the components in the subtree of your
   * Customizer will not get the global styles applied to them.
   */
  disableGlobalClassNames: boolean;

  /**
   * @internal
   * The typography property is still in an experimental phase. The intent is to have it
   * eventually replace IFontStyles in a future release, but it is still undergoing review.
   * Avoid using it until it is finalized.
   */
  typography: ITypography;

  /**
   * @internal
   * The spacing property is still in an experimental phase. The intent is to have it
   * be used for padding and margin sizes in a future release, but it is still undergoing review.
   * Avoid using it until it is finalized.
   */
  spacing: ISpacing;
}

export interface ITheme extends IScheme {
  /**
   * @internal
   * The schemes property is still in an experimental phase. The intent is to have it work
   * in conjunction with new 'schemes' prop that any component making use of Foundation can use.
   * Alternative themes that can be referred to by name.
   */
  schemes?: { [P in ISchemeNames]?: IScheme };
}

export type IPartialTheme = {
  [P in keyof Pick<
    ITheme,
    'palette' | 'fonts' | 'semanticColors' | 'isInverted' | 'disableGlobalClassNames' | 'spacing' | 'schemes'
  >]?: Partial<ITheme[P]>
} &
  { [P in keyof Pick<ITheme, 'typography'>]?: IPartialTypography };
