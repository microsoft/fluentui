export interface IPropertiesTableSetProps {
  /**
   * Component name, assumes component resides in /components/[name]/ folder
   * and properties are at /components/[name]/[name].types.ts.
   */
  componentName?: string;

  /**
   * If provided, overrides componentName usage to derive the path to the props.
   * Example: 'utilities/focus/'
   */
  componentPath?: string;

  /**
   * If specified, will only render interfaces and enums specified here.
   */
  renderOnly?: Array<string>;

  /**
   * A set of pre-resolved source code.
   */
  sources?: string[];

  // tslint:disable-next-line:no-any
  jsonDocs?: IPageJson;
}

export interface ITokenJson {
  text: string;
  hyperlinkedPage?: string;
}

export interface ITableRowJson {
  name: string;
  typeTokens: ITokenJson[];
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
  extendsTokens: ITokenJson[];
  descriptionHtml: string;
  members: ITableRowJson[] | IEnumTableRowJson[];
}

export interface IPageJson {
  tables: ITableJson[];
}
