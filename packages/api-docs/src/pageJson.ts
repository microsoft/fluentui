import { ApiItem, ApiDocumentedItem, ApiModel, ApiItemKind } from '@microsoft/api-extractor-model';
import { findInlineTagByName } from './rendering';
import { ICollectedData } from './types-private';
import { ITableJson, IPageJson, PageGroups } from './types';
import { createTableJson } from './tableJson';

const supportedApiItems = [ApiItemKind.Interface, ApiItemKind.Enum, ApiItemKind.Class, ApiItemKind.TypeAlias];

/**
 * Given `apiModel` with API package info already loaded into it, generate page data for each
 * `docCategory` tag (page name) and the APIs within it.
 */
export function generatePageJson(
  apiModel: ApiModel,
  pageGroups: PageGroups = {},
  fallbackGroup?: string,
): Map<string, IPageJson> {
  const collectedData = initPageData(apiModel, pageGroups, fallbackGroup);

  const result = new Map<string, IPageJson>();
  for (const [pageName, pageData] of collectedData.pagesByName.entries()) {
    result.set(pageName, {
      tables: pageData.apiItems
        .map((apiItem: ApiItem) => createTableJson(collectedData, apiItem))
        .filter((table: ITableJson | undefined) => !!table) as ITableJson[],
      name: pageName,
      group: pageData.group,
    });
  }

  return result;
}

/**
 * Walk all the APIs from `apiModel.packages` and generate an empty page data object for each
 * `docCategory` tag (page name) encountered. The returned object contains a mapping from page name
 * (`docCategory`) to page data (`pagesByName`), and from API name to page data (`pagesByApi`).
 * The page data objects referenced in both maps are the same.
 */
function initPageData(apiModel: ApiModel, pageGroups: PageGroups, fallbackGroup?: string): ICollectedData {
  // Map the pages to groups all at once for convenience later
  const groupsByPage: { [pageName: string]: string } = {};
  for (const [group, pageNames] of Object.entries(pageGroups)) {
    for (const pageName of pageNames) {
      groupsByPage[pageName] = group;
    }
  }

  const collectedData: ICollectedData = { apiModel, pagesByName: new Map(), pagesByApi: new Map() };

  // Generate empty page data objects for each docCategory
  for (const apiPackage of collectedData.apiModel.packages) {
    for (const entryPoint of apiPackage.entryPoints) {
      initPageDataForItem(collectedData, entryPoint, groupsByPage, fallbackGroup);
    }
  }
  return collectedData;
}

/**
 * Walk this API item and its members, adding an empty page data object to `collectedData.pagesByName`
 * for each new `docCategory` tag (page name) encountered. Also update `collectedData.pagesByApi` with
 * mappings for every API item encountered.
 */
function initPageDataForItem(
  collectedData: ICollectedData,
  apiItem: ApiItem,
  groupsByPage: { [pageName: string]: string },
  fallbackGroup?: string,
): void {
  if (
    supportedApiItems.includes(apiItem.kind as unknown as ApiItemKind) &&
    apiItem instanceof ApiDocumentedItem &&
    apiItem.tsdocComment
  ) {
    const docCategoryTag = findInlineTagByName('@docCategory', apiItem.tsdocComment);

    if (docCategoryTag) {
      const pageName = docCategoryTag.tagContent.trim();
      let pageData = collectedData.pagesByName.get(pageName);

      if (!pageData) {
        pageData = {
          name: pageName,
          apiItems: [],
          group: groupsByPage[pageName] || fallbackGroup,
        };
        collectedData.pagesByName.set(pageName, pageData);
      }
      collectedData.pagesByApi.set(apiItem.displayName, pageData);

      pageData.apiItems.push(apiItem);
    }
  }

  for (const memberApiItem of apiItem.members) {
    initPageDataForItem(collectedData, memberApiItem, groupsByPage, fallbackGroup);
  }
}
