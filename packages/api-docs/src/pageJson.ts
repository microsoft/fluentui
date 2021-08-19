import {
  ApiItem,
  ApiItemKind,
  ApiDocumentedItem,
  ApiModel,
  ApiInterface,
  ApiEnum,
  ApiClass,
  ApiTypeAlias,
} from '@microsoft/api-extractor-model';
import { findInlineTagByName } from './rendering';
import { ICollectedData } from './types-private';
import { ITableJson, IPageJson, IPageJsonOptions } from './types';
import { createTableJson } from './tableJson';

// TODO: add consts (at least component consts)
function isSupportedApiItem(item: ApiItem): item is ApiInterface | ApiEnum | ApiClass | ApiTypeAlias {
  return [ApiItemKind.Interface, ApiItemKind.Enum, ApiItemKind.Class, ApiItemKind.TypeAlias].includes(item.kind);
}

/**
 * Given `apiModel` with API package info already loaded into it, generate page data for each
 * page name (docCategory tag, or possibly prefix or package name) and the APIs within it.
 * Returns the pages and any warnings encountered.
 */
export function generatePageJson(
  apiModel: ApiModel,
  options: IPageJsonOptions,
): [pages: Map<string, IPageJson>, warnings: string[]] {
  const collectedData = initPageData(apiModel, options);

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

  return [result, collectedData.warnings];
}

/**
 * Walk all the APIs from `apiModel.packages` and generate an empty page data object for each
 * page name (docCategory tag, or possibly prefix or package name) encountered.
 * The returned object contains a mapping from page name to page data (`pagesByName`), and from
 * API name to page data (`pagesByApi`). The page data objects referenced in both maps are the same.
 */
function initPageData(apiModel: ApiModel, options: IPageJsonOptions): ICollectedData {
  // Map the pages to groups all at once for convenience later
  const groupsByPage: { [pageName: string]: string } = {};
  for (const [group, pageNames] of Object.entries(options.pageGroups)) {
    for (const pageName of pageNames) {
      groupsByPage[pageName] = group;
    }
  }

  const collectedData: ICollectedData = { apiModel, pagesByName: new Map(), pagesByApi: new Map(), warnings: [] };

  // Generate empty page data objects for each docCategory
  for (const apiPackage of collectedData.apiModel.packages) {
    for (const entryPoint of apiPackage.entryPoints) {
      initPageDataForItem(collectedData, options, entryPoint, groupsByPage);
    }
  }
  return collectedData;
}

/**
 * Walk this API item and its members, adding an empty page data object to `collectedData.pagesByName`
 * for each new page name (docCategory tag, or possibly prefix or package name) encountered.
 * Also update `collectedData.pagesByApi` with mappings for every API item encountered.
 */
function initPageDataForItem(
  collectedData: ICollectedData,
  options: IPageJsonOptions,
  apiItem: ApiItem,
  groupsByPage: { [pageName: string]: string },
): void {
  if (isSupportedApiItem(apiItem)) {
    const packageName = apiItem.getAssociatedPackage()?.name || '';

    // Figure out which page this API item goes under.
    // Start by looking for an explicit @docCategory tag.
    let pageName =
      (apiItem instanceof ApiDocumentedItem &&
        !!apiItem.tsdocComment &&
        findInlineTagByName('@docCategory', apiItem.tsdocComment)?.tagContent.trim()) ||
      undefined;

    if (!pageName && options.inferDocCategoryByPrefix) {
      // Or check if any page names are a prefix of this API item name
      // (e.g. if apiItem is ButtonProps and one of the pageGroups includes Button)
      pageName = Object.keys(groupsByPage).find(page => apiItem.name.startsWith(page));
    }
    if (!pageName && options.includeExtraItemsForPackages) {
      // Or check if this item is from a package where including uncategorized items was requested
      const unscopedPackageName = packageName.replace(/^@\w+\//, '');
      pageName = options.includeExtraItemsForPackages.includes(unscopedPackageName) ? unscopedPackageName : undefined;
    }

    if (pageName) {
      let pageData = collectedData.pagesByName.get(pageName);

      if (!pageData) {
        pageData = {
          name: pageName,
          apiItems: [],
          group: groupsByPage[pageName] || options.fallbackGroup,
        };
        collectedData.pagesByName.set(pageName, pageData);
      }

      if (collectedData.pagesByApi.has(apiItem.name)) {
        collectedData.warnings.push(
          `Found multiple exported API items with name "${apiItem.name}" (API names should be unique)`,
        );
      } else {
        collectedData.pagesByApi.set(apiItem.name, pageData);
      }

      pageData.apiItems.push(apiItem);
    } else {
      collectedData.warnings.push(`Couldn't find a page for API item "${apiItem.name}" from ${packageName}`);
    }
  }

  for (const memberApiItem of apiItem.members) {
    initPageDataForItem(collectedData, options, memberApiItem, groupsByPage);
  }
}
