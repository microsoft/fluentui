/* eslint-disable @typescript-eslint/naming-convention */
import type { IPalette } from './IPalette';
import type { IFontStyles } from './IFontStyles';
import type { ISemanticColors } from './ISemanticColors';
import type { ISpacing } from './ISpacing';
import type { IEffects } from './IEffects';

/**
 * @internal
 * Predefined scheme identifiers.
 * Schemes are is still in an experimental phase.
 * This interface's naming and values are not finalized and are subject to change.
 * {@docCategory IScheme}
 */
export type ISchemeNames = 'default' | 'neutral' | 'soft' | 'strong';

/**
 * {@docCategory IScheme}
 */
export interface IScheme {
  rtl?: boolean;
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
   * The spacing property is still in an experimental phase. The intent is to have it
   * be used for padding and margin sizes in a future release, but it is still undergoing review.
   * Avoid using it until it is finalized.
   */
  spacing: ISpacing;

  effects: IEffects;
}
