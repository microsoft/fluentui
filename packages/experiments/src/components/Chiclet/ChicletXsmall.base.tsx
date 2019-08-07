import * as React from 'react';
import { css, classNamesFunction } from '../../Utilities';
import { IChicletCardStyles, IChicletCardStyleProps } from './ChicletCard.types';
import { IChicletCardProps } from './ChicletCard.types';
import { mergeStyles } from '../../Styling';

const getClassNames = classNamesFunction<IChicletCardStyleProps, IChicletCardStyles>();

const customPreviewStyling = mergeStyles({
  height: 60,
  width: '100%',
  objectFit: 'contain',
  overflow: 'hidden'
});

export class ChicletXsmallBase extends React.Component<IChicletCardProps, {}> {
  private _classNames: { [key in keyof IChicletCardStyles]: string };

  public render(): JSX.Element {
    const { onClick, title, className, footer, theme, styles, url } = this.props;

    const footerProvided = !!footer;

    this._classNames = getClassNames(styles, { theme: theme!, className, footerProvided });

    // if this element is actionable it should have an aria role
    const role = onClick ? 'button' : 'link';
    const tabIndex = onClick ? 0 : undefined;

    return (
      <div tabIndex={tabIndex} role={role} onClick={onClick} className={this._classNames.root}>
        {this._renderPreview()}
        <div className={this._classNames.info}>
          <div className={this._classNames.title}>{title ? title : null}</div>
          <div className={this._classNames.url}>{url}</div>
        </div>
        {footer}
      </div>
    );
  }

  private _renderPreview(): JSX.Element {
    const { image, imageAlt, preview } = this.props;

    return (
      <div className={this._classNames.preview}>
        {preview ? ( // render custom preview
          React.cloneElement(preview, { className: css(preview.props.className, customPreviewStyling) })
        ) : (
          <img width={'100%'} height={'auto'} src={image} alt={imageAlt ? imageAlt : undefined} />
        )}
      </div>
    );
  }
}
