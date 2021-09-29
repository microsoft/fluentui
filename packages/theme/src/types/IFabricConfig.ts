/* eslint-disable @typescript-eslint/naming-convention */
import type { ISerializedStylesheet, IStyleSheetConfig } from '@fluentui/merge-styles';

// TODO: figure out a better place (e.g a shared typing package) for this interface.

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
   * Serialized form of Stylesheet used for rehydration.
   */
  serializedStylesheet?: ISerializedStylesheet;
}
