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
 * Used to keep track of where an API reference page will live on the site.
 */
export type PageKind = 'References' | 'Components';

/**
 * Text excerpt token that is part of a type definition or extends block and may have a link
 * to another doc page.
 */
export interface ILinkToken {
  text: string;
  /** If this token is a link, name of the doc page it points to */
  hyperlinkedPage?: string;
  /** If this token is a link, kind of the doc page it points to */
  pageKind?: PageKind;
}

/**
 * Generic row for API reference tables.
 * It can represent a member (property or method) of an interface or class.
 */
export interface ITableRowJson {
  name: string;
  kind?: 'Method' | 'Property';
  /**
   * The row's type translated to an array of text elements and links to other types.
   * For example, `Readonly<IFoo>` would translate to:
   * `[{ text: 'Readonly<' }, { text: 'IFoo', hyperlinkedPage: '(page name)', pageKind: '(kind)' }, { text: '>' }]`
   */
  typeTokens: ILinkToken[];
  defaultValue?: string;
  description: string;
  deprecated: boolean;
  deprecatedMessage?: string;
}

/**
 * Enum member row for API reference tables.
 */
export type IEnumTableRowJson = Omit<ITableRowJson, 'kind' | 'typeTokens' | 'defaultValue'> & {
  value: string;
};

/**
 * Info for a table representing a top-level API item: interface, enum, class, or type alias.
 */
export interface ITableJson {
  kind: 'interface' | 'enum' | 'class' | 'typeAlias';
  name: string;
  description: string;
  /**
   * Any types the item extends, translated to an array of text elements and links to other types.
   * For classes and interfaces only.
   */
  extendsTokens: ILinkToken[];
  members: ITableRowJson[] | IEnumTableRowJson[];
  deprecated: boolean;
  deprecatedMessage?: string;
}

/**
 * Structure of the page.json files
 */
export interface IPageJson {
  tables: ITableJson[];
  name: string;
}
