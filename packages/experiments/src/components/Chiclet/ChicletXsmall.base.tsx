import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import { IChicletXsmallStyles, IChicletXsmallStyleProps } from './ChicletXsmall.types';
import { IChicletCardProps } from './ChicletCard.types';
import { renderIcon, renderPreview } from './ChicletGeneral';

const getClassNames = classNamesFunction<IChicletXsmallStyleProps, IChicletXsmallStyles>();

export class ChicletXsmallBase extends React.Component<IChicletCardProps, {}> {
  private _classNames: { [key in keyof IChicletXsmallStyles]: string };

  public render(): JSX.Element {
    const { onClick, title, image, imageWidth, imageHeight, imageAlt, itemType, className, footer, theme, styles } = this.props;

    this._classNames = getClassNames(styles, { theme: theme!, className });

    // if this element is actionable it should have an aria role
    const role = onClick ? 'button' : 'link';
    const tabIndex = onClick ? 0 : undefined;

    let tmpTitle: string | undefined = title;

    if (tmpTitle) {
      if (tmpTitle.length > 40) {
        let i = 20;
        let wSpaceFront = undefined;
        let wSpaceBack = undefined;
        while (i < 40 && (!wSpaceFront || !wSpaceBack)) {
          if (tmpTitle.charAt(i) === ' ') {
            wSpaceFront = i;
          }
          if (tmpTitle.charAt(tmpTitle.length - i) === ' ') {
            wSpaceBack = tmpTitle.length - i + 1;
          }
          i++;
        }
        if (!wSpaceBack) {
          wSpaceBack = i;
        }
        tmpTitle = tmpTitle.substring(0, wSpaceFront) + '...' + tmpTitle.substring(wSpaceBack, tmpTitle.length);
      }
    }

    if (!image && !imageAlt) {
      return (
        <div tabIndex={tabIndex} role={role} onClick={this._onClick} className={this._classNames.root}>
          {renderIcon(itemType, this._classNames.icon)}
          <div className={this._classNames.titleBox}>
            <div className={this._classNames.title}>{tmpTitle ? tmpTitle : null}</div>
          </div>
          {footer}
        </div>
      );
    }

    return (
      <div tabIndex={tabIndex} role={role} onClick={this._onClick} className={this._classNames.root}>
        <div className={this._classNames.preview}>{renderPreview(image, imageHeight, imageWidth, itemType, imageAlt)}</div>
        <div className={this._classNames.titleBox}>
          <div className={this._classNames.title}>{tmpTitle ? tmpTitle : null}</div>
        </div>
        {footer}
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
