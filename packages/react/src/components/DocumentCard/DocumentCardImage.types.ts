import { ImageFit } from '../../Image';
import type { IIconProps } from '../../Icon';
import type { IStyle, ITheme } from '../../Styling';
import type { IBaseProps, IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardImage {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardImageProps extends IBaseProps<{}> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardImage>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardImageStyleProps, IDocumentCardImageStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * Path to the preview image.
   */
  imageSrc?: string;

  /**
   * The props for the icon associated with this document type.
   */
  iconProps?: IIconProps;

  /**
   * If provided, forces the preview image to be this width.
   */
  width?: number;

  /**
   * If provided, forces the preview image to be this height.
   */
  height?: number;

  /**
   * Used to determine how to size the image to fit the dimensions of the component.
   * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
   */
  imageFit?: ImageFit;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardImageStyleProps extends IDocumentCardImageProps {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardImageStyles {
  root: IStyle;
  cornerIcon: IStyle;
  centeredIcon: IStyle;
  centeredIconWrapper: IStyle;
}
