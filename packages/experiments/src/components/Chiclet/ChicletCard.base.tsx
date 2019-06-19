import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IChicletCardStyles, IChicletCardStyleProps, IChicletCardProps } from './ChicletCard.types';
import { renderIcon, renderPreview } from '../../utilities/chicletHelper';

const getClassNames = classNamesFunction<IChicletCardStyleProps, IChicletCardStyles>();

const PREVIEW_IMAGE_WIDTH = '198px';
const PREVIEW_IMAGE_HEIGHT = '122px';

export class ChicletCardBase extends BaseComponent<IChicletCardProps, {}> {
  public static defaultProps: IChicletCardProps = {
    imageWidth: PREVIEW_IMAGE_WIDTH,
    imageHeight: PREVIEW_IMAGE_HEIGHT
  };

  private _classNames: { [key in keyof IChicletCardStyles]: string };

  public render(): JSX.Element {
    const {
      title,
      itemType,
      description,
      image,
      imageWidth,
      imageHeight,
      imageAlt,
      url,
      onClick,
      className,
      footer,
      theme,
      styles
    } = this.props;
    const actionable = onClick ? true : false;

    const imageProvided: boolean = image !== undefined;
    const imageAltProvided: boolean = imageAlt !== undefined;

    this._classNames = getClassNames(styles, { theme: theme!, className, imageProvided, imageAltProvided });

    // if this element is actionable it should have an aria role
    const role = actionable ? (onClick ? 'button' : 'link') : undefined;
    const tabIndex = actionable ? 0 : undefined;

    return (
      <div tabIndex={tabIndex} role={role} onClick={actionable ? this._onClick : undefined} className={this._classNames.root}>
        <div className={this._classNames.preview}>
          {renderPreview(image, imageHeight, imageWidth, imageAlt)}
          {renderIcon(itemType, this._classNames.icon, false)}
        </div>
        <div className={this._classNames.info}>
          <div className={this._classNames.title}>{title ? title : null}</div>
          <div className={this._classNames.description}>{description ? description : url}</div>
          {footer}
        </div>
      </div>
    );
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(ev);
    }
  };
}
