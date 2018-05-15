import * as React from 'react';
import {
  BaseComponent,
  css,
  customizable,
  classNamesFunction
} from '../../Utilities';
import { IChicletCardStyles, IChicletCardStyleProps, IChicletCardProps } from './ChicletCard.types';
import { mergeStyles } from '../../Styling';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from 'office-ui-fabric-react/src/common/TestImages';

const getClassNames = classNamesFunction<IChicletCardStyleProps, IChicletCardStyles>();

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets';

const PREVIEW_IMAGE_WIDTH = '198px';
const PREVIEW_IMAGE_HEIGHT = '122px';

@customizable('ChicletCardBase', ['theme'])
export class ChicletCardBase extends BaseComponent<IChicletCardProps, any> {
  public static defaultProps: IChicletCardProps = {
    imageWidth: PREVIEW_IMAGE_WIDTH,
    imageHeight: PREVIEW_IMAGE_HEIGHT
  };

  private _classNames: { [key in keyof IChicletCardStyles]: string };

  public render() {
    const { title, openGraphType, description, image, imageType, imageWidth, imageHeight, imageAlt, url, onClick, className, footer, theme, getStyles } = this.props;
    const actionable = (onClick) ? true : false;

    this._classNames = getClassNames(getStyles, { theme: theme! });

    // if this element is actionable it should have an aria role
    const role = actionable ? (onClick ? 'button' : 'link') : undefined;
    const tabIndex = actionable ? 0 : undefined;

    var preview = this._renderPreviewImage(image, imageHeight, imageWidth, openGraphType);

    return (
      <div
        tabIndex={ tabIndex }
        role={ role }
        onClick={ actionable ? this._onClick : undefined }
        className={
          css('ms-ChicletCard', className, mergeStyles(this._classNames.root)) }
      >
        <div
          className={ mergeStyles(this._classNames.preview) }
        >
          { preview }
        </div>
        <div
          className={ mergeStyles(this._classNames.info) }
        >
          <div
            className={ mergeStyles(this._classNames.title) }
          >
            { title ? title : (null) }
          </div>
          <div
            className={ mergeStyles(this._classNames.description) }
          >
            { description ? description : url }
          </div>
          { footer }
        </div>
      </div>
    );
  }

  private _renderPreviewImage(imageUrl?: string, imageHeight?: string, imageWidth?: string, openGraphType?: string, imageAlt?: string): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    let image;
    if (imageUrl != null) {
      image = (
        <Image
          width={ imageWidth }
          height={ imageHeight }
          src={ imageUrl }
          role='presentation'
          alt={ imageAlt ? imageAlt : undefined }
        />
      );
    }
    else {
      image = (
        <Image
          width={ PREVIEW_IMAGE_WIDTH }
          height={ PREVIEW_IMAGE_HEIGHT }
          src={ openGraphType ? `${ASSET_CDN_BASE_URL}/brand-icons/document/svg/` + openGraphType + `_48x1.svg` : TestImages.documentPreview /* @todo: this will be replaced by something built by the design team */ }
          role='presentation'
          alt={ imageAlt ? imageAlt : undefined }
        />
      );
    }

    let src;
    if (openGraphType != null) {
      src = `${ASSET_CDN_BASE_URL}/brand-icons/product/svg/` + openGraphType + `_16x1_5.svg`;
    }
    let icon = <img className={ mergeStyles(this._classNames.icon) } src={ src } />;
    switch (openGraphType) { // for "hero" apps, we'll use the app icons
      case "word":
      case "docx":
        icon = <img className={ mergeStyles(this._classNames.icon) } src={ `${ASSET_CDN_BASE_URL}/brand-icons/product/svg/word_16x1_5.svg` } />;
        break;
      case "powerpoint":
      case "pptx":
        icon = <img className={ mergeStyles(this._classNames.icon) } src={ `${ASSET_CDN_BASE_URL}/brand-icons/product/svg/powerpoint_16x1_5.svg` } />;
        break;
      case "excel":
        icon = <img className={ mergeStyles(this._classNames.icon) } src={ `${ASSET_CDN_BASE_URL}/brand-icons/product/svg/excel_16x1_5.svg` } />;
        break;
    }

    return (
      <div>
        { image }
        { icon }
      </div>
    );
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(ev);
    }
  }

}