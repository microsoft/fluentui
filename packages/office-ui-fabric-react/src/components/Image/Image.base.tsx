import * as React from 'react';
import { classNamesFunction, getNativeProps, imageProperties } from '../../Utilities';
import { IImageProps, IImageStyleProps, IImageStyles, ImageCoverStyle, ImageFit, ImageLoadState } from './Image.types';

const getClassNames = classNamesFunction<IImageStyleProps, IImageStyles>();

export interface IImageState {
  loadState?: ImageLoadState;
}

const KEY_PREFIX = 'fabricImage';

export class ImageBase extends React.Component<IImageProps, IImageState> {
  public static defaultProps = {
    shouldFadeIn: true
  };

  private static _svgRegex = /\.svg$/i;

  // Make an initial assumption about the image layout until we can
  // check the rendered element. The value here only takes effect when
  // shouldStartVisible is true.
  private _coverStyle: ImageCoverStyle = ImageCoverStyle.portrait;
  private _imageElement = React.createRef<HTMLImageElement>();
  private _frameElement = React.createRef<HTMLDivElement>();

  constructor(props: IImageProps) {
    super(props);

    this.state = {
      loadState: ImageLoadState.notLoaded
    };
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(nextProps: IImageProps): void {
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
    if (this.props.onLoadingStateChange && prevState.loadState !== this.state.loadState) {
      this.props.onLoadingStateChange(this.state.loadState!);
    }
  }

  public render(): JSX.Element {
    const imageProps = getNativeProps<React.ImgHTMLAttributes<HTMLImageElement>>(this.props, imageProperties, ['width', 'height']);
    const {
      src,
      alt,
      width,
      height,
      shouldFadeIn,
      shouldStartVisible,
      className,
      imageFit,
      role,
      maximizeFrame,
      styles,
      theme
    } = this.props;
    const { loadState } = this.state;
    const coverStyle = this.props.coverStyle !== undefined ? this.props.coverStyle : this._coverStyle;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      width,
      height,
      maximizeFrame,
      shouldFadeIn,
      shouldStartVisible,
      isLoaded: loadState === ImageLoadState.loaded || (loadState === ImageLoadState.notLoaded && this.props.shouldStartVisible),
      isLandscape: coverStyle === ImageCoverStyle.landscape,
      isCenter: imageFit === ImageFit.center,
      isCenterContain: imageFit === ImageFit.centerContain,
      isCenterCover: imageFit === ImageFit.centerCover,
      isContain: imageFit === ImageFit.contain,
      isCover: imageFit === ImageFit.cover,
      isNone: imageFit === ImageFit.none,
      isError: loadState === ImageLoadState.error,
      isNotImageFit: imageFit === undefined
    });

    // If image dimensions aren't specified, the natural size of the image is used.
    return (
      <div className={classNames.root} style={{ width: width, height: height }} ref={this._frameElement}>
        <img
          {...imageProps}
          onLoad={this._onImageLoaded}
          onError={this._onImageError}
          key={KEY_PREFIX + this.props.src || ''}
          className={classNames.image}
          ref={this._imageElement}
          src={src}
          alt={alt}
          role={role}
        />
      </div>
    );
  }

  private _onImageLoaded = (ev: React.SyntheticEvent<HTMLImageElement>): void => {
    const { src, onLoad } = this.props;
    if (onLoad) {
      onLoad(ev);
    }

    this._computeCoverStyle(this.props);

    if (src) {
      this.setState({
        loadState: ImageLoadState.loaded
      });
    }
  };

  private _checkImageLoaded(): void {
    const { src } = this.props;
    const { loadState } = this.state;

    if (loadState === ImageLoadState.notLoaded) {
      // testing if naturalWidth and naturalHeight are greater than zero is better than checking
      // .complete, because .complete will also be set to true if the image breaks. However,
      // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
      // to checking .complete for these images.
      const isLoaded: boolean = this._imageElement.current
        ? (src && (this._imageElement.current.naturalWidth > 0 && this._imageElement.current.naturalHeight > 0)) ||
          (this._imageElement.current.complete && ImageBase._svgRegex.test(src!))
        : false;

      if (isLoaded) {
        this._computeCoverStyle(this.props);
        this.setState({
          loadState: ImageLoadState.loaded
        });
      }
    }
  }

  private _computeCoverStyle(props: IImageProps): void {
    const { imageFit, width, height } = props;

    // Do not compute cover style if it was already specified in props
    if (
      (imageFit === ImageFit.cover ||
        imageFit === ImageFit.contain ||
        imageFit === ImageFit.centerContain ||
        imageFit === ImageFit.centerCover) &&
      this.props.coverStyle === undefined &&
      this._imageElement.current &&
      this._frameElement.current
    ) {
      // Determine the desired ratio using the width and height props.
      // If those props aren't available, measure measure the frame.
      let desiredRatio;
      if (!!width && !!height && imageFit !== ImageFit.centerContain && imageFit !== ImageFit.centerCover) {
        desiredRatio = (width as number) / (height as number);
      } else {
        desiredRatio = this._frameElement.current.clientWidth / this._frameElement.current.clientHeight;
      }

      // Examine the source image to determine its original ratio.
      const naturalRatio = this._imageElement.current.naturalWidth / this._imageElement.current.naturalHeight;

      // Should we crop from the top or the sides?
      if (naturalRatio > desiredRatio) {
        this._coverStyle = ImageCoverStyle.landscape;
      } else {
        this._coverStyle = ImageCoverStyle.portrait;
      }
    }
  }

  private _onImageError = (ev: React.SyntheticEvent<HTMLImageElement>): void => {
    if (this.props.onError) {
      this.props.onError(ev);
    }
    this.setState({
      loadState: ImageLoadState.error
    });
  };
}
