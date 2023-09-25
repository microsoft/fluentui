import type { IRawStyle } from '@fluentui/merge-styles';
import type { IStyleFunctionOrObject } from '@fluentui/utilities';
import type { IPalette } from './IPalette';
import type { IFontStyles } from './IFontStyles';
import type { ISemanticColors } from './ISemanticColors';
import type { ISpacing } from './ISpacing';
import type { IEffects } from './IEffects';
import type { IScheme, ISchemeNames } from './IScheme';

/**
 * {@docCategory Theme}
 * Component-level styles and variants.
 */
export interface ComponentStyles {
  /**
   * styles prop for a component.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: IStyleFunctionOrObject<any, any>;
}

/**
 * {@docCategory Theme}
 * Component-level styles and token set.
 */
export type ComponentsStyles = {
  [componentName: string]: ComponentStyles;
};

/**
 * {@docCategory Theme}
 * A prepared (fully expanded) theme object.
 */
export interface Theme extends IScheme {
  /**
   * Component-level styles and token set.
   * This is still in an experimental phase and is only applied by `ThemeProvider`.
   */
  components?: ComponentsStyles;

  /**
   * User defined identifier for the theme.
   * @example "monokai"
   */
  name?: string;

  /**
   * @internal
   * Id of the theme. This is for internal use only.
   */
  id?: string;

  /**
   * @internal
   * The schemes property is still in an experimental phase. The intent is to have it work
   * in conjunction with new 'schemes' prop that any component making use of Foundation can use.
   * Alternative themes that can be referred to by name.
   */
  schemes?: { [P in ISchemeNames]?: IScheme };
}

/**
 * {@docCategory Theme}
 * A partial theme.
 */
export interface PartialTheme {
  components?: ComponentsStyles;

  palette?: Partial<IPalette>;
  fonts?: Partial<IFontStyles>;
  semanticColors?: Partial<ISemanticColors>;
  isInverted?: boolean;
  disableGlobalClassNames?: boolean;
  rtl?: boolean;
  spacing?: Partial<ISpacing>;
  effects?: Partial<IEffects>;

  /**
   * Use this property to specify font property defaults.
   */
  defaultFontStyle?: IRawStyle;

  /**
   * @internal
   * The schemes property is still in an experimental phase. The intent is to have it work
   * in conjunction with new 'schemes' prop that any component making use of Foundation can use.
   * Alternative themes that can be referred to by name.
   */
  schemes?: { [P in ISchemeNames]?: IScheme };
}
