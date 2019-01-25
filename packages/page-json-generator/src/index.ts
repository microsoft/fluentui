import * as path from 'path';
import { DocExcerpt, DocInlineTag, DocNode, DocNodeKind } from '@microsoft/tsdoc';
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
  ExcerptToken
} from '@microsoft/api-extractor';
import { FileSystem, JsonFile } from '@microsoft/node-core-library';
import { IPageJson, ITableJson, ITableRowJson, IEnumTableRowJson } from './IPageJson';

export interface IPageJsonOptions {
  apiJsonPath: string;
  pageJsonFolderPath: string;
  pageNames: string[];
}

class PageData {
  public readonly pageName: string;
  public apiItems: ApiItem[] = [];

  public constructor(pageName: string) {
    this.pageName = pageName;
  }
}

class CollectedData {
  public pageDataByPageName: Map<string, PageData> = new Map<string, PageData>();
}

function findInlineTagByName(tagName: string, docNode: DocNode): DocInlineTag | undefined {
  if (docNode instanceof DocInlineTag) {
    if (docNode.tagName === tagName) {
      return docNode;
    }
  }
  for (const childNode of docNode.getChildNodes()) {
    const result: DocInlineTag | undefined = findInlineTagByName(tagName, childNode);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

function collectPageData(collectedData: CollectedData, apiItem: ApiItem): void {
  if (apiItem instanceof ApiDocumentedItem) {
    switch (apiItem.kind) {
      case ApiItemKind.Interface:
      case ApiItemKind.Enum:
      case ApiItemKind.Class: {
        console.log('Analyzing ' + apiItem.displayName);
        if (apiItem.tsdocComment !== undefined) {
          const docCategoryTag: DocInlineTag | undefined = findInlineTagByName('@docCategory', apiItem.tsdocComment);
          if (docCategoryTag !== undefined) {
            console.log('FOUND TAG: ' + JSON.stringify(docCategoryTag.tagContent));
            const pageName: string = docCategoryTag.tagContent.trim();
            const pageData: PageData | undefined = collectedData.pageDataByPageName.get(pageName);
            if (pageData === undefined) {
              console.log('Warning: Unrecognized page name: ' + pageName);
              return;
            }

            pageData.apiItems.push(apiItem);
          }
        }
        break;
      }
    }
  }
  for (const memberApiItem of apiItem.members) {
    collectPageData(collectedData, memberApiItem);
  }
}

function renderDocNodeWithoutInlineTag(docNode?: DocNode): string {
  let result: string = '';
  if (docNode) {
    if (docNode.kind === DocNodeKind.InlineTag) {
      return result;
    } else if (docNode instanceof DocExcerpt) {
      result += docNode.content.toString();
    }
    for (const childNode of docNode.getChildNodes()) {
      result += renderDocNodeWithoutInlineTag(childNode);
    }
  }
  return result;
}

function createInterfacePageJson(interfaceItem: ApiInterface): ITableJson {
  const interfaceTableRowJson: ITableRowJson[] = [];

  const tableJson: ITableJson = {
    kind: 'interface',
    name: interfaceItem.displayName,
    extendsTokens: [],
    descriptionHtml: '',
    members: interfaceTableRowJson
  };

  if (interfaceItem.tsdocComment) {
    tableJson.descriptionHtml += renderDocNodeWithoutInlineTag(interfaceItem.tsdocComment.summarySection);
  }

  for (const extendsType of interfaceItem.extendsTypes) {
    // This API could be improved
    for (let i: number = extendsType.excerpt.tokenRange.startIndex; i < extendsType.excerpt.tokenRange.endIndex; ++i) {
      const token: ExcerptToken = extendsType.excerpt.tokens[i];
      tableJson.extendsTokens.push({ text: token.text });
    }
  }
  for (const member of interfaceItem.members) {
    switch (member.kind) {
      case ApiItemKind.PropertySignature: {
        const apiPropertySignature: ApiPropertySignature = member as ApiPropertySignature;
        const tableRowJson: ITableRowJson = {
          name: apiPropertySignature.name,
          typeTokens: [],
          descriptionHtml: '',
          deprecated: false
        };

        for (
          let i: number = apiPropertySignature.propertyTypeExcerpt.tokenRange.startIndex;
          i < apiPropertySignature.propertyTypeExcerpt.tokenRange.endIndex;
          ++i
        ) {
          const token: ExcerptToken = apiPropertySignature.excerptTokens[i];
          tableRowJson.typeTokens.push({ text: token.text });

          // TODO: If it's a reference, add the hyperlinkedPage
        }
        if (apiPropertySignature.tsdocComment) {
          if (apiPropertySignature.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.descriptionHtml += renderDocNodeWithoutInlineTag(apiPropertySignature.tsdocComment.summarySection);
        }
        interfaceTableRowJson.push(tableRowJson);
        break;
      }
      case ApiItemKind.MethodSignature: {
        const apiMethodSignature: ApiMethodSignature = member as ApiMethodSignature;
        const tableRowJson: ITableRowJson = {
          name: apiMethodSignature.name,
          typeTokens: [],
          descriptionHtml: '',
          deprecated: false
        };

        for (let i: number = apiMethodSignature.excerpt.tokenRange.startIndex; i < apiMethodSignature.excerpt.tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiMethodSignature.excerptTokens[i];
          tableRowJson.typeTokens.push({ text: token.text });

          // TODO: If it's a reference, add the hyperlinkedPage
        }
        if (apiMethodSignature.tsdocComment) {
          if (apiMethodSignature.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.descriptionHtml += renderDocNodeWithoutInlineTag(apiMethodSignature.tsdocComment.summarySection);
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

function createEnumPageJson(enumItem: ApiEnum): ITableJson {
  const enumTableRowJson: IEnumTableRowJson[] = [];

  const tableJson: ITableJson = {
    kind: 'enum',
    name: enumItem.displayName,
    extendsTokens: [],
    descriptionHtml: '',
    members: enumTableRowJson
  };

  if (enumItem.tsdocComment) {
    tableJson.descriptionHtml += renderDocNodeWithoutInlineTag(enumItem.tsdocComment.summarySection);
  }

  // TODO: figure out issue with excerpt token range for enums
  // for (let i: number = enumItem.excerpt.tokenRange.startIndex; i < enumItem.excerpt.tokenRange.endIndex; ++i) {
  //   const token: ExcerptToken = enumItem.excerpt.tokens[i];
  //   tableJson.extendsTokens.push({ text: token.text });
  // }

  for (const member of enumItem.members) {
    switch (member.kind) {
      case ApiItemKind.EnumMember: {
        const apiEnumMember: ApiEnumMember = member as ApiEnumMember;
        const tableRowJson: IEnumTableRowJson = {
          name: apiEnumMember.name,
          descriptionHtml: '',
          value: '0'
        };

        for (let i: number = apiEnumMember.excerpt.tokenRange.startIndex; i < apiEnumMember.excerpt.tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiEnumMember.excerptTokens[i];
          tableRowJson.value = token.text;

          // TODO: If it's a reference, add the hyperlinkedPage
        }
        if (apiEnumMember.tsdocComment) {
          tableRowJson.descriptionHtml += renderDocNodeWithoutInlineTag(apiEnumMember.tsdocComment.summarySection);
        }
        enumTableRowJson.push(tableRowJson);
        break;
      }
    }
  }

  tableJson.members = enumTableRowJson;

  return tableJson;
}

function createClassPageJson(classItem: ApiClass): ITableJson {
  const classTableRowJson: ITableRowJson[] = [];

  const tableJson: ITableJson = {
    kind: 'class',
    name: classItem.displayName,
    extendsTokens: [],
    descriptionHtml: '',
    members: classTableRowJson
  };

  if (classItem.tsdocComment) {
    tableJson.descriptionHtml += renderDocNodeWithoutInlineTag(classItem.tsdocComment.summarySection);
  }

  for (let i: number = classItem.excerpt.tokenRange.startIndex; i < classItem.excerpt.tokenRange.endIndex; ++i) {
    const token: ExcerptToken = classItem.excerpt.tokens[i];
    tableJson.extendsTokens.push({ text: token.text });
  }

  for (const member of classItem.members) {
    switch (member.kind) {
      case ApiItemKind.Property: {
        const apiProperty: ApiProperty = member as ApiProperty;
        const tableRowJson: ITableRowJson = {
          name: apiProperty.name,
          typeTokens: [],
          descriptionHtml: '',
          deprecated: false
        };

        for (
          let i: number = apiProperty.propertyTypeExcerpt.tokenRange.startIndex;
          i < apiProperty.propertyTypeExcerpt.tokenRange.endIndex;
          ++i
        ) {
          const token: ExcerptToken = apiProperty.excerptTokens[i];
          tableRowJson.typeTokens.push({ text: token.text });

          // TODO: If it's a reference, add the hyperlinkedPage
        }
        if (apiProperty.tsdocComment) {
          if (apiProperty.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.descriptionHtml += renderDocNodeWithoutInlineTag(apiProperty.tsdocComment.summarySection);
        }
        classTableRowJson.push(tableRowJson);
        break;
      }
      case ApiItemKind.Method: {
        const apiMethod: ApiMethod = member as ApiMethod;
        const tableRowJson: ITableRowJson = {
          name: apiMethod.name,
          typeTokens: [],
          descriptionHtml: '',
          deprecated: false
        };

        for (let i: number = apiMethod.excerpt.tokenRange.startIndex; i < apiMethod.excerpt.tokenRange.endIndex; ++i) {
          const token: ExcerptToken = apiMethod.excerptTokens[i];
          tableRowJson.typeTokens.push({ text: token.text });

          // TODO: If it's a reference, add the hyperlinkedPage
        }
        if (apiMethod.tsdocComment) {
          if (apiMethod.tsdocComment.deprecatedBlock) {
            tableRowJson.deprecated = true;
          }

          tableRowJson.descriptionHtml += renderDocNodeWithoutInlineTag(apiMethod.tsdocComment.summarySection);
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

export function generateJson(options: IPageJsonOptions): void {
  // Create the folder if it doesn't already exist
  FileSystem.ensureFolder(options.pageJsonFolderPath);

  console.log('Deleting contents of ' + options.pageJsonFolderPath);
  FileSystem.ensureEmptyFolder(options.pageJsonFolderPath);

  console.log('Loading ' + options.apiJsonPath);

  const apiModel: ApiModel = new ApiModel();
  // NOTE: later you can load other packages into the model and process them together
  const apiPackage: ApiPackage = apiModel.loadPackage(options.apiJsonPath);

  console.log('Successfully loaded ' + options.apiJsonPath);

  const apiEntryPoint: ApiEntryPoint = apiPackage.entryPoints[0]; // assume there is only one entry point

  const collectedData: CollectedData = new CollectedData();
  for (const pageName of options.pageNames) {
    collectedData.pageDataByPageName.set(pageName, new PageData(pageName));
  }

  collectPageData(collectedData, apiEntryPoint);

  for (const pageName of options.pageNames) {
    const pageJsonPath: string = path.join(options.pageJsonFolderPath, pageName + '.page.json');
    console.log('Writing ' + pageJsonPath);

    const pageData: PageData = collectedData.pageDataByPageName.get(pageName)!;

    const pageJson: IPageJson = { tables: [] };
    for (const apiItem of pageData.apiItems) {
      switch (apiItem.kind) {
        case ApiItemKind.Interface: {
          pageJson.tables.push(createInterfacePageJson(apiItem as ApiInterface));
          break;
        }
        case ApiItemKind.Enum: {
          pageJson.tables.push(createEnumPageJson(apiItem as ApiEnum));
          break;
        }
        case ApiItemKind.Class: {
          pageJson.tables.push(createClassPageJson(apiItem as ApiClass));
          break;
        }
      }
    }

    JsonFile.save(pageJson, pageJsonPath);
  }
}
