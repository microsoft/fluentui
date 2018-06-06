import * as React from 'react';
import { LinkBase } from './Link.base';

import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';

export interface ILink {
  /** Sets focus to the link. */
  focus(): void;
}

export interface ILinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement | LinkBase> {
  /**
   * Optional callback to access the ILink interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ILink | null) => void;

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

export interface ILinkStyleProps {
  className?: string;
  isButton?: boolean;
  isDisabled?: boolean;
  theme: ITheme;
}

export interface ILinkStyles {
  root: IStyle;
}
