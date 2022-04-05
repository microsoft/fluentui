import * as React from 'react';
import type { IStyle, ITheme } from '@fluentui/style-utilities';
import type { IRefObject, IStyleFunctionOrObject } from '@fluentui/utilities';

/**
 * {@docCategory Link}
 */
export interface ILink {
  /** Sets focus to the link. */
  focus(): void;
}

/**
 * @deprecated No longer used.
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

  /** Any other props for HTMLElements or a React component passed to `as` */
  [key: string]: any;
}

/**
 * Link component props. All built-in props for `<a>` and `<button>` are supported (including
 * various event handlers) even if not listed below.
 * {@docCategory Link}
 */
export interface ILinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>,
    Omit<React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>, 'type'>,
    React.RefAttributes<HTMLElement> {
  /**
   * Optional callback to access the ILink interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ILink>;

  /**
   * URL the link points to. If not provided, the link renders as a button (unless that behavior is
   * overridden using `as`).
   */
  href?: string;

  /**
   * Where to open the linked URL. Common values are `_blank` (a new tab or window),
   * `_self` (the current window/context), `_parent`, and `_top`.
   */
  target?: string;

  /**
   * Relationship to the linked URL (can be a space-separated list).
   * Most common values are `noreferrer` and/or `noopener`.
   */
  rel?: string;

  /**
   * Click handler for the link.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => void;

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
   * A component type or primitive that is rendered as the type of the root element.
   */
  as?: React.ElementType;

  /**
   * Built-in HTML attribute with different behavior depending on how the link is rendered.
   * If rendered as `<a>`, hints at the MIME type.
   * If rendered as `<button>`, override the type of button (`button` is the default).
   */
  type?: string;

  /**
   * Whether the link is styled with an underline or not.
   * Should be used when the link is placed alongside other text content.
   */
  underline?: boolean;

  /** Any other props for elements or a React component passed to `as` */
  [key: string]: any;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyleProps {
  className?: string;
  isButton?: boolean;
  isDisabled?: boolean;
  isUnderlined?: boolean;
  theme: ITheme;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyles {
  root: IStyle;
}
