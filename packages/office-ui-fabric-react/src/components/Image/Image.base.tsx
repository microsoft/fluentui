import * as React from 'react';
import { classNamesFunction, getNativeProps, imgProperties } from '../../Utilities';
import { IImageProps, IImageStyleProps, IImageStyles, ImageCoverStyle, ImageFit, ImageLoadState } from './Image.types';
import { useMergedRefs } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IImageStyleProps, IImageStyles>();

export interface IImageState {
  loadState?: ImageLoadState;
}

const SVG_REGEX = /\.svg$/i;
const KEY_PREFIX = 'fabricImage';

function useLoadState(
  props: IImageProps,
  _imageElement: React.RefObject<HTMLImageElement>,
  _frameElement: React.RefObject<HTMLDivElement>,
) {
  const [loadState, setLoadState] = React.useState<ImageLoadState>(ImageLoadState.notLoaded);

  React.useLayoutEffect(() => {
    // If the src property changes, reset the load state
    if (loadState !== ImageLoadState.notLoaded) {
      setLoadState(ImageLoadState.notLoaded);
    }
  }, [props.src]);

  React.useEffect(() => {
    if (loadState === ImageLoadState.notLoaded) {
      // testing if naturalWidth and naturalHeight are greater than zero is better than checking
      // .complete, because .complete will also be set to true if the image breaks. However,
      // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
      // to checking .complete for these images.
      const isLoaded: boolean = _imageElement.current
        ? (props.src && _imageElement.current.naturalWidth > 0 && _imageElement.current.naturalHeight > 0) ||
          (_imageElement.current.complete && SVG_REGEX.test(props.src!))
        : false;

      if (isLoaded) {
        setLoadState(ImageLoadState.loaded);
      }
    }
  });

  React.useEffect(() => {
    props.onLoadingStateChange?.(loadState);
  }, [loadState]);

  const _onImageLoaded = React.useCallback(
    (ev: React.SyntheticEvent<HTMLImageElement>) => {
      props.onLoad?.(ev);
      if (props.src) {
        setLoadState(ImageLoadState.loaded);
      }
    },
    [props.src, props.onLoad],
  );

  const _onImageError = React.useCallback(
    (ev: React.SyntheticEvent<HTMLImageElement>) => {
      props.onError?.(ev);
      setLoadState(ImageLoadState.error);
    },
    [props.src, props.onError],
  );

  return [loadState, _onImageLoaded, _onImageError] as const;
}

export const ImageBase = React.memo(
  // tslint:disable-next-line:no-function-expression no-shadowed-variable
  React.forwardRef(function ImageBase(props: IImageProps, forwardedRef: React.Ref<HTMLImageElement>) {
    const _frameElement = React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    const _imageElement = React.useRef<HTMLImageElement>() as React.RefObject<HTMLImageElement>;
    const [loadState, _onImageLoaded, _onImageError] = useLoadState(props, _imageElement, _frameElement);

    const imageProps = getNativeProps<React.ImgHTMLAttributes<HTMLImageElement>>(props, imgProperties, [
      'width',
      'height',
    ]);
    const {
      src,
      alt,
      width,
      height,
      shouldFadeIn = true,
      shouldStartVisible,
      className,
      imageFit,
      role,
      maximizeFrame,
      styles,
      theme,
    } = props;
    const coverStyle = _computeCoverStyle(props, loadState, _imageElement, _frameElement);
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      width,
      height,
      maximizeFrame,
      shouldFadeIn,
      shouldStartVisible,
      isLoaded:
        loadState === ImageLoadState.loaded || (loadState === ImageLoadState.notLoaded && props.shouldStartVisible),
      isLandscape: coverStyle === ImageCoverStyle.landscape,
      isCenter: imageFit === ImageFit.center,
      isCenterContain: imageFit === ImageFit.centerContain,
      isCenterCover: imageFit === ImageFit.centerCover,
      isContain: imageFit === ImageFit.contain,
      isCover: imageFit === ImageFit.cover,
      isNone: imageFit === ImageFit.none,
      isError: loadState === ImageLoadState.error,
      isNotImageFit: imageFit === undefined,
    });

    // If image dimensions aren't specified, the natural size of the image is used.
    return (
      <div className={classNames.root} style={{ width: width, height: height }} ref={_frameElement}>
        <img
          {...imageProps}
          onLoad={_onImageLoaded}
          onError={_onImageError}
          key={KEY_PREFIX + props.src || ''}
          className={classNames.image}
          ref={useMergedRefs(_imageElement, forwardedRef)}
          src={src}
          alt={alt}
          role={role}
        />
      </div>
    );
  }),
);

function _computeCoverStyle(
  props: IImageProps,
  loadState: ImageLoadState,
  _imageElement: React.RefObject<HTMLImageElement>,
  _frameElement: React.RefObject<HTMLDivElement>,
): ImageCoverStyle {
  const { imageFit, width, height } = props;

  // Do not compute cover style if it was already specified in props
  if (props.coverStyle !== undefined) {
    return props.coverStyle;
  } else if (
    loadState === ImageLoadState.loaded &&
    (imageFit === ImageFit.cover ||
      imageFit === ImageFit.contain ||
      imageFit === ImageFit.centerContain ||
      imageFit === ImageFit.centerCover) &&
    _imageElement.current &&
    _frameElement.current
  ) {
    // Determine the desired ratio using the width and height props.
    // If those props aren't available, measure measure the frame.
    let desiredRatio;
    if (!!width && !!height && imageFit !== ImageFit.centerContain && imageFit !== ImageFit.centerCover) {
      desiredRatio = (width as number) / (height as number);
    } else {
      desiredRatio = _frameElement.current.clientWidth / _frameElement.current.clientHeight;
    }

    // Examine the source image to determine its original ratio.
    const naturalRatio = _imageElement.current.naturalWidth / _imageElement.current.naturalHeight;

    // Should we crop from the top or the sides?
    if (naturalRatio > desiredRatio) {
      return ImageCoverStyle.landscape;
    }
  }
  return ImageCoverStyle.portrait;
}
