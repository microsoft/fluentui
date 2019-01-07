import * as React from 'react';
import { IBaseProps, IRefObject } from '../../Utilities';

export interface IDocumentCard {
  /**
   * Sets focus to the DocumentCard.
   */
  focus: () => void;
}

export interface IDocumentCardProps extends IBaseProps<IDocumentCard> {
  /**
   * Optional callback to access the IDocumentCard interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDocumentCard>;

  /**
   * The type of DocumentCard to display.
   * @defaultvalue DocumentCardType.normal
   */
  type?: DocumentCardType;

  /**
   * Function to call when the card is clicked or keyboard Enter/Space is pushed.
   */
  onClick?: (ev?: React.SyntheticEvent<HTMLElement>) => void;

  /**
   * A URL to navigate to when the card is clicked. If a function has also been provided,
   * it will be used instead of the URL.
   */
  onClickHref?: string;

  /**
   * Optional class for document card.
   */
  className?: string;

  /**
   * Hex color value of the line below the card, which should correspond to the document type.
   * This should only be supplied when using the 'compact' card layout.
   *
   * Deprecated at v4.17.1, to be removed at \>= v5.0.0.
   * @deprecated To be removed at v5.0.0.
   */
  accentColor?: string;
}

export enum DocumentCardType {
  /**
   * Standard DocumentCard.
   */
  normal = 0,
  /**
   * Compact layout. Displays the preview beside the details, rather than above.
   */
  compact = 1
}
