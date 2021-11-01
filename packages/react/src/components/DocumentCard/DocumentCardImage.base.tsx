import * as React from 'react';
import { Icon } from '../../Icon';
import { Image } from '../../Image';
import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  IDocumentCardImageProps,
  IDocumentCardImageStyleProps,
  IDocumentCardImageStyles,
} from './DocumentCardImage.types';

export interface IDocumentCardImageState {
  readonly imageHasLoaded: boolean;
}

const getClassNames = classNamesFunction<IDocumentCardImageStyleProps, IDocumentCardImageStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardImageBase extends React.Component<IDocumentCardImageProps, IDocumentCardImageState> {
  private _classNames: IProcessedStyleSet<IDocumentCardImageStyles>;

  constructor(props: IDocumentCardImageProps) {
    super(props);

    initializeComponentRef(this);
    this.state = { imageHasLoaded: false };
  }

  public render(): JSX.Element {
    const { styles, width, height, imageFit, imageSrc } = this.props;

    this._classNames = getClassNames(styles!, this.props);

    return (
      <div className={this._classNames.root}>
        {imageSrc && (
          <Image
            width={width}
            height={height}
            imageFit={imageFit}
            src={imageSrc}
            role="presentation"
            alt=""
            onLoad={this._onImageLoad}
          />
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
      <div className={this._classNames.centeredIconWrapper}>
        <Icon className={this._classNames.centeredIcon} {...iconProps} />
      </div>
    );
  }

  private _renderCornerIcon(): JSX.Element {
    const { iconProps } = this.props;
    return <Icon className={this._classNames.cornerIcon} {...iconProps} />;
  }
}
