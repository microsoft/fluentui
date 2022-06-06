import * as React from 'react';
import { classNamesFunction, getNativeProps, imgProperties } from '../../Utilities';
import { ImageCoverStyle, ImageFit, ImageLoadState } from './Image.types';
import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-hooks';
import type { IImageProps, IImageStyleProps, IImageStyles } from './Image.types';

const getClassNames = classNamesFunction<IImageStyleProps, IImageStyles>();

export interface IImageState {
  loadState?: ImageLoadState;
}

const SVG_REGEX = /\.svg$/i;
const KEY_PREFIX = 'fabricImage';

function useLoadState(
  props: IImageProps,
  imageElement: React.RefObject<HTMLImageElement>,
): readonly [
  ImageLoadState,
  /* onImageLoad */ (ev: React.SyntheticEvent<HTMLImageElement>) => void,
  /* onImageError */ (ev: React.SyntheticEvent<HTMLImageElement>) => void,
] {
  const { onLoadingStateChange, onLoad, onError, src } = props;

  const [loadState, setLoadState] = React.useState<ImageLoadState>(ImageLoadState.notLoaded);

  useIsomorphicLayoutEffect(() => {
    // If the src property changes, reset the load state
    // (does nothing if the load state is already notLoaded)
    setLoadState(ImageLoadState.notLoaded);
  }, [src]);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- intended to run every render
  React.useEffect(() => {
    if (loadState === ImageLoadState.notLoaded) {
      // testing if naturalWidth and naturalHeight are greater than zero is better than checking
      // .complete, because .complete will also be set to true if the image breaks. However,
      // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
      // to checking .complete for these images.
      const isLoaded: boolean = imageElement.current
        ? (src && imageElement.current.naturalWidth > 0 && imageElement.current.naturalHeight > 0) ||
          (imageElement.current.complete && SVG_REGEX.test(src!))
        : false;

      if (isLoaded) {
        setLoadState(ImageLoadState.loaded);
      }
    }
  });

  React.useEffect(() => {
    onLoadingStateChange?.(loadState);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run when loadState changes
  }, [loadState]);

  const onImageLoaded = React.useCallback(
    (ev: React.SyntheticEvent<HTMLImageElement>) => {
      onLoad?.(ev);
      if (src) {
        setLoadState(ImageLoadState.loaded);
      }
    },
    [src, onLoad],
  );

  const onImageError = React.useCallback(
    (ev: React.SyntheticEvent<HTMLImageElement>) => {
      onError?.(ev);
      setLoadState(ImageLoadState.error);
    },
    [onError],
  );

  return [loadState, onImageLoaded, onImageError] as const;
}

export const ImageBase: React.FunctionComponent<IImageProps> = React.forwardRef<HTMLImageElement, IImageProps>(
  (props, forwardedRef) => {
    const frameElement = React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    const imageElement = React.useRef<HTMLImageElement>() as React.RefObject<HTMLImageElement>;
    const [loadState, onImageLoaded, onImageError] = useLoadState(props, imageElement);

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
      loading,
    } = props;
    const coverStyle = useCoverStyle(props, loadState, imageElement, frameElement);
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
      <div className={classNames.root} style={{ width: width, height: height }} ref={frameElement}>
        <img
          {...imageProps}
          onLoad={onImageLoaded}
          onError={onImageError}
          key={KEY_PREFIX + props.src || ''}
          className={classNames.image}
          ref={useMergedRefs(imageElement, forwardedRef)}
          src={src}
          alt={alt}
          role={role}
          loading={loading}
        />
      </div>
    );
  },
);
ImageBase.displayName = 'ImageBase';

function useCoverStyle(
  props: IImageProps,
  loadState: ImageLoadState,
  imageElement: React.RefObject<HTMLImageElement>,
  frameElement: React.RefObject<HTMLDivElement>,
) {
  const previousLoadState = React.useRef(loadState);
  const coverStyle = React.useRef<ImageCoverStyle | undefined>();

  if (
    coverStyle === undefined ||
    (previousLoadState.current === ImageLoadState.notLoaded && loadState === ImageLoadState.loaded)
  ) {
    coverStyle.current = computeCoverStyle(props, loadState, imageElement, frameElement);
  }

  previousLoadState.current = loadState;

  return coverStyle.current!;
}

function computeCoverStyle(
  props: IImageProps,
  loadState: ImageLoadState,
  imageElement: React.RefObject<HTMLImageElement>,
  frameElement: React.RefObject<HTMLDivElement>,
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
    imageElement.current &&
    frameElement.current
  ) {
    // Determine the desired ratio using the width and height props.
    // If those props aren't available, measure measure the frame.
    let desiredRatio;
    if (
      typeof width === 'number' &&
      typeof height === 'number' &&
      imageFit !== ImageFit.centerContain &&
      imageFit !== ImageFit.centerCover
    ) {
      desiredRatio = width / height;
    } else {
      desiredRatio = frameElement.current.clientWidth / frameElement.current.clientHeight;
    }

    // Examine the source image to determine its original ratio.
    const naturalRatio = imageElement.current.naturalWidth / imageElement.current.naturalHeight;

    // Should we crop from the top or the sides?
    if (naturalRatio > desiredRatio) {
      return ImageCoverStyle.landscape;
    }
  }
  return ImageCoverStyle.portrait;
}
