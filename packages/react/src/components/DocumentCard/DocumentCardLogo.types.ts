import * as React from 'react';
import { DocumentCardLogoBase } from './DocumentCardLogo.base';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardLogo {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardLogoProps extends React.ClassAttributes<DocumentCardLogoBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardLogo>;
  /**
   * Describes DocumentCard Logo badge.
   */
  logoIcon: string;

  /**
   * Describe Logo name, optional.
   */
  logoName?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardLogoStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardLogoStyles {
  root: IStyle;
}
