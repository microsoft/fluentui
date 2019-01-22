import * as React from 'react';
import { Icon } from '../../Icon';
import { Image } from '../../Image';
import { IProcessedStyleSet } from '../../Styling';
import { BaseComponent, classNamesFunction, css } from '../../Utilities';
import { IDocumentCardImageProps, IDocumentCardImageStyleProps, IDocumentCardImageStyles } from './DocumentCardImage.types';

export interface IDocumentCardImageState {
  readonly imageHasLoaded: boolean;
}

const getClassNames = classNamesFunction<IDocumentCardImageStyleProps, IDocumentCardImageStyles>();

const defaultCenteredIconSize = '42px';
const cornerIconSize = '32px';

export class DocumentCardImageBase extends BaseComponent<IDocumentCardImageProps, IDocumentCardImageState> {
  private _classNames: IProcessedStyleSet<IDocumentCardImageStyles>;
  private _centeredIconSize: string | number;

  constructor(props: IDocumentCardImageProps) {
    super(props);
    this.state = { imageHasLoaded: false };
  }

  public render(): JSX.Element {
    const { styles, theme, className, width, height, imageFit, imageSrc, iconProps } = this.props;

    this._centeredIconSize = (iconProps && iconProps.style && iconProps.style.fontSize) || defaultCenteredIconSize;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      height,
      width,
      cornerIconSize,
      centeredIconSize: this._centeredIconSize
    });

    return (
      <div className={this._classNames.root}>
        {imageSrc && (
          <Image width={width} height={height} imageFit={imageFit} src={imageSrc} role="presentation" alt="" onLoad={this._onImageLoad} />
        )}
        {this.state.imageHasLoaded ? this._renderCornerIcon() : this._renderCenterIcon()}
      </div>
    );
  }

  private _onImageLoad = () => {
    this.setState({ imageHasLoaded: true });
  };

  private _renderCenterIcon(): JSX.Element {
    const { iconProps } = this.props;

    return (
      <div className={css(this._classNames.centeredIconWrapper)}>
        <Icon style={{ fontSize: this._centeredIconSize }} className={css(this._classNames.centeredIcon)} {...iconProps} />
      </div>
    );
  }

  private _renderCornerIcon(): JSX.Element {
    const { iconProps } = this.props;
    return <Icon style={{ fontSize: cornerIconSize }} className={css(this._classNames.cornerIcon)} {...iconProps} />;
  }
}
