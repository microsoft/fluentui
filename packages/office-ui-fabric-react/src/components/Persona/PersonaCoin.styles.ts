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
import { personaSize } from './PersonaConsts';

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

    size10WithoutPresenceIcon: {
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
        height: personaSize.size48,
        width: personaSize.size48,
      },

      isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      isSize16 && {
        height: personaSize.size16,
        width: personaSize.size16,
      },

      isSize24 && {
        height: personaSize.size24,
        width: personaSize.size24,
      },

      isSize28 && {
        height: personaSize.size28,
        width: personaSize.size28,
      },

      isSize32 && {
        height: personaSize.size32,
        width: personaSize.size32,
      },

      isSize40 && {
        height: personaSize.size40,
        width: personaSize.size40,
      },

      isSize72 && {
        height: personaSize.size72,
        width: personaSize.size72,
      },

      isSize100 && {
        height: personaSize.size100,
        width: personaSize.size100,
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
      },

      isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      isSize16 && {
        height: personaSize.size16,
        width: personaSize.size16,
      },

      isSize24 && {
        height: personaSize.size24,
        width: personaSize.size24,
      },

      isSize28 && {
        height: personaSize.size28,
        width: personaSize.size28,
      },

      isSize32 && {
        height: personaSize.size32,
        width: personaSize.size32,
      },

      isSize40 && {
        height: personaSize.size40,
        width: personaSize.size40,
      },

      isSize72 && {
        height: personaSize.size72,
        width: personaSize.size72,
      },

      isSize100 && {
        height: personaSize.size100,
        width: personaSize.size100,
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
        height: personaSize.size48,

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
        height: personaSize.size16,
        lineHeight: personaSize.size16,
      },

      isSize24 && {
        height: personaSize.size24,
        lineHeight: personaSize.size24,
      },

      isSize28 && {
        height: personaSize.size28,
        lineHeight: personaSize.size28,
      },

      (isSize32 || isSize40) && {
        fontSize: FontSizes.medium,
      },

      isSize32 && {
        height: personaSize.size32,
        lineHeight: personaSize.size32,
      },

      isSize40 && {
        height: personaSize.size40,
        lineHeight: personaSize.size40,
      },

      isSize72 && {
        fontSize: FontSizes.xxLarge,
        height: personaSize.size72,
        lineHeight: personaSize.size72,
      },

      isSize100 && {
        fontSize: FontSizes.superLarge,
        height: personaSize.size100,
        lineHeight: personaSize.size100,
      }
    ]
  });
};
