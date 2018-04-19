import { IImageStyleProps, IImageStyles } from './Image.types';
import {
  AnimationClassNames,
  IStyle,
  globalClassNamesWhenEnabled,
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
    isNotImageFit,
    theme
  } = props;

  const ImageFitStyles: IStyle = {
    position: 'absolute',
    left: '50% /* @noflip */',
    top: '50%',
    transform: 'translate(-50%,-50%)' // @todo test RTL renders transform: translate(50%,-50%);
  };

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-Image']),
      {
        overflow: 'hidden'
      },
      maximizeFrame && [
        globalClassNamesWhenEnabled(theme, ['ms-Image--maximizeFrame']),
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
      globalClassNamesWhenEnabled(theme, ['ms-Image-image']),
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
        globalClassNamesWhenEnabled(theme, ['ms-Image-image--center']),
        ImageFitStyles
      ],
      isContain && [
        globalClassNamesWhenEnabled(theme, ['ms-Image-image--contain']),
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
        globalClassNamesWhenEnabled(theme, ['ms-Image-image--cover']),
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
        globalClassNamesWhenEnabled(theme, ['ms-Image-image--none']),
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
      isLandscape && globalClassNamesWhenEnabled(theme, ['ms-Image-image--landscape']),
      !isLandscape && globalClassNamesWhenEnabled(theme, ['ms-Image-image--portrait']),
      !isLoaded && 'is-notLoaded',
      shouldFadeIn && 'is-fadeIn',
      isError && 'is-error'
    ]
  });
};
