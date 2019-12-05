import { ApiItem, ApiModel } from '@microsoft/api-extractor-model';

/**
 * A page and its associated API items.
 */
export interface IPageData {
  /** The name (`@docCategory` tag value) of the page */
  readonly name: string;
  readonly apiItems: ApiItem[];
  readonly group?: string;
}

export interface ICollectedData {
  // readonly pageGroups: readonly string[];
  // readonly fallbackGroup: string;
  readonly apiModel: ApiModel;
  /**
   * Page data keyed by page name (`@docCategory` tag value).
   * Entries in this object are unique.
   */
  readonly pagesByName: Map<string, IPageData>;
  /**
   * `pagesByName` re-keyed by API name for lookup convenience.
   * Entries are the same objects from `pagesByName`, but each page may appear multiple times.
   */
  readonly pagesByApi: Map<string, IPageData>;
}
