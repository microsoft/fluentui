import * as React from 'react';
import { css } from '../../utilities/css';
import { BaseComponent } from '../../common/BaseComponent';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { getNativeProps, imageProperties } from '../../utilities/properties';
import { IImageProps, ImageFit } from './Image.Props';

import './Image.scss';

export interface IImageState {
  loadState?: ImageLoadState;
}

export enum CoverStyle {
  landscape,
  portrait
}

export const CoverStyleMap = {
  [CoverStyle.landscape]: 'ms-Image-image--landscape',
  [CoverStyle.portrait]: 'ms-Image-image--portrait'
};

export const ImageFitMap = {
  [ImageFit.center]: 'ms-Image-image--center',
  [ImageFit.contain]: 'ms-Image-image--contain',
  [ImageFit.cover]: 'ms-Image-image--cover',
  [ImageFit.none]: 'ms-Image-image--none'
};

export enum ImageLoadState {
  notLoaded,
  loaded,
  error,
  errorLoaded
}

export class Image extends BaseComponent<IImageProps, IImageState> {
  public static defaultProps = {
    shouldFadeIn: true
  };

  private _coverStyle: CoverStyle;
  private _imageElement: HTMLImageElement;
  private _frameElement: HTMLDivElement;

  constructor(props: IImageProps) {
    super(props);

    this.state = {
      loadState: ImageLoadState.notLoaded
    };
  }

  public componentDidMount() {
    if (!this._evaluateImage()) {
      this._events.on(this._imageElement, 'load', this._evaluateImage);
      this._events.on(this._imageElement, 'error', this._setError);
    }
  }

  public componentWillReceiveProps(nextProps: IImageProps) {
    if (this.state.loadState === ImageLoadState.loaded) {
      let { height: nextHeight, width: nextWidth } = nextProps;
      let { height, width } = this.props;

      if (height !== nextHeight || width !== nextWidth) {
        this._computeCoverStyle(nextProps);
      }
    }
  }

  public render() {
    let imageProps = getNativeProps(this.props, imageProperties, ['width', 'height']);
    let { src, alt, width, height, shouldFadeIn, className, imageFit, errorSrc, role } = this.props;
    let { loadState } = this.state;
    let coverStyle = this._coverStyle;
    let loaded = loadState === ImageLoadState.loaded || loadState === ImageLoadState.errorLoaded;
    let srcToDisplay: string =
      (loadState === ImageLoadState.error || loadState === ImageLoadState.errorLoaded) ? errorSrc : src;

    // If image dimensions aren't specified, the natural size of the image is used.
    return (
      <div className={ css('ms-Image', className) } style={ { width: width, height: height } } ref={ this._resolveRef('_frameElement') }>
        <img
          { ...imageProps }
          className={
            css('ms-Image-image',
              (coverStyle !== undefined) && CoverStyleMap[coverStyle],
              (imageFit !== undefined) && ImageFitMap[imageFit], {
                'is-fadeIn': shouldFadeIn,
                'is-notLoaded': !loaded,
                'is-loaded': loaded,
                'ms-u-fadeIn400': loaded && shouldFadeIn,
                'is-error': loadState === ImageLoadState.error,
                'ms-Image-image--scaleWidth': (imageFit === undefined && !!width && !height),
                'ms-Image-image--scaleHeight': (imageFit === undefined && !width && !!height),
                'ms-Image-image--scaleWidthHeight': (imageFit === undefined && !!width && !!height),
              }) }
          ref={ this._resolveRef('_imageElement') }
          src={ srcToDisplay }
          alt={ alt }
          role={ role }
          />
      </div>
    );
  }

  private _evaluateImage(): boolean {
    let { src } = this.props;
    let { loadState } = this.state;
    let isLoaded = (src && this._imageElement.naturalWidth > 0 && this._imageElement.naturalHeight > 0);

    this._computeCoverStyle(this.props);

    if (isLoaded && loadState !== ImageLoadState.loaded && loadState !== ImageLoadState.errorLoaded) {
      this._events.off();
      this.setState({
        loadState: loadState === ImageLoadState.error ? ImageLoadState.errorLoaded : ImageLoadState.loaded
      });
    }

    return isLoaded;
  }

  private _computeCoverStyle(props: IImageProps) {
    let { imageFit, width, height } = props;
    if (imageFit === ImageFit.cover || imageFit === ImageFit.contain) {
      if (this._imageElement) {
        // Determine the desired ratio using the width and height props.
        // If those props aren't available, measure measure the frame.
        let desiredRatio;
        if (!!width && !!height) {
          desiredRatio = (width as number) / (height as number);
        } else {
          desiredRatio = this._frameElement.clientWidth / this._frameElement.clientHeight;
        }

        // Examine the source image to determine its original ratio.
        let naturalRatio = this._imageElement.naturalWidth / this._imageElement.naturalHeight;

        // Should we crop from the top or the sides?
        if (naturalRatio > desiredRatio) {
          this._coverStyle = CoverStyle.landscape;
        } else {
          this._coverStyle = CoverStyle.portrait;
        }
      }
    }
  }

  private _setError() {
    if (this.state.loadState !== ImageLoadState.error && this.state.loadState !== ImageLoadState.errorLoaded) {
      this.setState({
        loadState: ImageLoadState.error
      });
    }
  }
}
