import type { ITheme, IStyle } from '../../Styling';
import type { IChicletProps } from './Chiclet.types';

export interface IChicletCard {}

export interface IChicletCardProps extends IChicletProps {}

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
   * Style for url.
   */
  url?: IStyle;

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
   * Style for the dile description, which could be a link, description, etc.
   */
  description?: IStyle;
}

export interface IChicletCardStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept footer prop.
   */
  footerProvided?: boolean;

  /**
   * Accept custom classNames
   */
  className?: string;
}
