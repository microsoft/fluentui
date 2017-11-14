import { ImageFit, IImageStyleProps, IImageStyles, ImageLoadState } from './Image.types';
import { IStyle } from '../../Styling';
import { AnimationClassNames } from '../../Styling';

const OneHundredPercent = '100%';
const Auto = 'auto';

export const getStyles = (props: IImageStyleProps): IImageStyles => {
  const {
    className,
    imageFit,
    loadState,
    isPortrait,
    maximizeFrame,
    width,
    height,
    shouldFadeIn
  } = props;
  const isLoaded = loadState === ImageLoadState.loaded;
  const isError = loadState === ImageLoadState.error;
  const isBestFit = imageFit === undefined;
  const scaleWidth = isBestFit && width !== undefined && height === undefined;
  const scaleHeight = isBestFit && width === undefined && height !== undefined;
  const scaleWidthHeight = isBestFit && width !== undefined && height !== undefined;

  return {

    root: [
      'ms-Image',
      isPortrait && 'ms-Image-image--portrait',
      !isPortrait && 'ms-Image-image--landscape',
      {
        overflow: 'hidden'
      },
      maximizeFrame && {
        height: OneHundredPercent,
        width: OneHundredPercent
      },
      className
    ],

    image: [
      'ms-Image-image',
      imageFit === ImageFit.none && 'ms-Image-image--none',
      imageFit === ImageFit.center && 'ms-Image-image--center',
      imageFit === ImageFit.contain && 'ms-Image-image--contain',
      imageFit === ImageFit.cover && 'ms-Image-image--cover',
      !isLoaded && 'is-notLoaded',
      isLoaded && 'is-loaded ',
      shouldFadeIn && 'is-fadeIn',
      loadState === ImageLoadState.error && 'is-error',
      scaleWidth && 'ms-Image-image--scaleWidth',
      scaleHeight && 'ms-Image-image--scaleHeight',
      scaleWidthHeight && 'ms-Image-image--scaleWidthHeight',

      {
        display: 'block',
        opacity: 0
      },
      isLoaded && {
        opacity: 1
      },
      isLoaded && shouldFadeIn && AnimationClassNames.fadeIn400,
      (imageFit === ImageFit.center ||
        imageFit === ImageFit.contain ||
        imageFit === ImageFit.cover
      ) && {
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      },
      imageFit === ImageFit.contain && [
        !isPortrait && {
          width: OneHundredPercent,
          height: Auto
        },
        isPortrait && {
          width: Auto,
          height: OneHundredPercent
        }
      ],
      imageFit === ImageFit.cover && [
        !isPortrait && {
          height: OneHundredPercent,
          width: Auto
        },
        isPortrait && {
          width: OneHundredPercent,
          height: Auto
        }
      ],
      scaleWidthHeight && {
        width: OneHundredPercent,
        height: OneHundredPercent
      },
      scaleWidth && {
        width: OneHundredPercent,
        height: Auto
      },
      scaleHeight && {
        width: Auto,
        height: OneHundredPercent
      }
    ]

  };
};
