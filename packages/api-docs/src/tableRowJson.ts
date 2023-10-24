import {
  ApiDeclaredItem,
  ExcerptToken,
  IExcerptTokenRange,
  ApiPropertySignature,
  ApiMethodSignature,
  ApiEnumMember,
  ApiItem,
  ApiProperty,
  ApiConstructor,
  ApiMethod,
  ApiItemKind,
} from '@microsoft/api-extractor-model';
import { ICollectedData } from './types-private';
import { ITableRowJson, IEnumTableRowJson } from './types';
import {
  renderDocNodeWithoutInlineTag,
  getBlockTagByName,
  renderNodes,
  getTokenHyperlinks,
  renderTokens,
} from './rendering';

export function createTableRowJson(collectedData: ICollectedData, apiItem: ApiItem): ITableRowJson | undefined {
  let tableRowJson: ITableRowJson | undefined;
  const apiKind = apiItem.kind as unknown as ApiItemKind;

  switch (apiKind) {
    case ApiItemKind.Property:
    case ApiItemKind.PropertySignature: {
      const apiProperty = apiItem as ApiPropertySignature | ApiProperty;
      tableRowJson = createBasicTableRowJson(
        collectedData,
        apiProperty,
        'property',
        apiProperty.excerptTokens,
        apiProperty.propertyTypeExcerpt.tokenRange,
      );
      break;
    }

    case ApiItemKind.Constructor:
    case ApiItemKind.Method:
    case ApiItemKind.MethodSignature: {
      const apiMethod = apiItem as ApiMethod | ApiMethodSignature | ApiConstructor;
      tableRowJson = createBasicTableRowJson(
        collectedData,
        apiMethod,
        'method',
        apiMethod.excerptTokens,
        apiMethod.excerpt.tokenRange,
      );

      if ((apiMethod.kind as unknown as ApiItemKind) === ApiItemKind.Constructor) {
        // The constructor is similar to a method, but we have to manually add the name.
        tableRowJson.name = 'constructor';
      }
      break;
    }

    case ApiItemKind.Function:
      break;
    case ApiItemKind.Class:
      break;
  }

  // For property or method signatures, check if it's required based on the text of the declaration
  // (item.excerpt.text). It's required if there's no ? after the name.
  if (
    tableRowJson &&
    (apiKind === ApiItemKind.PropertySignature || apiKind === ApiItemKind.MethodSignature) &&
    /^\w+[:(]/.test((apiItem as ApiDeclaredItem).excerpt.text)
  ) {
    tableRowJson.required = true;
  }

  return tableRowJson;
}

export function createEnumTableRowJson(
  collectedData: ICollectedData,
  apiItem: ApiDeclaredItem & { name?: string },
): IEnumTableRowJson {
  const apiEnumMember = apiItem as ApiEnumMember;

  const { name, description, deprecated, deprecatedMessage } = createBasicTableRowJson(collectedData, apiEnumMember);

  return {
    name,
    description,
    deprecated,
    deprecatedMessage,
    value: renderTokens(apiEnumMember.excerptTokens, apiEnumMember.excerpt.tokenRange),
  };
}

/**
 * Generate an ITableRowJson for a class/interface/enum member with the name, description,
 * deprecated message, default value, and (optionally) type tokens pre-filled.
 * @param typeTokens - Optional list of tokens which includes the item type info.
 * @param typeTokenRange - Specific location of the item type within `typeTokens`.
 */
function createBasicTableRowJson(
  collectedData: ICollectedData,
  apiItem: ApiDeclaredItem & { name?: string },
  kind?: ITableRowJson['kind'],
  typeTokens?: readonly ExcerptToken[],
  typeTokenRange?: Readonly<IExcerptTokenRange>,
): ITableRowJson {
  const { tsdocComment } = apiItem;

  const tableRowJson: ITableRowJson = {
    name: apiItem.name || '',
    typeTokens: [],
    kind,
    description: (tsdocComment && renderDocNodeWithoutInlineTag(tsdocComment.summarySection)) || undefined,
  };

  if (tsdocComment) {
    const defaultValue =
      getBlockTagByName('@defaultValue', tsdocComment) ||
      getBlockTagByName('@defaultvalue', tsdocComment) ||
      getBlockTagByName('@default', tsdocComment);
    if (defaultValue) {
      tableRowJson.defaultValue = renderNodes(collectedData.apiModel, apiItem, defaultValue);
    }

    if (tsdocComment.deprecatedBlock) {
      tableRowJson.deprecated = true;
      tableRowJson.deprecatedMessage = renderNodes(
        collectedData.apiModel,
        apiItem,
        tsdocComment.deprecatedBlock.content,
      );
    }
  }

  if (typeTokens && typeTokenRange) {
    tableRowJson.typeTokens = getTokenHyperlinks(collectedData, typeTokens, typeTokenRange);
  }

  return tableRowJson;
}
