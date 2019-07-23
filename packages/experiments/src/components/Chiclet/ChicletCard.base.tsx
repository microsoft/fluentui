import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IChicletCardStyles, IChicletCardStyleProps, IChicletCardProps } from './ChicletCard.types';
import { Image } from 'office-ui-fabric-react/lib/Image';

const getClassNames = classNamesFunction<IChicletCardStyleProps, IChicletCardStyles>();

const PREVIEW_IMAGE_WIDTH = '198px';
const PREVIEW_IMAGE_HEIGHT = '122px';

export class ChicletCardBase extends BaseComponent<IChicletCardProps, {}> {
  private _classNames: { [key in keyof IChicletCardStyles]: string };

  public render(): JSX.Element {
    const { title, description, url, onClick, className, footer, theme, styles } = this.props;

    const actionable = onClick ? true : false;

    this._classNames = getClassNames(styles, { theme: theme!, className });

    // if this element is actionable it should have an aria role
    const role = onClick ? 'button' : 'link';
    const tabIndex = actionable ? 0 : undefined;

    return (
      <div tabIndex={tabIndex} role={role} onClick={onClick} className={this._classNames.root}>
        {this._renderPreview()}
        <div className={this._classNames.info}>
          <div className={this._classNames.title}>{title}</div>
          <div className={this._classNames.description}>{description ? description : url}</div>
          {footer}
        </div>
      </div>
    );
  }

  private _renderPreview(): JSX.Element {
    const { image, imageAlt, preview } = this.props;

    return (
      <div className={this._classNames.preview}>
        {preview ? (
          preview
        ) : (
          <Image
            width={PREVIEW_IMAGE_WIDTH}
            height={PREVIEW_IMAGE_HEIGHT}
            src={image}
            role="presentation"
            alt={imageAlt ? imageAlt : undefined}
          />
        )}
      </div>
    );
  }
}
