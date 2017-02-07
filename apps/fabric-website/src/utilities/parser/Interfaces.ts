
export interface IProperty {
  name: string;
  propertyName: string;
  propertyType: PropertyType;
  property: IInterfaceProperty[] | IEnumProperty[];
}

export interface IInterfaceProperty {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface IEnumProperty {
  name: string;
  description: string;
}

export interface IPropertiesTableProps {
  title?: string;
  properties: IInterfaceProperty[] | IEnumProperty[];
  renderAsEnum?: boolean;
  key?: string;
}

export enum PropertyType {
  enum = 0,
  interface = 1
}