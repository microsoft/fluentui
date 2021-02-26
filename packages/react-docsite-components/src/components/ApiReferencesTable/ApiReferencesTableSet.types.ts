import * as React from 'react';
import { IPageJson, ILinkToken, ApiKind } from '@fluentui/react/lib/common/DocPage.types';

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

  /**
   * Resolve a token's page name and group to props for an actual link.
   * The default implementation assumes the table is on the Fabric website or demo app; this prop
   * allows customizing the table to work on other sites too.
   */
  tokenResolver?: TokenResolver;

  /** Show all tables on page load */
  showAll?: boolean;
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
  /**
   * Resolve a token's page name and group to props for an actual link.
   * The default implementation assumes the table is on the Fabric website or demo app; this prop
   * allows customizing the table to work on other sites too.
   */
  tokenResolver: TokenResolver;

  /** @deprecated Use `renderAs` */
  renderAsEnum?: boolean;
  /** @deprecated Use `renderAs` */
  renderAsClass?: boolean;
  /** @deprecated Use `renderAs` */
  renderAsTypeAlias?: boolean;
}

/** Resolve a token's page name and group to props for an actual link. */
export type TokenResolver = (token: Required<ILinkToken>) => { href: string; target?: string };

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
  required?: boolean;
}

export interface IApiEnumProperty extends IApiBaseItem {
  value: string;
}

/** Class method */
export interface IMethod extends IApiBaseItem {
  typeTokens: ILinkToken[];
}
