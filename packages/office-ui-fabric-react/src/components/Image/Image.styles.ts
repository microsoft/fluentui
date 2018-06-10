import { IImageStyleProps, IImageStyles } from './Image.types';
import {
  AnimationClassNames,
  IStyle,
  getGlobalClassNames,
} from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Image',
  rootMaximizeFrame: 'ms-Image--maximizeFrame',
  image: 'ms-Image-image',
  imageCenter: 'ms-Image-image--center',
  imageContain: 'ms-Image-image--contain',
  imageCover: 'ms-Image-image--cover',
  imageNone: 'ms-Image-image--none',
  imageLandscape: 'ms-Image-image--landscape',
  imagePortrait: 'ms-Image-image--portrait',
};

export const getStyles = (
  props: IImageStyleProps
): IImageStyles => {
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
    isNone,
    isError,
    isNotImageFit,
    theme
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ImageFitStyles: IStyle = {
    position: 'absolute',
    left: '50% /* @noflip */',
    top: '50%',
    transform: 'translate(-50%,-50%)' // @todo test RTL renders transform: translate(50%,-50%);
  };

  return ({
    root: [
      classNames.root,
      {
        overflow: 'hidden'
      },
      maximizeFrame && [
        classNames.rootMaximizeFrame,
        {
          height: '100%',
          width: '100%'
        }
      ],
      (isCenter || isContain || isCover) && {
        position: 'relative',
      },
      className
    ],
    image: [
      classNames.image,
      {
        display: 'block',
        opacity: 0
      },
      isLoaded && [
        'is-loaded',
        {
          opacity: 1
        }
      ],
      isCenter && [
        classNames.imageCenter,
        ImageFitStyles
      ],
      isContain && [
        classNames.imageContain,
        isLandscape && {
          width: '100%',
          height: 'auto'
        },
        !isLandscape && {
          width: 'auto',
          height: '100%'
        },
        ImageFitStyles
      ],
      isCover && [
        classNames.imageCover,
        isLandscape && {
          width: 'auto',
          height: '100%'
        },
        !isLandscape && {
          width: '100%',
          height: 'auto'
        },
        ImageFitStyles
      ],
      isNone && [
        classNames.imageNone,
        {
          width: 'auto',
          height: 'auto'
        }
      ],
      isNotImageFit && [
        !!width && !height && {
          height: 'auto',
          width: '100%'
        },
        !width && !!height && {
          height: '100%',
          width: 'auto'
        },
        !!width && !!height && {
          height: '100%',
          width: '100%'
        }
      ],
      isLoaded && shouldFadeIn && !shouldStartVisible && AnimationClassNames.fadeIn400,
      isLandscape && classNames.imageLandscape,
      !isLandscape && classNames.imagePortrait,
      !isLoaded && 'is-notLoaded',
      shouldFadeIn && 'is-fadeIn',
      isError && 'is-error'
    ]
  });
};
