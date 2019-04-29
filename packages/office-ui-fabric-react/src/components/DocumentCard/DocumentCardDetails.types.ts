import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { DocumentCardDetailsBase } from './DocumentCardDetails.base';

export interface IDocumentCardDetails {}

export interface IDocumentCardDetailsProps extends React.Props<DocumentCardDetailsBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardDetails>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

export interface IDocumentCardDetailsStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

export interface IDocumentCardDetailsStyles {
  root: IStyle;
}
