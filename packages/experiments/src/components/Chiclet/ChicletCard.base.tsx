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

@customizable('ChicletCardBase', ['theme'])
export class ChicletCardBase extends BaseComponent<IChicletCardProps, any> {
  public static defaultProps: IChicletCardProps = {
    imageWidth: '198px',
    imageHeight: '122px'
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
          { image ?
            preview :
            (<Image
              src={ TestImages.documentPreviewTwo }
              role='presentation'
              alt=''
            />)
          }
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
    const image = (
      <Image
        width={ imageWidth }
        height={ imageHeight }
        src={ TestImages.documentPreview }
        role='presentation'
        alt={ imageAlt ? imageAlt : undefined }
      />
    );

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