import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css
} from '../../Utilities';
import { IChicletCardProps } from './Chiclet.types';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from 'office-ui-fabric-react/src/common/TestImages';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import * as stylesImport from './Chiclet.scss';
const styles: any = stylesImport;

export class ChicletCard extends BaseComponent<IChicletCardProps, any> {
  public render() {
    const { title, description, image, imageType, imageWidth, imageHeight, url, onClick, onClickHref } = this.props;
    const actionable = (onClick || onClickHref) ? true : false;

    var actions: IButtonProps[] = [
      { iconProps: { iconName: 'Breadcrumb' } },
      { iconProps: { iconName: 'Save' } },
      { iconProps: { iconName: 'Share' } }
    ];

    return (
      <FocusZone data-is-focusable={ true } allowFocusRoot>
        <div
          onKeyDown={ actionable ? this._onKeyDown : undefined }
          onClick={ actionable ? this._onClick : undefined }
        >
          <div
            className={ css('ms-ChicletCardPreview', styles.preview) }
          >
            <div className={ css('ms-ChicletCardPreview-iconContainer', styles.previewIconContainer) } >
              { image ?
                (<div>{ image }</div>) :
                (<Image
                  src={ TestImages.documentPreviewTwo }
                  role='presentation'
                  alt=''
                />)
              }
            </div>
          </div>
          <div
            className={ css('ms-ChicletCardInfo', styles.info) }
          >
            <div
              className={ css('ms-ChicletCardTitle', styles.title) }
            >
              { title ? title : "Title goes here and if it's really long it wraps around to the second line but does not make it to the third line" }
            </div>
            { imageType ? (<div>{ imageType }</div>) : (null) }
            { imageWidth ? (<div>{ imageWidth }</div>) : (null) }
            { imageHeight ? (<div>{ imageHeight }</div>) : (null) }
            <div
              className={ css('ms-ChicletCardLink', styles.link) }
            >
              { url ? url : "https://onedrive.com/files/v-lygi/39192908430" }
            </div>
            { description ? (<div>{ description }</div>) : (null) }
            <div className={ css('ms-ChicletCardActions', styles.actions) }>
              { actions && actions.map((action, index) => {
                return (
                  <div className={ css('ms-ChicletActions-action', styles.action) } key={ index }>
                    <IconButton { ...action } />
                  </div>
                );
              }) }
            </div>
          </div>
        </div>
      </FocusZone>
    );
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    this._onAction(ev);
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      this._onAction(ev);
    }
  }

  private _onAction = (ev: React.SyntheticEvent<HTMLElement>): void => {
    const { onClick, onClickHref } = this.props;

    if (onClick) {
      onClick(ev);
    } else if (!onClick && onClickHref) {
      // If no onClick Function was provided and we do have an onClickHref, redirect to the onClickHref
      window.location.href = onClickHref;
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

}