import { IStyleSheetConfig } from '@uifabric/merge-styles';
import { IPartialTheme } from '@uifabric/styling/lib/interfaces/ITheme';

/**
 * The interface of window.FabricConfig, which can be burned on the page before script loading to preemptively
 * define default configurations.
 * {@docCategory IFabricConfig}
 */
export interface IFabricConfig {
  /**
   * An override for where the fonts should be downloaded from.
   */
  fontBaseUrl?: string;

  /**
   * The mergeStyles stylesheet config.
   */
  mergeStyles?: IStyleSheetConfig;

  /**
   * The default theme to use if no theme is specifically loaded.
   */
  theme?: IPartialTheme;

  /**
   * A list of features to enable.
   * A feature is enabled if the name associated with it is in the list and is set to "true".
   * `name`s MUST be globally unique.
   * See further documentation at https://github.com/microsoft/fluentui/wiki/enabledFeatures-Switches
   */
  enabledFeatures?: { [name: string]: boolean };
}
