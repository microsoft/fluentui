export interface IProperty {
  propertyName: string;
  extends?: string;
  extendsTokens?: ILinkToken[];
  description?: string;
  title: string;
  propertyType: PropertyType;
  property: IInterfaceProperty[] | IEnumProperty[];
  methods?: IMethod[];
}

/**
 * Used to keep track of where the page will live on the site
 */
export enum PageKind {
  References = 'References',
  Components = 'Components'
}

export interface ILinkToken {
  text: string;
  hyperlinkedPage?: string;
  pageKind?: PageKind;
}

export interface IInterfaceProperty {
  name: string;
  typeTokens: ILinkToken[];
  defaultValue: string;
  description: string;
  interfacePropertyType?: InterfacePropertyType;
  deprecatedMessage?: string;
  deprecated?: boolean;
}

export enum InterfacePropertyType {
  required = 0,
  optional = 1,
  deprecated = 2
}

export interface IEnumProperty {
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

export enum PropertyType {
  enum = 0,
  interface = 1,
  class = 2
}
