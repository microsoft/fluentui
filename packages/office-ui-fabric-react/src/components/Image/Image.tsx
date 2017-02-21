/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  autobind,
  BaseComponent,
  css,
  getNativeProps,
  imageProperties
} from '../../Utilities';
import { IImageProps, ImageFit, ImageLoadState } from './Image.Props';

import styles from './Image.scss';

export interface IImageState {
  loadState?: ImageLoadState;
}

export enum CoverStyle {
  landscape = 0,
  portrait = 1
}

export const CoverStyleMap = {
  [CoverStyle.landscape]: 'ms-Image-image--landscape ' + styles.imageLandscape,
  [CoverStyle.portrait]: 'ms-Image-image--portrait ' + styles.imagePortrait
};

export const ImageFitMap = {
  [ImageFit.center]: 'ms-Image-image--center ' + styles.imageCenter,
  [ImageFit.contain]: 'ms-Image-image--contain ' + styles.imageContain,
  [ImageFit.cover]: 'ms-Image-image--cover ' + styles.imageCover,
  [ImageFit.none]: 'ms-Image-image--none ' + styles.imageNone
};

const KEY_PREFIX: string = 'fabricImage';

export class Image extends BaseComponent<IImageProps, IImageState> {
  public static defaultProps = {
    shouldFadeIn: true
  };

  private static _svgRegex = /\.svg$/i;

  private _coverStyle: CoverStyle;
  private _imageElement: HTMLImageElement;
  private _frameElement: HTMLDivElement;

  constructor(props: IImageProps) {
    super(props);

    this.state = {
      loadState: ImageLoadState.notLoaded
    };
  }

  public componentWillReceiveProps(nextProps: IImageProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        loadState: ImageLoadState.notLoaded
      });
    } else if (this.state.loadState === ImageLoadState.loaded) {
      this._computeCoverStyle(nextProps);
    }
  }

  public componentDidUpdate(prevProps: IImageProps, prevState: IImageState) {
    this._checkImageLoaded();
    if (this.props.onLoadingStateChange
      && prevState.loadState !== this.state.loadState) {
      this.props.onLoadingStateChange(this.state.loadState);
    }
  }

  public render() {
    let imageProps = getNativeProps(this.props, imageProperties, ['width', 'height']);
    let { src, alt, width, height, shouldFadeIn, className, imageFit, role, maximizeFrame} = this.props;
    let { loadState } = this.state;
    let coverStyle = this._coverStyle;
    let loaded = loadState === ImageLoadState.loaded;

    // If image dimensions aren't specified, the natural size of the image is used.
    return (
      <div
        className={ css(
          'ms-Image',
          styles.root,
          className,
          {
            ['ms-Image--maximizeFrame ' + styles.maximizeFrame]: maximizeFrame
          })
        }
        style={ { width: width, height: height } }
        ref={ this._resolveRef('_frameElement') }
      >
        <img
          { ...imageProps }
          onLoad={ this._onImageLoaded }
          onError={ this._onImageError }
          key={ KEY_PREFIX + this.props.src || '' }
          className={
            css(
              'ms-Image-image',
              styles.image,
              (coverStyle !== undefined) && CoverStyleMap[coverStyle],
              (imageFit !== undefined) && ImageFitMap[imageFit], {
                'is-fadeIn': shouldFadeIn,
                'is-notLoaded': !loaded,
                ['is-loaded ' + styles.isLoaded]: loaded,
                'ms-u-fadeIn400': loaded && shouldFadeIn,
                'is-error': loadState === ImageLoadState.error,
                ['ms-Image-image--scaleWidth ' + styles.imageScaleWidth]: (imageFit === undefined && !!width && !height),
                ['ms-Image-image--scaleHeight ' + styles.imageScaleHeight]: (imageFit === undefined && !width && !!height),
                ['ms-Image-image--scaleWidthHeight ' + styles.imageScaleWidthHeight]: (imageFit === undefined && !!width && !!height),
              }) }
          ref={ this._resolveRef('_imageElement') }
          src={ src }
          alt={ alt }
          role={ role }
        />
      </div>
    );
  }

  @autobind
  private _onImageLoaded(ev: React.SyntheticEvent<HTMLImageElement>): void {
    let { src, onLoad } = this.props;
    if (onLoad) {
      onLoad(ev);
    }

    this._computeCoverStyle(this.props);

    if (src) {
      this.setState({
        loadState: ImageLoadState.loaded
      });
    }
  }

  private _checkImageLoaded(): void {
    let { src } = this.props;
    let { loadState } = this.state;

    if (loadState === ImageLoadState.notLoaded) {
      // testing if naturalWidth and naturalHeight are greater than zero is better than checking
      // .complete, because .complete will also be set to true if the image breaks. However,
      // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
      // to checking .complete for these images.
      let isLoaded: boolean = src && (this._imageElement.naturalWidth > 0 && this._imageElement.naturalHeight > 0) ||
        (this._imageElement.complete && Image._svgRegex.test(src));

      if (isLoaded) {
        this._computeCoverStyle(this.props);
        this.setState({
          loadState: ImageLoadState.loaded
        });
      }
    }
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

  @autobind
  private _onImageError(ev: React.SyntheticEvent<HTMLImageElement>) {
    if (this.props.onError) {
      this.props.onError(ev);
    }
    this.setState({
      loadState: ImageLoadState.error
    });
  }
}
