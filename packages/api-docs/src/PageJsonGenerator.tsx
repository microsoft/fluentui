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
  DocNodeContainer
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
  ExcerptTokenKind
} from '@microsoft/api-extractor-model';
import { FileSystem, JsonFile } from '@microsoft/node-core-library';
import {
  IPageJson,
  ITableJson,
  ITableRowJson,
  IEnumTableRowJson,
  IReferencesList,
  PageKind,
  IPage,
  IPageJsonOptions
} from './PageJsonGenerator.types';

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
  public pageDataByPageName: Map<string, PageData> = new Map<string, PageData>();
  public apiToPage: Map<string, IPage> = new Map<string, IPage>();
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

      const apiModel: ApiModel = new ApiModel();
      // NOTE: later you can load other packages into the model and process them together
      const apiPackage: ApiPackage = apiModel.loadPackage(apiJsonPath);

      console.log('Successfully loaded ' + apiJsonPath);

      const apiEntryPoint: ApiEntryPoint = apiPackage.entryPoints[0]; // assume there is only one entry point

      // Store the data for each page in a map
      for (const pageName of option.pageNames) {
        collectedData.pageDataByPageName.set(pageName, new PageData(pageName, option.kind));
      }

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

  const referencesList: IReferencesList = { pages: [] };

  collectedData.pageDataByPageName.forEach((value: PageData, pageName: string) => {
    if (value.kind === kind) {
      const pageJsonPath: string = path.join(options.pageJsonFolderPath, pageName + '.page.json');
      console.log('Writing ' + pageJsonPath);

      const pageData: PageData = collectedData.pageDataByPageName.get(pageName)!;

      const pageJson: IPageJson = { tables: [], name: pageName };
      for (const apiItem of pageData.apiItems) {
        switch (apiItem.kind) {
          case ApiItemKind.Interface: {
            pageJson.tables.push(createInterfacePageJson(collectedData, apiItem as ApiInterface));
            break;
          }
          case ApiItemKind.Enum: {
            pageJson.tables.push(createEnumPageJson(apiItem as ApiEnum));
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

      if (value.kind === 'References') {
        referencesList.pages.push(value.pageName);
      }

      JsonFile.save(pageJson, pageJsonPath);
    }
  });
}

function renderDefaultValue(section: DocNodeContainer): string {
  let defaultValueAsString = '';
  for (const node of section.nodes) {
    defaultValueAsString += extractText(node);
  }
  return defaultValueAsString;
}

/**
 * Extracts text from a doc node
 *
 * @param node - Node from which to extract text
 */
function extractText(node: DocNode): string {
  switch (node.kind) {
    case 'Paragraph':
      const transformedParagraph: DocParagraph = DocNodeTransforms.trimSpacesInParagraph(node as DocParagraph);
      return renderDefaultValue(transformedParagraph);
    case 'CodeSpan':
    case 'PlainText':
      return (node as DocPlainText).text;
    case 'SoftBreak':
      return ' ';
    default:
      return '';
  }
}

/**
 * Creates the interface page json object
 *
 * @param collectedData - Collected data to use for linking
 * @param interfaceItem - Interface item to search
 */
function createInterfacePageJson(collectedData: CollectedData, interfaceItem: ApiInterface): ITableJson {
  const interfaceTableRowJson: ITableRowJson[] = [];

  const tableJson: ITableJson = {
    kind: 'interface',
    name: interfaceItem.displayName,
    extendsTokens: [],
    description: '',
    members: interfaceTableRowJson
  };

  if (interfaceItem.tsdocComment) {
    tableJson.description += renderDocNodeWithoutInlineTag(interfaceItem.tsdocComment.summarySection);
  }

  let numOfExtendsType = 0;
  for (const extendsType of interfaceItem.extendsTypes) {
    // if there are multiple extends types, we should separate them with a comma
    if (numOfExtendsType > 0) {
      tableJson.extendsTokens.push({ text: ', ' });
    }
    // This API could be improved
    const tokenRange = extendsType.excerpt.tokenRange;
    for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
      const token: ExcerptToken = extendsType.excerpt.tokens[i];
      if (token.kind === ExcerptTokenKind.Reference) {
        // search for reference in collectedData
        const apiPage = collectedData.apiToPage.get(token.text);
        if (apiPage) {
          tableJson.extendsTokens.push({ text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind });
        } else {
          tableJson.extendsTokens.push({ text: token.text });
        }
      } else {
        tableJson.extendsTokens.push({ text: token.text });
      }
    }
    numOfExtendsType++;
  }
  for (const member of interfaceItem.members) {
    switch (member.kind) {
      case ApiItemKind.PropertySignature: {
        const apiPropertySignature: ApiPropertySignature = member as ApiPropertySignature;
        const tableRowJson: ITableRowJson = {
          name: apiPropertySignature.name,
          typeTokens: [],
          description: '',
          deprecated: false
        };

        if (apiPropertySignature.tsdocComment) {
          let defaultValue = getBlockTagByName('@defaultValue', apiPropertySignature.tsdocComment);

          if (defaultValue === undefined) {
            defaultValue = getBlockTagByName('@defaultvalue', apiPropertySignature.tsdocComment);
          }

          if (defaultValue === undefined) {
            defaultValue = getBlockTagByName('@default', apiPropertySignature.tsdocComment);
          }

          let defaultValueAsString = '';
          if (defaultValue) {
            defaultValueAsString = renderDefaultValue(defaultValue);
          }
          tableRowJson.defaultValue = defaultValueAsString;
        }

        const tokenRange = apiPropertySignature.propertyTypeExcerpt.tokenRange;
        for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiPropertySignature.excerptTokens[i];
          if (token.kind === ExcerptTokenKind.Reference) {
            // search for reference in collectedData
            const apiPage = collectedData.apiToPage.get(token.text);
            if (apiPage !== undefined) {
              tableRowJson.typeTokens.push({ text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind });
            } else {
              tableRowJson.typeTokens.push({ text: token.text });
            }
          } else {
            tableRowJson.typeTokens.push({ text: token.text });
          }
        }
        if (apiPropertySignature.tsdocComment) {
          if (apiPropertySignature.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.description += renderDocNodeWithoutInlineTag(apiPropertySignature.tsdocComment.summarySection);
        }
        interfaceTableRowJson.push(tableRowJson);
        break;
      }
      case ApiItemKind.MethodSignature: {
        const apiMethodSignature: ApiMethodSignature = member as ApiMethodSignature;
        const tableRowJson: ITableRowJson = {
          name: apiMethodSignature.name,
          typeTokens: [],
          description: '',
          deprecated: false
        };

        const tokenRange = apiMethodSignature.excerpt.tokenRange;
        for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiMethodSignature.excerptTokens[i];
          if (token.kind === ExcerptTokenKind.Reference) {
            // search for reference in collectedData
            const apiPage = collectedData.apiToPage.get(token.text);
            if (apiPage !== undefined) {
              tableRowJson.typeTokens.push({ text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind });
            } else {
              tableRowJson.typeTokens.push({ text: token.text });
            }
          } else {
            tableRowJson.typeTokens.push({ text: token.text });
          }
        }
        if (apiMethodSignature.tsdocComment) {
          if (apiMethodSignature.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.description += renderDocNodeWithoutInlineTag(apiMethodSignature.tsdocComment.summarySection);
        }
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

  tableJson.members = interfaceTableRowJson;

  return tableJson;
}

/**
 * Creates an enum table json object
 *
 * @param enumItem - Enum item to search
 */
function createEnumPageJson(enumItem: ApiEnum): ITableJson {
  const enumTableRowJson: IEnumTableRowJson[] = [];

  const tableJson: ITableJson = {
    kind: 'enum',
    name: enumItem.displayName,
    extendsTokens: [],
    description: '',
    members: enumTableRowJson
  };

  if (enumItem.tsdocComment) {
    tableJson.description += renderDocNodeWithoutInlineTag(enumItem.tsdocComment.summarySection);
  }

  for (const member of enumItem.members) {
    switch (member.kind) {
      case ApiItemKind.EnumMember: {
        const apiEnumMember: ApiEnumMember = member as ApiEnumMember;
        const tableRowJson: IEnumTableRowJson = {
          name: apiEnumMember.name,
          description: '',
          value: '0'
        };

        const tokenRange = apiEnumMember.excerpt.tokenRange;
        for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiEnumMember.excerptTokens[i];
          tableRowJson.value = token.text;
        }
        if (apiEnumMember.tsdocComment) {
          tableRowJson.description += renderDocNodeWithoutInlineTag(apiEnumMember.tsdocComment.summarySection);
        }
        enumTableRowJson.push(tableRowJson);
        break;
      }
    }
  }

  tableJson.members = enumTableRowJson;

  return tableJson;
}

/**
 * Creates a class table json object
 *
 * @param collectedData - Collected data to use for linking
 * @param classItem - Class item to search
 */
function createClassPageJson(collectedData: CollectedData, classItem: ApiClass): ITableJson {
  const classTableRowJson: ITableRowJson[] = [];

  const tableJson: ITableJson = {
    kind: 'class',
    name: classItem.displayName,
    extendsTokens: [],
    description: '',
    members: classTableRowJson
  };

  if (classItem.tsdocComment) {
    tableJson.description += renderDocNodeWithoutInlineTag(classItem.tsdocComment.summarySection);
  }

  if (classItem.extendsType) {
    const tokenRange = classItem.extendsType.excerpt.tokenRange;
    for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
      const token: ExcerptToken = classItem.extendsType.excerpt.tokens[i];
      tableJson.extendsTokens.push({ text: token.text });
    }
  }

  for (const member of classItem.members) {
    switch (member.kind) {
      case ApiItemKind.Property: {
        const apiProperty: ApiProperty = member as ApiProperty;
        const tableRowJson: ITableRowJson = {
          name: apiProperty.name,
          typeTokens: [],
          description: '',
          deprecated: false,
          kind: 'Property'
        };

        if (classItem.tsdocComment) {
          let defaultValue = getBlockTagByName('@defaultValue', classItem.tsdocComment);

          if (defaultValue === undefined) {
            defaultValue = getBlockTagByName('@defaultvalue', classItem.tsdocComment);
          }

          if (defaultValue === undefined) {
            defaultValue = getBlockTagByName('@default', classItem.tsdocComment);
          }

          let defaultValueAsString = '';
          if (defaultValue) {
            defaultValueAsString = renderDefaultValue(defaultValue);
          }
          tableRowJson.defaultValue = defaultValueAsString;
        }

        const tokenRange = apiProperty.propertyTypeExcerpt.tokenRange;
        for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiProperty.excerptTokens[i];
          if (token.kind === ExcerptTokenKind.Reference) {
            // search for reference in collectedData
            const apiPage = collectedData.apiToPage.get(token.text);
            if (apiPage !== undefined) {
              tableRowJson.typeTokens.push({ text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind });
            } else {
              tableRowJson.typeTokens.push({ text: token.text });
            }
          } else {
            tableRowJson.typeTokens.push({ text: token.text });
          }
        }
        if (apiProperty.tsdocComment) {
          if (apiProperty.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.description += renderDocNodeWithoutInlineTag(apiProperty.tsdocComment.summarySection);
        }
        classTableRowJson.push(tableRowJson);
        break;
      }
      case ApiItemKind.Method: {
        const apiMethod: ApiMethod = member as ApiMethod;
        const tableRowJson: ITableRowJson = {
          name: apiMethod.name,
          typeTokens: [],
          description: '',
          deprecated: false,
          kind: 'Method'
        };

        const tokenRange = apiMethod.excerpt.tokenRange;
        for (let i: number = tokenRange.startIndex; i < tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiMethod.excerptTokens[i];
          if (token.kind === ExcerptTokenKind.Reference) {
            // search for reference in collectedData
            const apiPage = collectedData.apiToPage.get(token.text);
            if (apiPage !== undefined) {
              tableRowJson.typeTokens.push({ text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind });
            } else {
              tableRowJson.typeTokens.push({ text: token.text });
            }
          } else {
            tableRowJson.typeTokens.push({ text: token.text });
          }
        }
        if (apiMethod.tsdocComment) {
          if (apiMethod.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.description += renderDocNodeWithoutInlineTag(apiMethod.tsdocComment.summarySection);
        }
        classTableRowJson.push(tableRowJson);
        break;
      }
      case ApiItemKind.Constructor: {
        break;
      }
    }
  }

  tableJson.members = classTableRowJson;

  return tableJson;
}

/**
 * Creates a type alias json object
 * @param collectedData - Collected data to use for linking
 * @param typeAliasItem - Type alias item to search
 */
function createTypeAliasPageJson(collectedData: CollectedData, typeAliasItem: ApiTypeAlias): ITableJson {
  const tableJson: ITableJson = {
    kind: 'typeAlias',
    name: typeAliasItem.displayName,
    extendsTokens: [],
    description: '',
    members: []
  };

  if (typeAliasItem.tsdocComment) {
    tableJson.description += renderDocNodeWithoutInlineTag(typeAliasItem.tsdocComment.summarySection);
  }

  for (const token of typeAliasItem.excerptTokens) {
    if (token.kind === ExcerptTokenKind.Reference) {
      // search for reference in collectedData
      const apiPage = collectedData.apiToPage.get(token.text);
      if (apiPage !== undefined) {
        // not actually technically extendsTokens, but we'll handle the type alias differently
        tableJson.extendsTokens.push({ text: token.text, hyperlinkedPage: apiPage.pageName, pageKind: apiPage.kind });
      } else {
        tableJson.extendsTokens.push({ text: token.text });
      }
    } else {
      tableJson.extendsTokens.push({ text: token.text });
    }
  }

  return tableJson;
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
  if (docComment instanceof DocInlineTag) {
    if (docComment.tagName === tagName) {
      return docComment;
    }
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

/**
 * Loads api items into the page data object.
 *
 * @param collectedData - Map of strings to PageData
 * @param apiItem - The apiItem to inspect
 */
function collectPageData(collectedData: CollectedData, apiItem: ApiItem, kind: PageKind): void {
  if (apiItem instanceof ApiDocumentedItem) {
    switch (apiItem.kind) {
      case ApiItemKind.Interface:
      case ApiItemKind.Enum:
      case ApiItemKind.Class:
      case ApiItemKind.TypeAlias: {
        console.log('Analyzing ' + apiItem.displayName);

        if (apiItem.tsdocComment !== undefined) {
          const docCategoryTag: DocInlineTag | undefined = findInlineTagByName('@docCategory', apiItem.tsdocComment);

          if (docCategoryTag !== undefined) {
            const pageName: string = docCategoryTag.tagContent.trim();
            let pageData: PageData | undefined = collectedData.pageDataByPageName.get(pageName);

            if (pageData === undefined) {
              collectedData.pageDataByPageName.set(pageName, new PageData(pageName, 'References'));
              pageData = collectedData.pageDataByPageName.get(pageName);
              collectedData.apiToPage.set(apiItem.displayName, { pageName, kind: 'References' });
            } else {
              collectedData.apiToPage.set(apiItem.displayName, { pageName, kind: pageData.kind });
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
