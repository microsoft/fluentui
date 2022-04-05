import * as React from 'react';
import { DocumentCardActionsBase } from './DocumentCardActions.base';
import type { IButtonProps } from '../../Button';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardActions {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardActionsProps extends React.ClassAttributes<DocumentCardActionsBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardActions>;

  /**
   * The actions available for this document.
   */
  actions: IButtonProps[];

  /**
   * The number of views this document has received.
   */
  views?: Number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardActionsStyleProps, IDocumentCardActionsStyles>;

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
export interface IDocumentCardActionsStyleProps {
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
export interface IDocumentCardActionsStyles {
  root: IStyle;
  action: IStyle;
  views: IStyle;
  viewsIcon: IStyle;
}
