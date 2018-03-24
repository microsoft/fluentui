import { IPersonaStyleProps, IPersonaStyles, PersonaSize } from './Persona.types';
import {
  HighContrastSelector,
  FontSizes,
  FontWeights,
} from '../../Styling';

export const getStyles = (
  props: IPersonaStyleProps
): IPersonaStyles => {
  const {
    className,
    theme,
    size,
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
      {
        // Insert css properties

      },

      /**
       * Modifier: Size 10 Persona
       */
      isSize10 && [
        'ms-Persona--size10',
        {
          selectors: {
            '$imageArea': {
              overflow: 'visible',
              background: 'transparent',
              height: 0,
              width: 0,
            }
          }
        }
      ],

      /**
       * Modifier: Size 16 Persona
       */
      isSize16 && [
        'ms-Persona--size16',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize16,
              width: personaSize16,
            },

            '$initials': {
              fontSize: FontSizes.xSmall,
              height: personaSize16,
              lineHeight: personaSize16,
            }
          }
        }
      ],

      /**
       * Modifier: Size 24 Persona
       */
      isSize24 && [
        'ms-Persona--size24',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize24,
              width: personaSize24,
            },

            '$initials': {
              fontSize: FontSizes.xSmall,
              height: personaSize24,
              lineHeight: personaSize24,
            }
          }
        }
      ],

      /**
       * Modifier: Size 28 Persona
       */
      isSize28 && [
        'ms-Persona--size28',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize28,
              width: personaSize28,
            },

            '$initials': {
              fontSize: FontSizes.xSmall,
              height: personaSize28,
              lineHeight: personaSize28,
            }
          }
        }
      ],

      /**
       * Modifier: Size 32 Persona
       */
      isSize32 && [
        'ms-Persona--size32',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize32,
              width: personaSize32,
            },

            '$initials': {
              fontSize: FontSizes.medium,
              height: personaSize32,
              lineHeight: personaSize32,
            }
          }
        }
      ],

      /**
       * Modifier: Size 40 Persona
       */
      isSize40 && [
        'ms-Persona--size40',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize40,
              width: personaSize40,
            },

            '$initials': {
              fontSize: FontSizes.medium,
              height: personaSize40,
              lineHeight: personaSize40,
            }
          }
        }
      ],

      /**
       * Modifier: Size 72 Persona
       */
      isSize72 && [
        'ms-Persona--size72',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize72,
              width: personaSize72,
            },

            '$initials': {
              fontSize: FontSizes.xxLarge,
              height: personaSize72,
              lineHeight: personaSize72,
            }
          }
        }
      ],

      /**
       * Modifier: Size 100 Persona
       */
      isSize100 && [
        'ms-Persona--size100',
        {
          selectors: {
            '$imageArea, $image': {
              height: personaSize100,
              width: personaSize100,
            },

            '$initials': {
              fontSize: FontSizes.superLarge,
              height: personaSize100,
              lineHeight: personaSize100,
            }
          }
        }
      ],

      className,
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

        selectors: {
          '$image': {
            border: 0,
          }
        }
      }
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
        borderRadius: '50%',
        perspective: '1px',

        // Remove this and use conditional render to hide instead
        selectors: {
          '&[src=""]': {
            display: 'none',
          }
        }
      }
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
      }
    ]
  });
};
