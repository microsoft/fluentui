import { PersonaSize } from '../Persona.types';
import { HighContrastSelector, FontWeights, getGlobalClassNames, getHighContrastNoAdjustStyle } from '../../../Styling';
import { sizeBoolean, sizeToPixels } from '../PersonaConsts';
import type { IPersonaCoinStyleProps, IPersonaCoinStyles } from '../Persona.types';

const GlobalClassNames = {
  coin: 'ms-Persona-coin',
  imageArea: 'ms-Persona-imageArea',
  image: 'ms-Persona-image',
  initials: 'ms-Persona-initials',
  size8: 'ms-Persona--size8',
  size10: 'ms-Persona--size10',
  size16: 'ms-Persona--size16',
  size24: 'ms-Persona--size24',
  size28: 'ms-Persona--size28',
  size32: 'ms-Persona--size32',
  size40: 'ms-Persona--size40',
  size48: 'ms-Persona--size48',
  size56: 'ms-Persona--size56',
  size72: 'ms-Persona--size72',
  size100: 'ms-Persona--size100',
  size120: 'ms-Persona--size120',
};

export const getStyles = (props: IPersonaCoinStyleProps): IPersonaCoinStyles => {
  const { className, theme, coinSize } = props;

  const { palette, fonts } = theme;

  const size = sizeBoolean(props.size as PersonaSize);

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // Static colors used when displaying 'unknown persona' coin
  const unknownPersonaBackgroundColor = 'rgb(234, 234, 234)';
  const unknownPersonaFontColor = 'rgb(168, 0, 0)';

  const dimension = coinSize || (props.size && sizeToPixels[props.size]) || 48;

  return {
    coin: [
      classNames.coin,
      fonts.medium,
      size.isSize8 && classNames.size8,
      size.isSize10 && classNames.size10,
      size.isSize16 && classNames.size16,
      size.isSize24 && classNames.size24,
      size.isSize28 && classNames.size28,
      size.isSize32 && classNames.size32,
      size.isSize40 && classNames.size40,
      size.isSize48 && classNames.size48,
      size.isSize56 && classNames.size56,
      size.isSize72 && classNames.size72,
      size.isSize100 && classNames.size100,
      size.isSize120 && classNames.size120,
      className,
    ],

    size10WithoutPresenceIcon: {
      fontSize: fonts.xSmall.fontSize,
      position: 'absolute',
      top: '5px',
      right: 'auto',
      left: 0,
    },

    imageArea: [
      classNames.imageArea,
      {
        position: 'relative',
        textAlign: 'center',
        flex: '0 0 auto',
        height: dimension,
        width: dimension,
      },

      dimension <= 10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },
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
        perspective: '1px',
      },

      dimension <= 10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0,
      },

      dimension > 10 && {
        height: dimension,
        width: dimension,
      },
    ],

    initials: [
      classNames.initials,
      {
        borderRadius: '50%',
        color: props.showUnknownPersonaCoin ? unknownPersonaFontColor : palette.white,
        fontSize: fonts.large.fontSize,
        fontWeight: FontWeights.semibold,
        // copying the logic for the dimensions; defaulted to 46 for size48
        lineHeight: dimension === 48 ? 46 : dimension,
        height: dimension,

        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
            ...getHighContrastNoAdjustStyle(),
            color: 'WindowText',
            boxSizing: 'border-box',
            backgroundColor: 'Window !important',
          },
          i: {
            fontWeight: FontWeights.semibold,
          },
        },
      },

      props.showUnknownPersonaCoin && {
        backgroundColor: unknownPersonaBackgroundColor,
      },

      dimension < 32 && {
        fontSize: fonts.xSmall.fontSize,
      },

      dimension >= 32 &&
        dimension < 40 && {
          fontSize: fonts.medium.fontSize,
        },

      dimension >= 40 &&
        dimension < 56 && {
          fontSize: fonts.mediumPlus.fontSize,
        },

      dimension >= 56 &&
        dimension < 72 && {
          fontSize: fonts.xLarge.fontSize,
        },

      dimension >= 72 &&
        dimension < 100 && {
          fontSize: fonts.xxLarge.fontSize,
        },

      dimension >= 100 && {
        fontSize: fonts.superLarge.fontSize,
      },
    ],
  };
};
