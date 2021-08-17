import * as React from 'react';
import { DocumentCardStatusBase } from './DocumentCardStatus.base';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardStatus {}

/**
 * {@docCategory DocumentCard}
 */
// eslint-disable-next-line deprecation/deprecation
export interface IDocumentCardStatusProps extends React.Props<DocumentCardStatusBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardStatus>;

  /**
   * Describes DocumentCard status icon.
   */
  statusIcon?: string;

  /**
   * Describe status information. Required field.
   */
  status: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardStatusStyleProps, IDocumentCardStatusStyles>;

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
export interface IDocumentCardStatusStyleProps {
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
export interface IDocumentCardStatusStyles {
  root: IStyle;
}
