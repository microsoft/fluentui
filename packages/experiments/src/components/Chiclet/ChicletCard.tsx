import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import {
  IChicletCardStyles
} from './ChicletCard.types';
import { IChicletCardProps, IChicletAction } from './ChicletCard.types';
import { mergeStyles } from '../../Styling';
import {
  getClassNames
} from './Chiclet.styles';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from 'office-ui-fabric-react/src/common/TestImages';

export class ChicletCard extends BaseComponent<IChicletCardProps, any> {
  private _classNames: IChicletCardStyles = {};

  public render() {
    const { styles: customStyles, title, ogType, description, image, imageType, imageWidth, imageHeight, imageAlt, url, onClick, className, actions, theme } = this.props;
    const actionable = (onClick) ? true : false;

    this._classNames = getClassNames(theme!, customStyles);

    // if this element is actionable it should have an aria role
    const role = actionable ? (onClick ? 'button' : 'link') : undefined;
    const tabIndex = actionable ? 0 : undefined;

    var preview = this._renderPreviewImage(image, imageHeight, imageWidth, ogType);

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
            { title ? title : "Placeholder" }
          </div>
          <div
            className={ mergeStyles(this._classNames.link) }
          >
            { url ? url : "https://onedrive.com/files/v-lygi/39192908430" }
          </div>
          { actions ? this._renderFooter(actions) : (null) }
        </div>
      </div>
    );
  }

  private _renderPreviewImage(imageUrl?: string, imageHeight?: string, imageWidth?: string, ogType?: string, imageAlt?: string): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    const image = (
      <Image
        width={ imageWidth }
        height={ imageHeight }
        src={ TestImages.documentPreview }
        role='presentation'
        alt={ imageAlt ? imageAlt : undefined }
      />
    );

    let icon;
    switch (ogType) {
      case "word":
        icon = <Icon className={ mergeStyles(this._classNames.icon) } iconName='WordDocument' />;
        break;
      case "powerpoint":
        icon = <Icon className={ mergeStyles(this._classNames.icon) } iconName='PowerPointDocument' />;
        break;
      case "excel":
        icon = <Icon className={ mergeStyles(this._classNames.icon) } iconName='ExcelDocument' />;
        break;
    }

    return (
      <div>
        { image }
        { icon }
      </div>
    );
  }

  private _renderFooter(actions: IChicletAction[]): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    return (
      <div className={ mergeStyles(this._classNames.actions) }>
        { actions && actions.map((action, index) => {
          return (
            <div className={ mergeStyles(this._classNames.action) } key={ index }>
              <IconButton { ...action.buttonProps } />
            </div>
          );
        }) }
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