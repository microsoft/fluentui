import { IStyleSheetConfig } from '@uifabric/merge-styles';
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
}
