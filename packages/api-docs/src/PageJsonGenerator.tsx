import * as path from 'path';
import {
  DocExcerpt,
  DocInlineTag,
  DocNodeKind,
  DocSection,
  DocComment,
  DocPlainText,
  DocParagraph,
  DocNode,
  DocNodeTransforms,
  DocLinkTag,
  DocNodeContainer,
  DocCodeSpan
} from '@microsoft/tsdoc';
import {
  ApiClass,
  ApiEntryPoint,
  ApiEnum,
  ApiEnumMember,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiDocumentedItem,
  ApiMethod,
  ApiMethodSignature,
  ApiModel,
  ApiPackage,
  ApiProperty,
  ApiPropertySignature,
  ApiTypeAlias,
  ExcerptToken,
  IExcerptTokenRange,
  ApiDeclaredItem,
  ApiConstructor,
  HeritageType
} from '@microsoft/api-extractor-model';
import { FileSystem, JsonFile } from '@microsoft/node-core-library';
import { IPageJson, ITableJson, ILinkToken, ITableRowJson, IEnumTableRowJson, PageKind, IPageJsonOptions } from './PageJsonGenerator.types';

/**
 * Api items associated with a page
 */
class PageData {
  public readonly pageName: string;
  public kind: PageKind;
  public apiItems: ApiItem[] = [];

  public constructor(pageName: string, kind: PageKind) {
    this.pageName = pageName;
    this.kind = kind;
  }
}

class CollectedData {
  /**
   * Map of page name to PageData
   */
  public pagesByName: Map<string, PageData> = new Map<string, PageData>();
  public pagesByApi: Map<string, PageData> = new Map<string, PageData>();
  public apiModel: ApiModel = new ApiModel();
}

/**
 * Function to create the api page json files
 *
 * @param options - The options for the page, including the path of the api.json file,
 * where to create the api page jsons, and the name of the pages to create.
 */
export function generateJson(options: IPageJsonOptions[]): void {
  const collectedData: CollectedData = new CollectedData();

  for (const option of options) {
    // collect page data
    // Create the folder if it doesn't already exist
    FileSystem.ensureFolder(option.pageJsonFolderPath);

    console.log('Deleting contents of ' + option.pageJsonFolderPath);
    FileSystem.ensureEmptyFolder(option.pageJsonFolderPath);

    for (const apiJsonPath of option.apiJsonPaths) {
      console.log('Loading ' + apiJsonPath);

      const apiPackage: ApiPackage = collectedData.apiModel.loadPackage(apiJsonPath);

      console.log('Successfully loaded ' + apiJsonPath);

      const apiEntryPoint: ApiEntryPoint = apiPackage.entryPoints.slice(-1)[0];

      collectPageData(collectedData, apiEntryPoint, option.kind);
    }
  }

  // create files
  for (const option of options) {
    createPageJsonFiles(collectedData, option);
  }
}

/**
 * Create file for each page
 *
 * @param collectedData - Collected data
 * @param options - Page json options
 */
function createPageJsonFiles(collectedData: CollectedData, options: IPageJsonOptions): void {
  const kind = options.kind;

  collectedData.pagesByName.forEach((pageData: PageData, pageName: string) => {
    if (pageData.kind === kind) {
      const pageJsonPath: string = path.join(options.pageJsonFolderPath, pageName + '.page.json');
      console.log('Writing ' + pageJsonPath);

      const pageJson: IPageJson = { tables: [], name: pageName };
      for (const apiItem of pageData.apiItems) {
        switch (apiItem.kind) {
          case ApiItemKind.Interface: {
            pageJson.tables.push(createInterfacePageJson(collectedData, apiItem as ApiInterface));
            break;
          }
          case ApiItemKind.Enum: {
            pageJson.tables.push(createEnumPageJson(collectedData, apiItem as ApiEnum));
            break;
          }
          case ApiItemKind.Class: {
            pageJson.tables.push(createClassPageJson(collectedData, apiItem as ApiClass));
            break;
          }
          case ApiItemKind.TypeAlias: {
            pageJson.tables.push(createTypeAliasPageJson(collectedData, apiItem as ApiTypeAlias));
            break;
          }
        }
      }

      JsonFile.save(pageJson, pageJsonPath);
    }
  });
}

function renderNodes(apiModel: ApiModel, apiItem: ApiItem, section: DocNodeContainer): string {
  return section.nodes
    .map((node: DocNode) => renderNode(apiModel, apiItem, node))
    .join('')
    .trim();
}

/**
 * Extracts text from a doc node
 *
 * @param apiModel - Model containing all API info
 * @param apiItem - API item the node came from
 * @param node - Node from which to extract text
 */
function renderNode(apiModel: ApiModel, apiItem: ApiItem, node: DocNode): string {
  switch (node.kind) {
    case 'Paragraph':
      const transformedParagraph: DocParagraph = DocNodeTransforms.trimSpacesInParagraph(node as DocParagraph);
      return renderNodes(apiModel, apiItem, transformedParagraph);
    case 'LinkTag':
      return renderLinkTag(apiModel, apiItem, node as DocLinkTag);
    case 'CodeSpan':
      return '`' + (node as DocCodeSpan).code + '`';
    case 'PlainText':
      return (node as DocPlainText).text;
    case 'SoftBreak':
      return ' ';
    default:
      return '';
  }
}

/**
 * Render a link into text. For now we just extract the text or the code item name
 * (rather than returning an actual link).
 */
function renderLinkTag(apiModel: ApiModel, apiItem: ApiItem, link: DocLinkTag): string {
  if (link.linkText) {
    return link.linkText;
  } else if (link.codeDestination) {
    const result = apiModel.resolveDeclarationReference(link.codeDestination, apiItem);
    if (result.resolvedApiItem) {
      return result.resolvedApiItem.getScopedNameWithinPackage();
    }
  }
  return '';
}

/**
 * Generate an ITableJson for any top-level API item (interface, class, enum, type alias)
 * with the name, description, deprecated message, and optionally extends tokens pre-filled.
 */
function getTableJson(
  collectedData: CollectedData,
  apiItem: ApiDeclaredItem,
  kind: ITableJson['kind'],
  extendsTypes?: HeritageType | readonly HeritageType[]
): ITableJson {
  const { tsdocComment } = apiItem;
  const tableJson: ITableJson = {
    kind,
    name: apiItem.displayName,
    extendsTokens: [],
    members: [],
    deprecated: false,
    description: tsdocComment ? renderDocNodeWithoutInlineTag(tsdocComment.summarySection) : ''
  };

  if (extendsTypes) {
    const extendsArr: readonly HeritageType[] = Array.isArray(extendsTypes) ? extendsTypes : [extendsTypes];
    for (const extendsType of extendsArr) {
      if (tableJson.extendsTokens.length) {
        // if there are multiple extends types, we should separate them with a comma
        tableJson.extendsTokens.push({ text: ', ' });
      }
      tableJson.extendsTokens.push(...getTokenHyperlinks(collectedData, extendsType.excerpt.tokens, extendsType.excerpt.tokenRange));
    }
  }

  if (tsdocComment && tsdocComment.deprecatedBlock) {
    tableJson.deprecated = true;
    tableJson.deprecatedMessage = renderNodes(collectedData.apiModel, apiItem, tsdocComment.deprecatedBlock.content);
  }

  return tableJson;
}

/**
 * Generate an ITableRowJson for a class/interface/enum member with the name, description,
 * deprecated message, default value, and (optionally) type tokens pre-filled.
 * @param typeTokens - Optional list of tokens which includes the item type info.
 * @param typeTokenRange - Specific location of the item type within `typeTokens`.
 */
function getTableRowJson(
  collectedData: CollectedData,
  apiItem: ApiDeclaredItem & { name?: string },
  typeTokens?: readonly ExcerptToken[],
  typeTokenRange?: Readonly<IExcerptTokenRange>
): ITableRowJson {
  const { tsdocComment } = apiItem;
  const tableRowJson: ITableRowJson = {
    name: apiItem.name || '',
    typeTokens: [],
    description: tsdocComment ? renderDocNodeWithoutInlineTag(tsdocComment.summarySection) : '',
    deprecated: false
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
      tableRowJson.deprecatedMessage = renderNodes(collectedData.apiModel, apiItem, tsdocComment.deprecatedBlock.content);
    }
  }

  if (typeTokens && typeTokenRange) {
    tableRowJson.typeTokens = getTokenHyperlinks(collectedData, typeTokens, typeTokenRange);
  }

  return tableRowJson;
}

/**
 * Creates the interface page json object
 *
 * @param collectedData - Collected data to use for linking
 * @param interfaceItem - Interface item to search
 */
function createInterfacePageJson(collectedData: CollectedData, interfaceItem: ApiInterface): ITableJson {
  const tableJson: ITableJson = getTableJson(collectedData, interfaceItem, 'interface', interfaceItem.extendsTypes);
  const interfaceTableRowJson = tableJson.members as ITableRowJson[];

  for (const member of interfaceItem.members) {
    switch (member.kind) {
      case ApiItemKind.PropertySignature: {
        const apiPropertySignature: ApiPropertySignature = member as ApiPropertySignature;
        const tableRowJson: ITableRowJson = getTableRowJson(
          collectedData,
          apiPropertySignature,
          apiPropertySignature.excerptTokens,
          apiPropertySignature.propertyTypeExcerpt.tokenRange
        );

        interfaceTableRowJson.push(tableRowJson);
        break;
      }

      case ApiItemKind.MethodSignature: {
        const apiMethodSignature: ApiMethodSignature = member as ApiMethodSignature;
        const tableRowJson: ITableRowJson = getTableRowJson(collectedData, apiMethodSignature);

        tableRowJson.typeTokens = getTokenHyperlinks(
          collectedData,
          apiMethodSignature.excerptTokens,
          apiMethodSignature.excerpt.tokenRange
        );

        interfaceTableRowJson.push(tableRowJson);
        break;
      }

      case ApiItemKind.Function: {
        break;
      }
      case ApiItemKind.Class: {
        break;
      }
    }
  }

  return tableJson;
}

/**
 * Creates an enum table json object
 */
function createEnumPageJson(collectedData: CollectedData, enumItem: ApiEnum): ITableJson {
  const tableJson: ITableJson = getTableJson(collectedData, enumItem, 'enum');
  const enumTableRowJson = tableJson.members as IEnumTableRowJson[];

  for (const member of enumItem.members) {
    switch (member.kind) {
      case ApiItemKind.EnumMember: {
        const apiEnumMember: ApiEnumMember = member as ApiEnumMember;

        const { name, description, deprecated, deprecatedMessage } = getTableRowJson(collectedData, apiEnumMember);
        const tableRowJson: IEnumTableRowJson = {
          name,
          description,
          deprecated,
          value: getTokensInRange(apiEnumMember.excerptTokens, apiEnumMember.excerpt.tokenRange)
            .map((token: ExcerptToken) => token.text)
            .join('')
        };
        if (deprecatedMessage) {
          tableRowJson.deprecatedMessage = deprecatedMessage; // avoid undefined members error
        }

        enumTableRowJson.push(tableRowJson);
        break;
      }
    }
  }

  return tableJson;
}

/**
 * Creates a class table json object
 *
 * @param collectedData - Collected data to use for linking
 * @param classItem - Class item to search
 */
function createClassPageJson(collectedData: CollectedData, classItem: ApiClass): ITableJson {
  const tableJson: ITableJson = getTableJson(collectedData, classItem, 'class', classItem.extendsType);
  const classTableRowJson = tableJson.members as ITableRowJson[];

  for (const member of classItem.members) {
    switch (member.kind) {
      case ApiItemKind.Property: {
        const apiProperty: ApiProperty = member as ApiProperty;
        const tableRowJson: ITableRowJson = getTableRowJson(
          collectedData,
          apiProperty,
          apiProperty.excerptTokens,
          apiProperty.propertyTypeExcerpt.tokenRange
        );

        tableRowJson.kind = 'Property';

        classTableRowJson.push(tableRowJson);
        break;
      }

      case ApiItemKind.Constructor:
      case ApiItemKind.Method: {
        const apiMethod = member as (ApiMethod | ApiConstructor);
        const tableRowJson: ITableRowJson = getTableRowJson(
          collectedData,
          apiMethod,
          apiMethod.excerptTokens,
          apiMethod.excerpt.tokenRange
        );

        tableRowJson.kind = 'Method';

        if (member.kind === ApiItemKind.Constructor) {
          // The constructor is similar to a method, but we have to manually add the name.
          tableRowJson.name = 'constructor';
          classTableRowJson.unshift(tableRowJson);
        } else {
          classTableRowJson.push(tableRowJson);
        }
        break;
      }
    }
  }

  return tableJson;
}

/**
 * Creates a type alias json object
 * @param collectedData - Collected data to use for linking
 * @param typeAliasItem - Type alias item to search
 */
function createTypeAliasPageJson(collectedData: CollectedData, typeAliasItem: ApiTypeAlias): ITableJson {
  const tableJson: ITableJson = getTableJson(collectedData, typeAliasItem, 'typeAlias');

  tableJson.extendsTokens = getTokenHyperlinks(collectedData, typeAliasItem.excerptTokens, typeAliasItem.excerpt.tokenRange);

  return tableJson;
}

/**
 * Loops through excerpt tokens and returns a token array with hyperlink data
 *
 * @returns An array of ITokenJson objects with hyperlinks
 */
function getTokenHyperlinks(
  collectedData: CollectedData,
  excerptTokens: ReadonlyArray<ExcerptToken>,
  excerptTokenRange: Readonly<IExcerptTokenRange>
): ILinkToken[] {
  return getTokensInRange(excerptTokens, excerptTokenRange).map((token: ExcerptToken) => {
    const apiPage = collectedData.pagesByApi.get(token.text);
    if (apiPage) {
      return { text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind };
    } else {
      return { text: token.text };
    }
  });
}

/**
 * Renders the doc node (likely a DocComment's DocSection) without the inline tag
 *
 * @param docNode - Doc node from which to remove the inline tag
 */
function renderDocNodeWithoutInlineTag(docSection?: DocSection): string {
  let result = '';
  if (docSection) {
    if (docSection.kind === DocNodeKind.InlineTag) {
      return result;
    } else if (docSection instanceof DocExcerpt) {
      result += docSection.content.toString();
    }
    for (const childNode of docSection.getChildNodes()) {
      result += renderDocNodeWithoutInlineTag(childNode as DocSection);
    }
  }
  return result;
}

/**
 * Finds an inline tag by name from the provided doc comment
 *
 * @param tagName - Name of the inline tag
 * @param docComment - Doc comment to search
 */
function findInlineTagByName(tagName: string, docComment: DocComment): DocInlineTag | undefined {
  if (docComment instanceof DocInlineTag && docComment.tagName === tagName) {
    return docComment;
  }
  for (const childNode of docComment.getChildNodes()) {
    const result: DocInlineTag | undefined = findInlineTagByName(tagName, childNode as DocComment);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

/**
 * Gets the block tag by name
 *
 * @param docComment - doc comment to search
 */
function getBlockTagByName(tagName: string, docComment: DocComment): DocSection | undefined {
  for (const customBlock of docComment.customBlocks) {
    if (customBlock.blockTag.tagName === tagName.toLowerCase()) {
      return customBlock.content;
    }
  }
  return undefined;
}

function getTokensInRange(
  excerptTokens: ReadonlyArray<ExcerptToken>,
  excerptTokenRange: Readonly<IExcerptTokenRange>
): ReadonlyArray<ExcerptToken> {
  return excerptTokens.slice(excerptTokenRange.startIndex, excerptTokenRange.endIndex);
}

/**
 * Walk all the APIs and make an empty page data object for each page name (docCategory).
 */
function collectPageData(collectedData: CollectedData, apiItem: ApiItem, kind: PageKind): void {
  if (apiItem instanceof ApiDocumentedItem) {
    switch (apiItem.kind) {
      case ApiItemKind.Interface:
      case ApiItemKind.Enum:
      case ApiItemKind.Class:
      case ApiItemKind.TypeAlias: {
        // console.log('Analyzing ' + apiItem.displayName);

        if (apiItem.tsdocComment !== undefined) {
          const docCategoryTag: DocInlineTag | undefined = findInlineTagByName('@docCategory', apiItem.tsdocComment);

          if (docCategoryTag !== undefined) {
            const pageName: string = docCategoryTag.tagContent.trim();
            let pageData: PageData | undefined = collectedData.pagesByName.get(pageName);

            if (pageData === undefined) {
              pageData = new PageData(pageName, kind);
              collectedData.pagesByName.set(pageName, pageData);
              collectedData.pagesByApi.set(apiItem.displayName, pageData);
            } else {
              collectedData.pagesByApi.set(apiItem.displayName, pageData);
            }

            pageData!.apiItems.push(apiItem);
          }
        }
        break;
      }
    }
  }

  for (const memberApiItem of apiItem.members) {
    collectPageData(collectedData, memberApiItem, kind);
  }
}
