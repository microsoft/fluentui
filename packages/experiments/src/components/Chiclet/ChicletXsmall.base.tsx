import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import { IChicletXsmallStyles, IChicletXsmallStyleProps } from './ChicletXsmall.types';
import { IChicletCardProps } from './ChicletCard.types';
import { renderIcon, renderPreview, findIcon } from '../../utilities/chicletHelper';

const getClassNames = classNamesFunction<IChicletXsmallStyleProps, IChicletXsmallStyles>();

export class ChicletXsmallBase extends React.Component<IChicletCardProps, {}> {
  private _classNames: { [key in keyof IChicletXsmallStyles]: string };

  public render(): JSX.Element {
    const { onClick, title, itemType, image, imageWidth, imageHeight, imageAlt, className, footer, theme, styles, url } = this.props;

    const footerProvided: boolean = footer !== undefined;
    const imageProvided = !!image || !!imageAlt;

    this._classNames = getClassNames(styles, { theme: theme!, className, footerProvided });

    // if this element is actionable it should have an aria role
    const role = onClick ? 'button' : 'link';
    const tabIndex = onClick ? 0 : undefined;

    return (
      <div tabIndex={tabIndex} role={role} onClick={this._onClick} className={this._classNames.root}>
        <div className={this._classNames.preview}>
          {renderPreview(image, imageHeight, imageWidth, imageAlt)}
          {renderIcon(itemType || (title && findIcon(title, url)), this._classNames.icon, imageProvided)}
        </div>
        <div className={this._classNames.info}>
          <div className={this._classNames.title}>{title ? title : null}</div>
          <div className={this._classNames.url}>{url ? url : null}</div>
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
