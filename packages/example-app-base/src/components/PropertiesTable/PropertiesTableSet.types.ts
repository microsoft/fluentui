export interface IPropertiesTableSetProps {
  /**
   * Component name. Assumes component resides in `components/[name]` folder
   * and properties are at `components/[name]/[name].types.ts`.
   */
  componentName?: string;

  /**
   * If provided, overrides componentName usage to derive the path to the props.
   * Example: `utilities/focus/`
   */
  componentPath?: string;

  /**
   * If specified, will only render interfaces and enums specified here.
   */
  renderOnly?: string[];

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
