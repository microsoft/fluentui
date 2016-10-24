import * as React from 'react';
import { css } from '../../utilities/css';
import { getNativeProps, imageProperties } from '../../utilities/properties';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import './Image.scss';
import { IImageProps, ImageFit } from './Image.Props';

export interface IImageState {
  loadState?: ImageLoadState;
}

export enum CoverStyle {
  landscape,
  portrait
}

export const CoverStyleMap = {
  [ CoverStyle.landscape ]: 'ms-Image-image--landscape',
  [ CoverStyle.portrait ]: 'ms-Image-image--portrait'
};

export const ImageFitMap = {
  [ ImageFit.center ]: 'ms-Image-image--center',
  [ ImageFit.contain ]: 'ms-Image-image--contain',
  [ ImageFit.cover ]: 'ms-Image-image--cover',
  [ ImageFit.none ]: 'ms-Image-image--none'
};

export enum ImageLoadState {
  notLoaded,
  loaded,
  error,
  errorLoaded
}

export class Image extends React.Component<IImageProps, IImageState> {
  public static defaultProps = {
    shouldFadeIn: true
  };

  public refs: {
    [key: string]: React.ReactInstance;
    image: HTMLImageElement;
  };

  private _events: EventGroup;
  private _coverStyle: CoverStyle;

  constructor(props: IImageProps) {
    super(props);

    this.state = {
      loadState: ImageLoadState.notLoaded
    };

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    let { image } = this.refs;

    if (!this._evaluateImage()) {
      this._events.on(image, 'load', this._evaluateImage);
      this._events.on(image, 'error', this._setError);
    }
  }

  public componentWillReceiveProps(nextProps) {
    if (this.state.loadState === ImageLoadState.loaded) {
      let { nextHeight, nextWidth } = nextProps;
      let { height, width } = this.props;

      if (height !== nextHeight || width !== nextWidth) {
        this._computeCoverStyle();
      }
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let imageProps = getNativeProps(this.props, imageProperties);
    let { src, alt, width, height, shouldFadeIn, className, imageFit, errorSrc, role } = this.props;
    let { loadState } = this.state;
    let coverStyle = this._coverStyle;
    let loaded = loadState === ImageLoadState.loaded || loadState === ImageLoadState.errorLoaded;
    let srcToDisplay: string =
      (loadState === ImageLoadState.error || loadState === ImageLoadState.errorLoaded) ? errorSrc : src;

    // If image dimensions aren't specified, the natural size of the image is used.
    return (
      <div className={ css('ms-Image', className) } style={ { width: width, height: height } }>
        <img { ...imageProps } className={ css('ms-Image-image',
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
          }) } ref='image' src={ srcToDisplay } alt={ alt } role={ role } />
      </div>
    );
  }

  private _evaluateImage(): boolean {
    let { src } = this.props;
    let { loadState } = this.state;
    let { image } = this.refs;
    let isLoaded = (src && image.naturalWidth > 0 && image.naturalHeight > 0);

    this._computeCoverStyle();

    if (isLoaded && loadState !== ImageLoadState.loaded && loadState !== ImageLoadState.errorLoaded) {
      this._events.off();
      this.setState({
        loadState: loadState === ImageLoadState.error ? ImageLoadState.errorLoaded : ImageLoadState.loaded
      });
    }

    return isLoaded;
  }

  private _computeCoverStyle() {
    let { imageFit } = this.props;
    if (imageFit === ImageFit.cover || imageFit === ImageFit.contain) {
      let { image } = this.refs;
      if (image) {
        let { width, height } = this.props;

        let desiredRatio = (width as number) / (height as number);
        let naturalRatio = image.naturalWidth / image.naturalHeight;

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
