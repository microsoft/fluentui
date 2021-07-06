import { IIconProps } from '../../Icon';
import { ImageFit } from '../../Image';
import { ILinkProps } from '../../Link';
import { IStyle, ITheme } from '../../Styling';
import { IBaseProps, IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardPreview {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardPreviewProps extends IBaseProps<{}> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardPreview>;

  /**
   * One or more preview images to display.
   */
  previewImages: IDocumentCardPreviewImage[];

  /**
   * The function return string that will describe the number of overflow documents.
   * such as  (overflowCount: number) =\> `+${ overflowCount } more`,
   */
  getOverflowDocumentCountText?: (overflowCount: number) => string;

  /**
   * Maximum number of document previews to display
   * @default 3
   */
  maxDisplayCount?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles>;

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
export interface IDocumentCardPreviewImage {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * File name for the document this preview represents.
   */
  name?: string;

  /**
   * URL to view the file.
   * @deprecated Use `href` inside of `linkProps` instead.
   */
  url?: string;

  /**
   * Props to pass to Link component
   */
  linkProps?: ILinkProps;

  /**
   * Path to the preview image.
   */
  previewImageSrc?: string;

  /**
   * @deprecated To be removed at \>= v2.0.0.
   */
  errorImageSrc?: string;

  /**
   * Path to the icon associated with this document type.
   *
   */
  iconSrc?: string;

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

  /**
   * Hex color value of the line below the preview, which should correspond to the document type.
   *
   * @deprecated To be removed at \>= v5.0.0.
   */
  accentColor?: string;

  /**
   * The props for the preview icon.
   * If provided, icon will be rendered instead of image.
   */
  previewIconProps?: IIconProps;

  /**
   * The props for the preview icon container classname.
   * If provided, icon container classname will be used..
   */
  previewIconContainerClass?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardPreviewStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * Is it a list of files rather than a preview image?
   */
  isFileList?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardPreviewStyles {
  root: IStyle;
  previewIcon: IStyle;
  icon: IStyle;
  fileList: IStyle;
  fileListIcon: IStyle;
  fileListLink: IStyle;
  fileListOverflowText: IStyle;
}
