import * as React from 'react';
import { DocumentCardTitleBase } from './DocumentCardTitle.base';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardTitle {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardTitleProps extends React.ClassAttributes<DocumentCardTitleBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardTitle>;

  /**
   * Title text.
   * If the card represents more than one document, this should be the title of one document and a "+X" string.
   * For example, a collection of four documents would have a string of "Document.docx +3".
   */
  title: string;

  /**
   * Whether we truncate the title to fit within the box. May have a performance impact.
   * @defaultvalue true
   */
  shouldTruncate?: boolean;

  /**
   * Whether show as title as secondary title style such as smaller font and lighter color.
   * @defaultvalue false
   */
  showAsSecondaryTitle?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardTitleStyleProps, IDocumentCardTitleStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * role prop passed by DocumentCard.
   * Value is determined when DocumentCard receives a role prop or an onClick prop.
   * Otherwise, this is undefined.
   */
  role?: string;

  /**
   * tabIndex prop passed by DocumentCard.
   * Value is determined when DocumentCard receives an onClick prop or an onClickHref prop.
   * Otherwise, this is undefined.
   */
  tabIndex?: number;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardTitleStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * Is this a secondary title?
   */
  showAsSecondaryTitle?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardTitleStyles {
  root: IStyle;
}
