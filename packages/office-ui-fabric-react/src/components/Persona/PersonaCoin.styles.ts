import {
  IPersonaCoinStyleProps,
  IPersonaCoinStyles,
  PersonaSize,
} from './Persona.types';
import {
  HighContrastSelector,
  FontSizes,
  FontWeights,
} from '../../Styling';

export const getStyles = (
  props: IPersonaCoinStyleProps
): IPersonaCoinStyles => {
  const {
    className,
    size,
    theme,
  } = props;

  const { palette } = theme;

  // Persona size conditionals
  const isSize10 = size === PersonaSize.size10 || size === PersonaSize.tiny;
  const isSize16 = size === PersonaSize.size16;
  const isSize24 = size === PersonaSize.size24 || size === PersonaSize.extraExtraSmall;
  const isSize28 = size === PersonaSize.size28 || size === PersonaSize.extraSmall;
  const isSize32 = size === PersonaSize.size32;
  const isSize40 = size === PersonaSize.size40 || size === PersonaSize.small;
  const isSize48 = size === PersonaSize.size48;
  const isSize72 = size === PersonaSize.size72 || size === PersonaSize.large;
  const isSize100 = size === PersonaSize.size100 || size === PersonaSize.extraLarge;

  // Persona Sizes
  const personaSize16 = '16px';
  const personaSize24 = '24px';
  const personaSize28 = '28px';
  const personaSize32 = '32px';
  const personaSize40 = '40px';
  const personaSize48 = '48px';
  const personaSize72 = '72px';
  const personaSize100 = '100px';

  return ({
    coin: [
      'ms-Persona-coin',
      isSize10 && 'ms-Persona--size10',
      isSize16 && 'ms-Persona--size16',
      isSize24 && 'ms-Persona--size24',
      isSize28 && 'ms-Persona--size28',
      isSize32 && 'ms-Persona--size32',
      isSize40 && 'ms-Persona--size40',
      isSize48 && 'ms-Persona--size48',
      isSize72 && 'ms-Persona--size72',
      isSize100 && 'ms-Persona--size100',
      className
    ],

    size10NoPresenceIcon: {
      fontSize: '10px',
      position: 'absolute',
      top: '5px',
      right: 'auto',
      left: 0,
    },

    imageArea: [
      'ms-Persona-imageArea',
      {
        position: 'relative',
        textAlign: 'center',
        flex: '0 0 auto',
        height: personaSize48,
        width: personaSize48,

        // selectors: {
        //   '$image': {
        //     border: 0,
        //   }
        // }
      },

      isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      isSize16 && {
        height: personaSize16,
        width: personaSize16,
      },

      isSize24 && {
        height: personaSize24,
        width: personaSize24,
      },

      isSize28 && {
        height: personaSize28,
        width: personaSize28,
      },

      isSize32 && {
        height: personaSize32,
        width: personaSize32,
      },

      isSize40 && {
        height: personaSize40,
        width: personaSize40,
      },

      isSize72 && {
        height: personaSize72,
        width: personaSize72,
      },

      isSize100 && {
        height: personaSize100,
        width: personaSize100,
      },
    ],

    image: [
      'ms-Persona-image',
      {
        marginRight: '10px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
        borderRadius: '50%',
        perspective: '1px',

        // Remove this and use conditional render to hide instead
        selectors: {
          '&[src=""]': {
            display: 'none',
          }
        }
      },

      isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      isSize16 && {
        height: personaSize16,
        width: personaSize16,
      },

      isSize24 && {
        height: personaSize24,
        width: personaSize24,
      },

      isSize28 && {
        height: personaSize28,
        width: personaSize28,
      },

      isSize32 && {
        height: personaSize32,
        width: personaSize32,
      },

      isSize40 && {
        height: personaSize40,
        width: personaSize40,
      },

      isSize72 && {
        height: personaSize72,
        width: personaSize72,
      },

      isSize100 && {
        height: personaSize100,
        width: personaSize100,
      },
    ],

    initials: [
      'ms-Persona-initials',
      {
        borderRadius: '50%',
        color: palette.white,
        fontSize: FontSizes.large,
        fontWeight: FontWeights.regular,
        lineHeight: '46px',
        height: personaSize48,

        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
            MsHighContrastAdjust: 'none',
            color: 'WindowText',
            boxSizing: 'border-box',
            backgroundColor: 'Window !important',
          }
        }
      },

      (isSize16 || isSize24 || isSize28) && {
        fontSize: FontSizes.xSmall,
      },

      isSize16 && {
        height: personaSize16,
        lineHeight: personaSize16,
      },

      isSize24 && {
        height: personaSize24,
        lineHeight: personaSize24,
      },

      isSize28 && {
        height: personaSize28,
        lineHeight: personaSize28,
      },

      (isSize32 || isSize40) && {
        fontSize: FontSizes.medium,
      },

      isSize32 && {
        height: personaSize32,
        lineHeight: personaSize32,
      },

      isSize40 && {
        height: personaSize40,
        lineHeight: personaSize40,
      },

      isSize72 && {
        fontSize: FontSizes.xxLarge,
        height: personaSize72,
        lineHeight: personaSize72,
      },

      isSize100 && {
        fontSize: FontSizes.superLarge,
        height: personaSize100,
        lineHeight: personaSize100,
      }
    ]
  });
};
