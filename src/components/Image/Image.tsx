import * as React from 'react';
import { css } from '../../utilities/css';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import './Image.scss';

export interface IImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  shouldFadeIn?: boolean;

  className?: string;
  ref?: string;
  key?: string;
}

export interface IImageState {
  loadState?: ImageLoadState;
}

export enum ImageLoadState {
  notLoaded,
  loaded,
  error
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
    let { src, alt, width, height, shouldFadeIn, className } = this.props;
    let { loadState } = this.state;

    return (
      <img className={ css('ms-Image', className, {
        'is-fadeIn': shouldFadeIn,
        'is-notLoaded': loadState === ImageLoadState.notLoaded,
        'is-loaded': loadState === ImageLoadState.loaded,
        'ms-u-fadeIn400': loadState === ImageLoadState.loaded && shouldFadeIn,
        'is-error': loadState === ImageLoadState.error
      }) } ref='image' src={ src } alt={ alt } style={ { width: width, height: height } } />
    );
  }

  private _evaluateImage(): boolean {
    let { src } = this.props;
    let { loadState } = this.state;
    let { image } = this.refs;
    let isLoaded = (src && image.naturalWidth > 0 && image.naturalHeight > 0);

    if (isLoaded && loadState !== ImageLoadState.loaded) {
      this._events.off();
      this.setState({
        loadState: ImageLoadState.loaded
      });
    }

    return isLoaded;
  }

  private _setError() {
    this.setState({
      loadState: ImageLoadState.error
    });
  }

}

export default Image;
