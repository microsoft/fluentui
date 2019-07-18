import * as React from 'react';
import { LinkBase } from './Link.base';

import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';

/**
 * {@docCategory Link}
 */
export interface ILink {
  /** Sets focus to the link. */
  focus(): void;
}

/**
 * {@docCategory Link}
 */
export interface ILinkHTMLAttributes<T> extends React.HTMLAttributes<T> {
  // Shared
  type?: string;

  // Anchor
  download?: any;
  href?: string;
  hrefLang?: string;
  media?: string;
  rel?: string;
  target?: string;

  // Button
  autoFocus?: boolean;
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  value?: string | string[] | number;

  // Any other props for HTMLElements or a React component passed to as=
  [index: string]: any;
}

/**
 * {@docCategory Link}
 */
export interface ILinkProps extends ILinkHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement | LinkBase> {
  /**
   * Optional callback to access the ILink interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ILink>;

  /**
   * Whether the link is disabled
   */
  disabled?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * A component that should be used as the root element of the link returned from the Link component.
   */
  as?: string | React.ComponentClass | React.StatelessComponent;

  /**
   * Optional keytip for this Link
   */
  keytipProps?: IKeytipProps;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyleProps {
  className?: string;
  isButton?: boolean;
  isDisabled?: boolean;
  theme: ITheme;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyles {
  root: IStyle;
}
