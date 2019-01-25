export interface IProperty {
  propertyName: string;
  extends?: string;
  extendsTokens?: ILinkToken[];
  description?: string;
  title: string;
  propertyType: PropertyType;
  property: IInterfaceProperty[] | IEnumProperty[];
}

export interface ILinkToken {
  text: string;
  hyperlinkedPage?: string;
}

export interface IInterfaceProperty {
  name: string;
  typeTokens: ILinkToken[];
  // defaultValue: string;
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

export enum PropertyType {
  enum = 0,
  interface = 1
}
