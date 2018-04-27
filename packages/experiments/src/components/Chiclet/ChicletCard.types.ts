import * as React from 'react';
import { ChicletCard } from './ChicletCard';
import { ITheme, IStyle } from '../../Styling';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IChicletAction } from './'

export interface IChicletCard {

}

export interface IChicletCardStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the icon that overlays the file preview image.
   */
  icon?: IStyle;

  /**
   * Style for the file preview image.
   */
  preview?: IStyle;

  /**
   * Style for preview information about the file, such as title and link.
   */
  info?: IStyle;

  /**
   * Style for the title of the file.
   */
  title?: IStyle;

  /**
   * Style for the link to the file.
   */
  link?: IStyle;

  /**
   * Style for the collective actions in the lower right of the component.
   */
  actions?: IStyle;

  /**
   * Style for the individual actions in the lower right of the component.
   */
  action?: IStyle;
}

export interface IChicletCardProps extends React.Props<ChicletCard> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChicletCard | null) => void;

  /**
   * Optional class for ChicletCard.
   */
  className?: string;

  /**
   * Function to call when the card is clicked or keyboard Enter/Space is pushed.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Actions to render
   */
  actions?: IChicletAction[] | undefined;

  /**
   * Styling for the ChicletCard.
   */
  styles?: IChicletCardStyles;

  /**
   * Theme for the component.
   */
  theme?: ITheme;

  /**
   * OpenGraph props.
   */
  title?: string;
  ogType?: string;
  description?: string;
  image?: string;
  imageSecureUrl?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  imageAlt?: string;
  url?: string;
}

export interface IChicletAction {
  /**
   * Icon to render
   */
  buttonProps: IButtonProps;

  /**
   * Function to call when the action is clicked.
   */
  onClick?: (ev?: any) => void;
}