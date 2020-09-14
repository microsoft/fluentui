/* eslint-disable @typescript-eslint/naming-convention */

import * as React from 'react';
import { IStyle, ITheme } from '@uifabric/styling';
import { IRefObject, IStyleFunctionOrObject } from '@uifabric/utilities';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';

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
  as?: React.ElementType;

  // Shared
  type?: string;

  // Anchor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

/**
 * {@docCategory Link}
 */
export interface ILinkProps extends ILinkHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement> {
  /**
   * Ref that is forwarded to the root element.
   */
  ref?: React.Ref<HTMLElement>;

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
   * Optional keytip.
   *
   * @deprecated This no longer works. Use `useKeytipData` hook instead.
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

/**
 * {@docCategory Link}
 */
export interface ILinkSlots {}

/**
 * {@docCategory Link}
 */
export type LinkSlotProps = {
  [key in keyof ILinkSlots]: ILinkProps[key];
};

/**
 * {@docCategory Link}
 */
export interface ILinkOptions {}
