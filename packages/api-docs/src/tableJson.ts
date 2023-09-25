import {
  ApiClass,
  ApiEnum,
  ApiEnumMember,
  ApiInterface,
  ApiTypeAlias,
  ApiDeclaredItem,
  HeritageType,
  ApiItem,
  ApiItemKind,
} from '@microsoft/api-extractor-model';
import { ITableJson, ITableRowJson } from './types';
import { renderDocNodeWithoutInlineTag, getTokenHyperlinks, renderNodes } from './rendering';
import { ICollectedData } from './types-private';
import { createTableRowJson, createEnumTableRowJson } from './tableRowJson';

export function createTableJson(collectedData: ICollectedData, apiItem: ApiItem): ITableJson | undefined {
  switch (apiItem.kind as unknown as ApiItemKind) {
    case ApiItemKind.Interface: {
      return createInterfacePageJson(collectedData, apiItem as ApiInterface);
    }
    case ApiItemKind.Enum: {
      return createEnumPageJson(collectedData, apiItem as ApiEnum);
    }
    case ApiItemKind.Class: {
      return createClassPageJson(collectedData, apiItem as ApiClass);
    }
    case ApiItemKind.TypeAlias: {
      return createTypeAliasPageJson(collectedData, apiItem as ApiTypeAlias);
    }
  }
  return undefined;
}

/**
 * Generate an ITableJson for a top-level API item (interface, class, enum, type alias)
 * with the name, description, deprecated message, and optionally extends tokens pre-filled.
 */
function createBasicTableJson(
  collectedData: ICollectedData,
  apiItem: ApiDeclaredItem,
  kind: ITableJson['kind'],
  extendsTypes?: HeritageType | readonly HeritageType[],
): ITableJson {
  const { tsdocComment } = apiItem;
  const tableJson: ITableJson = {
    kind,
    name: apiItem.displayName,
    description: (tsdocComment && renderDocNodeWithoutInlineTag(tsdocComment.summarySection)) || undefined,
  };

  const extendsArr: HeritageType[] | undefined =
    !extendsTypes || Array.isArray(extendsTypes) ? extendsTypes : [extendsTypes as HeritageType];
  if (extendsArr && extendsArr.length) {
    tableJson.extendsTokens = [];
    for (const extendsType of extendsArr) {
      if (tableJson.extendsTokens.length) {
        // if there are multiple extends types, we should separate them with a comma
        tableJson.extendsTokens.push({ text: ', ' });
      }
      tableJson.extendsTokens.push(
        ...getTokenHyperlinks(collectedData, extendsType.excerpt.tokens, extendsType.excerpt.tokenRange),
      );
    }
  }

  if (tsdocComment && tsdocComment.deprecatedBlock) {
    tableJson.deprecated = true;
    tableJson.deprecatedMessage = renderNodes(collectedData.apiModel, apiItem, tsdocComment.deprecatedBlock.content);
  }

  return tableJson;
}

function createInterfacePageJson(collectedData: ICollectedData, interfaceItem: ApiInterface): ITableJson {
  const tableJson = createBasicTableJson(collectedData, interfaceItem, 'interface', interfaceItem.extendsTypes);

  tableJson.members = interfaceItem.members
    .map((member: ApiItem) => createTableRowJson(collectedData, member))
    .filter((row: ITableRowJson | undefined): row is ITableRowJson => !!row);

  return tableJson;
}

function createEnumPageJson(collectedData: ICollectedData, enumItem: ApiEnum): ITableJson {
  const tableJson = createBasicTableJson(collectedData, enumItem, 'enum');

  tableJson.members = enumItem.members.map((member: ApiEnumMember) => createEnumTableRowJson(collectedData, member));

  return tableJson;
}

function createClassPageJson(collectedData: ICollectedData, classItem: ApiClass): ITableJson {
  const tableJson = createBasicTableJson(collectedData, classItem, 'class', classItem.extendsType);

  tableJson.members = classItem.members
    .map((member: ApiItem) => createTableRowJson(collectedData, member))
    .filter((row: ITableRowJson | undefined): row is ITableRowJson => !!row)
    // Constructor goes first
    .sort((a: ITableRowJson, b: ITableRowJson) => (a.name === 'constructor' ? -1 : 0));

  return tableJson;
}

function createTypeAliasPageJson(collectedData: ICollectedData, typeAliasItem: ApiTypeAlias): ITableJson {
  const tableJson = createBasicTableJson(collectedData, typeAliasItem, 'typeAlias');

  tableJson.extendsTokens = getTokenHyperlinks(
    collectedData,
    typeAliasItem.excerptTokens,
    typeAliasItem.excerpt.tokenRange,
    true,
  );

  return tableJson;
}
