import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IBaseProps, IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCard {
  /**
   * Sets focus to the DocumentCard.
   */
  focus: () => void;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardProps extends IBaseProps<IDocumentCard>, React.HTMLAttributes<HTMLDivElement> {
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
   * Aria role assigned to the documentCard (Eg. button, link).
   * Use this to override the default assignment.
   * @defaultvalue When `onClick` is provided, default role will be 'button'. When `onClickHref` is provided, default role will be 'link'.
   */
  role?: string;

  /**
   * Hex color value of the line below the card, which should correspond to the document type.
   * This should only be supplied when using the 'compact' card layout.
   *
   * Deprecated at v4.17.1, to be removed at \>= v5.0.0.
   * @deprecated To be removed at v5.0.0.
   */
  accentColor?: string;

  /**
   * Child components to render within the card.
   */
  children?: React.ReactNode;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardStyleProps, IDocumentCardStyles>;

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

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * True when the card has a click action.
   */
  actionable?: boolean;

  /**
   * Compact variant of the card.
   */
  compact?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardStyles {
  root: IStyle;
}
