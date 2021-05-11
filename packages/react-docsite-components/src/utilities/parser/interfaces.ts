export interface IProperty {
  name: string;
  propertyName: string;
  propertyType: PropertyType;
  property: IInterfaceProperty[] | IEnumProperty[];
}

export interface IInterfaceProperty {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
  interfacePropertyType: InterfacePropertyType;
  deprecatedMessage: string;
}

export enum InterfacePropertyType {
  required = 0,
  optional = 1,
  deprecated = 2,
}

export interface IEnumProperty {
  name: string;
  description: string;
}

export enum PropertyType {
  enum = 0,
  interface = 1,
  class = 2,
  typeAlias = 3,
}
