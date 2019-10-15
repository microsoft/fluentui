import { IPersonaCoinStyleProps, IPersonaCoinStyles, PersonaSize } from '../Persona.types';
import { HighContrastSelector, FontSizes, FontWeights, getGlobalClassNames } from '../../../Styling';
import { sizeBoolean, sizeToPixels } from '../PersonaConsts';

const GlobalClassNames = {
  coin: 'ms-Persona-coin',
  imageArea: 'ms-Persona-imageArea',
  image: 'ms-Persona-image',
  initials: 'ms-Persona-initials',
  size10: 'ms-Persona--size10',
  size16: 'ms-Persona--size16',
  size24: 'ms-Persona--size24',
  size28: 'ms-Persona--size28',
  size32: 'ms-Persona--size32',
  size40: 'ms-Persona--size40',
  size48: 'ms-Persona--size48',
  size72: 'ms-Persona--size72',
  size100: 'ms-Persona--size100'
};

export const getStyles = (props: IPersonaCoinStyleProps): IPersonaCoinStyles => {
  const { className, theme, coinSize } = props;

  const { palette } = theme;

  const size = sizeBoolean(props.size as PersonaSize);

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // Static colors used when displaying 'unknown persona' coin
  const unknownPersonaBackgroundColor = 'rgb(234, 234, 234)';
  const unknownPersonaFontColor = 'rgb(168, 0, 0)';

  const dimension = coinSize || (props.size && sizeToPixels[props.size]) || 48;

  return {
    coin: [
      classNames.coin,
      theme.fonts.medium,
      size.isSize10 && classNames.size10,
      size.isSize16 && classNames.size16,
      size.isSize24 && classNames.size24,
      size.isSize28 && classNames.size28,
      size.isSize32 && classNames.size32,
      size.isSize40 && classNames.size40,
      size.isSize48 && classNames.size48,
      size.isSize72 && classNames.size72,
      size.isSize100 && classNames.size100,
      className
    ],

    size10WithoutPresenceIcon: {
      fontSize: '10px',
      position: 'absolute',
      top: '5px',
      right: 'auto',
      left: 0
    },

    imageArea: [
      classNames.imageArea,
      {
        position: 'relative',
        textAlign: 'center',
        flex: '0 0 auto',
        height: dimension,
        width: dimension
      },

      dimension <= 10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0
      }
    ],

    image: [
      classNames.image,
      {
        marginRight: '10px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
        borderRadius: '50%',
        perspective: '1px'
      },

      dimension <= 10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0
      },

      dimension > 10 && {
        height: dimension,
        width: dimension
      }
    ],

    initials: [
      classNames.initials,
      {
        borderRadius: '50%',
        color: props.showUnknownPersonaCoin ? unknownPersonaFontColor : palette.white,
        fontSize: FontSizes.large,
        fontWeight: FontWeights.regular,
        lineHeight: dimension === 48 ? 46 : dimension, // copying the logic for the dimensions; defaulted to 46 for size48
        height: dimension,

        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
            MsHighContrastAdjust: 'none',
            color: 'WindowText',
            boxSizing: 'border-box',
            backgroundColor: 'Window !important'
          }
        }
      },

      props.showUnknownPersonaCoin && {
        backgroundColor: unknownPersonaBackgroundColor
      },

      dimension < 32 && {
        fontSize: FontSizes.xSmall
      },

      dimension >= 32 &&
        dimension < 48 && {
          fontSize: FontSizes.medium
        },

      dimension >= 72 &&
        dimension < 100 && {
          fontSize: FontSizes.xxLarge
        },

      dimension >= 100 && {
        fontSize: FontSizes.superLarge
      }
    ]
  };
};
