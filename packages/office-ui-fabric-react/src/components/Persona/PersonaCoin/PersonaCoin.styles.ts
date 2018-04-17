import {
  IPersonaCoinStyleProps,
  IPersonaCoinStyles,
  PersonaSize,
  personaCoinSizes,
  sizeBoolean,
} from '../Persona.types';
import {
  HighContrastSelector,
  FontSizes,
  FontWeights,
} from '../../../Styling';

export const getStyles = (
  props: IPersonaCoinStyleProps
): IPersonaCoinStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette } = theme;

  const size = sizeBoolean(props.size as PersonaSize);

  return ({
    coin: [
      'ms-Persona-coin',
      size.isSize10 && 'ms-Persona--size10',
      size.isSize16 && 'ms-Persona--size16',
      size.isSize24 && 'ms-Persona--size24',
      size.isSize28 && 'ms-Persona--size28',
      size.isSize32 && 'ms-Persona--size32',
      size.isSize40 && 'ms-Persona--size40',
      size.isSize48 && 'ms-Persona--size48',
      size.isSize72 && 'ms-Persona--size72',
      size.isSize100 && 'ms-Persona--size100',
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
        height: personaCoinSizes.size48,
        width: personaCoinSizes.size48,
      },

      size.isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      size.isSize16 && {
        height: personaCoinSizes.size16,
        width: personaCoinSizes.size16,
      },

      size.isSize24 && {
        height: personaCoinSizes.size24,
        width: personaCoinSizes.size24,
      },

      size.isSize28 && {
        height: personaCoinSizes.size28,
        width: personaCoinSizes.size28,
      },

      size.isSize32 && {
        height: personaCoinSizes.size32,
        width: personaCoinSizes.size32,
      },

      size.isSize40 && {
        height: personaCoinSizes.size40,
        width: personaCoinSizes.size40,
      },

      size.isSize72 && {
        height: personaCoinSizes.size72,
        width: personaCoinSizes.size72,
      },

      size.isSize100 && {
        height: personaCoinSizes.size100,
        width: personaCoinSizes.size100,
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

      size.isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      size.isSize16 && {
        height: personaCoinSizes.size16,
        width: personaCoinSizes.size16,
      },

      size.isSize24 && {
        height: personaCoinSizes.size24,
        width: personaCoinSizes.size24,
      },

      size.isSize28 && {
        height: personaCoinSizes.size28,
        width: personaCoinSizes.size28,
      },

      size.isSize32 && {
        height: personaCoinSizes.size32,
        width: personaCoinSizes.size32,
      },

      size.isSize40 && {
        height: personaCoinSizes.size40,
        width: personaCoinSizes.size40,
      },

      size.isSize72 && {
        height: personaCoinSizes.size72,
        width: personaCoinSizes.size72,
      },

      size.isSize100 && {
        height: personaCoinSizes.size100,
        width: personaCoinSizes.size100,
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
        height: personaCoinSizes.size48,

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

      (size.isSize16 || size.isSize24 || size.isSize28) && {
        fontSize: FontSizes.xSmall,
      },

      size.isSize16 && {
        height: personaCoinSizes.size16,
        lineHeight: personaCoinSizes.size16,
      },

      size.isSize24 && {
        height: personaCoinSizes.size24,
        lineHeight: personaCoinSizes.size24,
      },

      size.isSize28 && {
        height: personaCoinSizes.size28,
        lineHeight: personaCoinSizes.size28,
      },

      (size.isSize32 || size.isSize40) && {
        fontSize: FontSizes.medium,
      },

      size.isSize32 && {
        height: personaCoinSizes.size32,
        lineHeight: personaCoinSizes.size32,
      },

      size.isSize40 && {
        height: personaCoinSizes.size40,
        lineHeight: personaCoinSizes.size40,
      },

      size.isSize72 && {
        fontSize: FontSizes.xxLarge,
        height: personaCoinSizes.size72,
        lineHeight: personaCoinSizes.size72,
      },

      size.isSize100 && {
        fontSize: FontSizes.superLarge,
        height: personaCoinSizes.size100,
        lineHeight: personaCoinSizes.size100,
      }
    ]
  });
};
