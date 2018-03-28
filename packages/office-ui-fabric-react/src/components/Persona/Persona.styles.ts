import {
  IPersonaStyleProps,
  IPersonaStyles,
  PersonaPresence,
  PersonaSize
} from './Persona.types';
import {
  FontSizes,
  FontWeights,
  IStyle,
  normalize,
  noWrap,
  zIndex,
} from '../../Styling';
import {
  personaSize,
  presenceBoolean,
  sizeBoolean,
} from './PersonaConsts';

export const getStyles = (
  props: IPersonaStyleProps
): IPersonaStyles => {
  const {
    className,
    showSecondaryText,
    theme,
  } = props;

  const { palette } = theme;

  const size = sizeBoolean(props.size as PersonaSize);
  const presence = presenceBoolean(props.presence as PersonaPresence);

  const showSecondaryTextDefaultHeight = '16px';

  const sharedTextStyles: IStyle = {
    color: palette.neutralSecondary,
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.small,
  };

  return ({
    root: [
      'ms-Persona',
      normalize,
      {
        color: palette.neutralPrimary,
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        position: 'relative',
        height: personaSize.size48,
        minWidth: personaSize.size48,
        display: 'flex',
        alignItems: 'center',

        selectors: {
          '.contextualHost': {
            display: 'none',
          },

          ':hover': {
            selectors: {
              '$primaryText': {
                color: palette.neutralDark,
              }
            }
          }
        }
      },

      size.isSize10 && [
        'ms-Persona--size10',
        {
          height: personaSize.size10,
          minWidth: personaSize.size10,
        }
      ],

      size.isSize16 && [
        'ms-Persona--size16',
        {
          height: personaSize.size16,
          minWidth: personaSize.size16,
        }
      ],

      size.isSize24 && [
        'ms-Persona--size24',
        {
          height: personaSize.size24,
          minWidth: personaSize.size24,
        }
      ],

      size.isSize24 && showSecondaryText && {
        height: '36px',
      },

      size.isSize28 && [
        'ms-Persona--size28',
        {
          height: personaSize.size28,
          minWidth: personaSize.size28,
        }
      ],

      size.isSize28 && showSecondaryText && {
        height: '32px',
      },

      size.isSize32 && [
        'ms-Persona--size32',
        {
          height: personaSize.size32,
          minWidth: personaSize.size32,
        }
      ],

      size.isSize40 && [
        'ms-Persona--size40',
        {
          height: personaSize.size40,
          minWidth: personaSize.size40,
        }
      ],

      size.isSize48 && 'ms-Persona--size48',

      size.isSize72 && [
        'ms-Persona--size72',
        {
          height: personaSize.size72,
          minWidth: personaSize.size72,
        }
      ],

      size.isSize100 && [
        'ms-Persona--size100',
        {
          height: personaSize.size100,
          minWidth: personaSize.size100,
        }
      ],

      /**
       * Modifiers: presence
       */
      presence.isAvailable && 'ms-Persona--online',
      presence.isAway && 'ms-Persona--away',
      presence.isBlocked && 'ms-Persona--blocked',
      presence.isBusy && 'ms-Persona--busy',
      presence.isDoNotDisturb && 'ms-Persona--donotdisturb',
      presence.isOffline && 'ms-Persona--offline',
      className,
    ],

    placeholder: [
      'ms-Persona-placeholder',
      {
        color: palette.white,
        position: 'absolute',
        right: '0',
        left: '0',
        fontSize: '47px',
        top: '9px',
        zIndex: zIndex.middle,
      },

      (size.isSize16 || size.isSize24 || size.isSize28) && {
        fontSize: '18px',
        top: '4px',
      },

      size.isSize32 && {
        fontSize: '28px',
        top: '6px',
      },

      size.isSize40 && {
        fontSize: '38px',
        top: '5px',
      },

      size.isSize72 && {
        fontSize: '67px',
        top: '10px',
      },

      size.isSize100 && {
        fontSize: '95px',
        top: '12px',
      },
    ],

    details: [
      'ms-Persona-details',
      {
        padding: '0 24px 0 16px',
        minWidth: 0,
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },

      size.isSize10 && {
        paddingLeft: '17px',
      },

      (size.isSize24 || size.isSize28) && {
        padding: '0 12px',
      }
    ],

    primaryText: [
      'ms-Persona-primaryText',
      noWrap,
      {
        color: palette.neutralPrimary,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.large,
      },

      showSecondaryText && {
        height: showSecondaryTextDefaultHeight,
        lineHeight: showSecondaryTextDefaultHeight,
        overflowX: 'hidden',
      },

      size.isSize10 && {
        fontSize: FontSizes.small,
        lineHeight: personaSize.size10,
      },

      (size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40) && {
        fontSize: FontSizes.medium,
      },

      size.isSize16 && {
        lineHeight: personaSize.size28,
      },

      size.isSize24 && showSecondaryText && { height: '18px' },

      size.isSize72 && {
        fontSize: FontSizes.xLarge,
      },

      size.isSize100 && {
        fontSize: FontSizes.xLarge,
        fontWeight: FontWeights.semilight,
      }
    ],

    secondaryText: [
      'ms-Persona-secondaryText',
      noWrap,
      sharedTextStyles,

      (size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && {
        display: 'none',
      },

      size.isSize24 && showSecondaryText && {
        height: '18px',
      },

      (size.isSize72 || size.isSize100) && {
        fontSize: FontSizes.medium,
      },

      showSecondaryText && {
        display: 'block',
        height: showSecondaryTextDefaultHeight,
        lineHeight: showSecondaryTextDefaultHeight,
        overflowX: 'hidden',
      }
    ],

    tertiaryText: [
      'ms-Persona-tertiaryText',
      noWrap,
      sharedTextStyles,
      {
        display: 'none',
      },

      (size.isSize72 || size.isSize100) && {
        display: 'block',
      }
    ],

    optionalText: [
      'ms-Persona-optionalText',
      noWrap,
      sharedTextStyles,
      {
        display: 'none',
      },

      size.isSize100 && {
        display: 'block',
      }
    ],

    textContent: [
      'ms-Persona-textContent',
      noWrap
    ],
  });
};
