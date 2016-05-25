import * as React from 'react';
import { css } from '../../utilities/css';
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

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { src, alt, width, height, shouldFadeIn, className, imageFit, errorSrc } = this.props;
    let { loadState } = this.state;
    let coverStyle = this._coverStyle;
    let loaded = loadState === ImageLoadState.loaded || loadState === ImageLoadState.errorLoaded;
    let srcToDisplay: string =
      (loadState === ImageLoadState.error || loadState === ImageLoadState.errorLoaded) ? errorSrc : src;

    return (
      <div className={ css('ms-Image-container', className, {
        'ms-Imageaa-cover': imageFit === ImageFit.cover,
        'ms-Image-aa-scale': imageFit === ImageFit.scale,
        }) } style={ { width: width, height: height } }>
        <img className={ css('ms-Image', className, {
          'is-fadeIn': shouldFadeIn,
          'is-notLoaded': !loaded,
          'is-loaded': loaded,
          'ms-u-fadeIn400': loaded && shouldFadeIn,
          'is-error': loadState === ImageLoadState.error,
          'ms-Image--center': imageFit === ImageFit.center,
          'ms-Image--cover': imageFit === ImageFit.cover,
          'ms-Image--scale': imageFit === ImageFit.scale,
          'ms-Image--landscape': coverStyle === CoverStyle.landscape,
          'ms-Image--portrait': coverStyle === CoverStyle.portrait
          }) } ref='image' src={ srcToDisplay } alt={ alt } />
      </div>
    );
  }

  private _evaluateImage(): boolean {
    let { src, width, height } = this.props;
    let { loadState } = this.state;
    let { image } = this.refs;
    let isLoaded = (src && image.naturalWidth > 0 && image.naturalHeight > 0);

    let desiredRatio = width / height;
    let naturalRatio = image.naturalWidth / image.naturalHeight;
    if (naturalRatio > desiredRatio) {
      this._coverStyle = CoverStyle.landscape;
    } else {
      this._coverStyle = CoverStyle.portrait;
    }

    if (isLoaded && loadState !== ImageLoadState.loaded && loadState !== ImageLoadState.errorLoaded) {
      this._events.off();
      this.setState({
        loadState: loadState === ImageLoadState.error ? ImageLoadState.errorLoaded : ImageLoadState.loaded
      });
    }

    return isLoaded;
  }

  private _setError() {
    if (this.state.loadState !== ImageLoadState.error && this.state.loadState !== ImageLoadState.errorLoaded) {
      if (this.props.onError) {
        this.props.onError(this.props.src);
      }
      this.setState({
        loadState: ImageLoadState.error
      });
    }
  }

}
