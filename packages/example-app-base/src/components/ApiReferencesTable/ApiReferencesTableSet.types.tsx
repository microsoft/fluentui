import { InterfacePropertyType, PropertyType } from '../../utilities/parser/index';

export interface IApiReferencesTableSetProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * A json object to populate the table
   */
  jsonDocs?: IPageJson;
}

export interface ITokenJson {
  text: string;
  hyperlinkedPage?: string;
}

export interface ITableRowJson {
  name: string;
  typeTokens: ITokenJson[];
  defaultValue?: string;
  descriptionHtml: string;
  deprecated: boolean;
  deprecatedMessage?: string;
  kind?: 'Method' | 'Property';
}

export interface IEnumTableRowJson {
  name: string;
  descriptionHtml: string;
  value: string;
}

export interface ITableJson {
  kind: 'interface' | 'enum' | 'class';
  name: string;
  extendsTokens: ITokenJson[];
  descriptionHtml: string;
  members: ITableRowJson[] | IEnumTableRowJson[];
}

export interface IPageJson {
  tables: ITableJson[];
  name: string;
}

export interface IApiProperty {
  propertyName: string;
  extends?: string;
  extendsTokens?: ILinkToken[];
  description?: string;
  title: string;
  propertyType: PropertyType;
  property: IApiInterfaceProperty[] | IApiEnumProperty[];
  methods?: IMethod[];
}

/**
 * Used to keep track of where the page will live on the site
 */
export type PageKind = 'References' | 'Components';

export interface ILinkToken {
  text: string;
  hyperlinkedPage?: string;
  pageKind?: PageKind;
}

export interface IApiInterfaceProperty {
  name: string;
  typeTokens: ILinkToken[];
  defaultValue: string;
  description: string;
  interfacePropertyType?: InterfacePropertyType;
  deprecatedMessage?: string;
  deprecated?: boolean;
}

// export enum InterfacePropertyType {
//   required = 0,
//   optional = 1,
//   deprecated = 2
// }

export interface IApiEnumProperty {
  name: string;
  description: string;
  value: string;
}

export interface IMethod {
  name: string;
  // signature
  typeTokens: ILinkToken[];
  description: string;
}

// export enum PropertyType {
//   enum = 0,
//   interface = 1,
//   class = 2
// }
