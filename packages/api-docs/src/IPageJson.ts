import { PageKind } from './PageJsonGenerator';

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
  descriptionHtml: string;
  deprecated: boolean;
  deprecatedMessage?: string;
}

export interface IEnumTableRowJson {
  name: string;
  descriptionHtml: string;
  value: string;
}

export interface ITableJson {
  kind: 'interface' | 'enum' | 'class';
  name: string;
  descriptionHtml: string;
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
