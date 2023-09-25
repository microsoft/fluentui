import { AnimationClassNames, getGlobalClassNames } from '../../Styling';
import { getWindow } from '../../Utilities';
import type { IStyle } from '../../Styling';
import type { IImageStyleProps, IImageStyles } from './Image.types';

const GlobalClassNames = {
  root: 'ms-Image',
  rootMaximizeFrame: 'ms-Image--maximizeFrame',
  image: 'ms-Image-image',
  imageCenter: 'ms-Image-image--center',
  imageContain: 'ms-Image-image--contain',
  imageCover: 'ms-Image-image--cover',
  imageCenterContain: 'ms-Image-image--centerContain',
  imageCenterCover: 'ms-Image-image--centerCover',
  imageNone: 'ms-Image-image--none',
  imageLandscape: 'ms-Image-image--landscape',
  imagePortrait: 'ms-Image-image--portrait',
};

export const getStyles = (props: IImageStyleProps): IImageStyles => {
  const {
    className,
    width,
    height,
    maximizeFrame,
    isLoaded,
    shouldFadeIn,
    shouldStartVisible,
    isLandscape,
    isCenter,
    isContain,
    isCover,
    isCenterContain,
    isCenterCover,
    isNone,
    isError,
    isNotImageFit,
    theme,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ImageFitStyles: IStyle = {
    position: 'absolute',
    left: '50% /* @noflip */',
    top: '50%',
    transform: 'translate(-50%,-50%)', // @todo test RTL renders transform: translate(50%,-50%);
  };

  // Cut the mustard using msMaxTouchPoints to detect IE11 which does not support CSS object-fit
  const window: Window | undefined = getWindow();
  const supportsObjectFit: boolean =
    window !== undefined &&
    // eslint-disable-next-line @fluentui/max-len
    // cast needed as vendor prefixed `msMaxTouchPoints` api is no longer part of TS lib declaration - introduced with TS 4.4
    (window.navigator as { msMaxTouchPoints?: Window['navigator']['maxTouchPoints'] }).msMaxTouchPoints === undefined;
  const fallbackObjectFitStyles =
    (isContain && isLandscape) || (isCover && !isLandscape)
      ? { width: '100%', height: 'auto' }
      : { width: 'auto', height: '100%' };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        overflow: 'hidden',
      },
      maximizeFrame && [
        classNames.rootMaximizeFrame,
        {
          height: '100%',
          width: '100%',
        },
      ],
      isLoaded && shouldFadeIn && !shouldStartVisible && AnimationClassNames.fadeIn400,
      (isCenter || isContain || isCover || isCenterContain || isCenterCover) && {
        position: 'relative',
      },
      className,
    ],
    image: [
      classNames.image,
      {
        display: 'block',
        opacity: 0,
      },
      isLoaded && [
        'is-loaded',
        {
          opacity: 1,
        },
      ],
      isCenter && [classNames.imageCenter, ImageFitStyles],
      isContain && [
        classNames.imageContain,
        supportsObjectFit && {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        },
        !supportsObjectFit && fallbackObjectFitStyles,
        !supportsObjectFit && ImageFitStyles,
      ],
      isCover && [
        classNames.imageCover,
        supportsObjectFit && {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        !supportsObjectFit && fallbackObjectFitStyles,
        !supportsObjectFit && ImageFitStyles,
      ],
      isCenterContain && [
        classNames.imageCenterContain,
        isLandscape && {
          maxWidth: '100%',
        },
        !isLandscape && {
          maxHeight: '100%',
        },
        ImageFitStyles,
      ],
      isCenterCover && [
        classNames.imageCenterCover,
        isLandscape && {
          maxHeight: '100%',
        },
        !isLandscape && {
          maxWidth: '100%',
        },
        ImageFitStyles,
      ],
      isNone && [
        classNames.imageNone,
        {
          width: 'auto',
          height: 'auto',
        },
      ],
      isNotImageFit && [
        !!width &&
          !height && {
            height: 'auto',
            width: '100%',
          },
        !width &&
          !!height && {
            height: '100%',
            width: 'auto',
          },
        !!width &&
          !!height && {
            height: '100%',
            width: '100%',
          },
      ],
      isLandscape && classNames.imageLandscape,
      !isLandscape && classNames.imagePortrait,
      !isLoaded && 'is-notLoaded',
      shouldFadeIn && 'is-fadeIn',
      isError && 'is-error',
    ],
  };
};
