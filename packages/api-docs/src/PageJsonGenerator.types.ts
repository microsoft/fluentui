/**
 * Options that define the information necessary to find the api.json file
 * and create individual page json files out of it
 */
export interface IPageJsonOptions {
  apiJsonPaths: string[];
  pageJsonFolderPath: string;
  pageNames: string[];
  kind: PageKind;
}

/**
 * The name of the page and what kind of page it is
 */
export interface IPage {
  pageName: string;
  kind: PageKind;
}

/**
 * Used to keep track of where the page will live on the site
 */
export type PageKind = 'References' | 'Components';

export interface ITokenJson {
  text: string;
  hyperlinkedPage?: string;
  pageKind?: PageKind;
}

export interface ITableRowJson {
  name: string;
  kind?: 'Method' | 'Property';
  typeTokens: ITokenJson[];
  defaultValue?: string;
  description: string;
  deprecated: boolean;
  deprecatedMessage?: string;
}

export interface IEnumTableRowJson {
  name: string;
  description: string;
  value: string;
}

export interface ITableJson {
  kind: 'interface' | 'enum' | 'class' | 'typeAlias';
  name: string;
  description: string;
  extendsTokens: ITokenJson[];
  members: ITableRowJson[] | IEnumTableRowJson[];
}

export interface IPageJson {
  tables: ITableJson[];
  name: string;
}

export interface IReferencesList {
  pages: string[];
}
