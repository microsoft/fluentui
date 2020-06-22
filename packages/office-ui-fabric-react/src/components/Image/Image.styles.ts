import { IImageStyleProps, IImageStyles } from './Image.types';
import {
  AnimationClassNames,
  IStyle,
} from '../../Styling';

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
    isNotImageFit
  } = props;

  const ImageFitStyles: IStyle = {
    position: 'absolute',
    left: '50% /* @noflip */',
    top: '50%',
    transform: 'translate(-50%,-50%)' // @todo test RTL renders transform: translate(50%,-50%);
  };

  return ({
    root: [
      'ms-Image',
      {
        overflow: 'hidden'
      },
      maximizeFrame && [
        'ms-Image--maximizeFrame',
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
      'ms-Image-image',
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
        'ms-Image-image--center',
        ImageFitStyles
      ],
      isContain && [
        'ms-Image-image--contain',
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
        'ms-Image-image--cover',
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
        'ms-Image-image--none',
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
      isLandscape && 'ms-Image-image--landscape',
      !isLandscape && 'ms-Image-image--portrait',
      !isLoaded && 'is-notLoaded',
      shouldFadeIn && 'is-fadeIn',
      isError && 'is-error'
    ]
  });
};
