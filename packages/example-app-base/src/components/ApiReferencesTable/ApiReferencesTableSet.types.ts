import { IPageJson, ILinkToken, ApiKind } from 'office-ui-fabric-react/lib/common/DocPage.types';

/**
 * Props for the ApiReferencesTableSet
 */
export interface IApiReferencesTableSetProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * A json object to populate the table
   */
  jsonDocs?: IPageJson;

  /**
   * If true (the default), listen for hash changes and if the hash includes an API element
   * rendered by this component, jump to it (expanding the "see more" section if needed).
   * If false, the component will still listen to hash changes and expand the "see more"
   * section if needed, but it won't jump.
   * @defaultvalue true
   */
  jumpToAnchors?: boolean;
}

/**
 * Info about a top-level API object such as a class, interface, enum, or type alias.
 * @deprecated Use `IApiReferencesTableProps`
 */
export interface IApiProperty {
  /** Table title to show in UI. */
  title: string;
  /** Item name, no spaces. Only used as ID for table header. */
  name: string;
  extendsTokens?: ILinkToken[];
  description?: string;
  renderAs: ApiKind;
  properties: IApiInterfaceProperty[] | IApiEnumProperty[];
  methods?: IMethod[];
  deprecatedMessage?: string;
  deprecated?: boolean;
}

/**
 * Props for a table about a top-level API object such as a class, interface, enum, or type alias.
 */
export interface IApiReferencesTableProps extends IApiProperty {
  /** @deprecated Use `renderAs` */
  renderAsEnum?: boolean;
  /** @deprecated Use `renderAs` */
  renderAsClass?: boolean;
  /** @deprecated Use `renderAs` */
  renderAsTypeAlias?: boolean;
}

/** Generic API item. Don't use directly. */
export interface IApiBaseItem {
  name: string;
  description: string;
  deprecatedMessage?: string;
  deprecated?: boolean;
}

export interface IApiInterfaceProperty extends IApiBaseItem {
  typeTokens: ILinkToken[];
  defaultValue?: string;
}

export interface IApiEnumProperty extends IApiBaseItem {
  value: string;
}

/** Class method */
export interface IMethod extends IApiBaseItem {
  typeTokens: ILinkToken[];
}
