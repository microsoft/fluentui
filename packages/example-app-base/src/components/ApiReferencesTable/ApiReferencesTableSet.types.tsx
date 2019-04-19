import { InterfacePropertyType, PropertyType } from '../../utilities/parser/index';

/**
 * Props for the ApiReferencesTableSet
 */
export interface IApiReferencesTableSetProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * A json object to populate the table
   */
  jsonDocs?: IPageJson;
}

/**
 * Generic table row
 */
export interface ITableRowJson {
  name: string;
  typeTokens: ILinkToken[];
  defaultValue?: string;
  descriptionHtml: string;
  deprecated: boolean;
  deprecatedMessage?: string;
  kind?: 'Method' | 'Property';
}

/**
 * Enum table row
 */
export type IEnumTableRowJson = Required<Pick<ITableRowJson, 'name' | 'descriptionHtml'>> & {
  value: string;
};

/**
 * Api table
 */
export interface ITableJson {
  kind: 'interface' | 'enum' | 'class';
  name: string;
  extendsTokens: ILinkToken[];
  descriptionHtml: string;
  members: ITableRowJson[] | IEnumTableRowJson[];
}

/**
 * Structure of the page.json files
 */
export interface IPageJson {
  tables: ITableJson[];
  name: string;
}

/**
 * Generic api property
 */
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

/**
 * Excerpt token that is part of a type or extends block and may have a hyperlink
 */
export interface ILinkToken {
  text: string;
  hyperlinkedPage?: string;
  pageKind?: PageKind;
}

/**
 * Interface property
 */
export interface IApiInterfaceProperty {
  name: string;
  typeTokens: ILinkToken[];
  defaultValue: string;
  description: string;
  interfacePropertyType?: InterfacePropertyType;
  deprecatedMessage?: string;
  deprecated?: boolean;
}

/**
 * Enum property
 */
export interface IApiEnumProperty {
  name: string;
  description: string;
  value: string;
}

/**
 * Class method
 */
export interface IMethod {
  name: string;
  // signature
  typeTokens: ILinkToken[];
  description: string;
}
