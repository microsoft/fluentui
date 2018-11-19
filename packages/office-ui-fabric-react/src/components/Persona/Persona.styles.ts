import { IPersonaStyleProps, IPersonaStyles, PersonaPresence, PersonaSize } from './Persona.types';
import { FontSizes, FontWeights, IStyle, normalize, noWrap, getGlobalClassNames } from '../../Styling';
import { personaSize, presenceBoolean, sizeBoolean } from './PersonaConsts';

const GlobalClassNames = {
  root: 'ms-Persona',
  size10: 'ms-Persona--size10',
  size16: 'ms-Persona--size16',
  size24: 'ms-Persona--size24',
  size28: 'ms-Persona--size28',
  size32: 'ms-Persona--size32',
  size40: 'ms-Persona--size40',
  size48: 'ms-Persona--size48',
  size72: 'ms-Persona--size72',
  size100: 'ms-Persona--size100',
  available: 'ms-Persona--online',
  away: 'ms-Persona--away',
  blocked: 'ms-Persona--blocked',
  busy: 'ms-Persona--busy',
  doNotDisturb: 'ms-Persona--donotdisturb',
  offline: 'ms-Persona--offline',
  details: 'ms-Persona-details',
  primaryText: 'ms-Persona-primaryText',
  secondaryText: 'ms-Persona-secondaryText',
  tertiaryText: 'ms-Persona-tertiaryText',
  optionalText: 'ms-Persona-optionalText',
  textContent: 'ms-Persona-textContent'
};

export const getStyles = (props: IPersonaStyleProps): IPersonaStyles => {
  const { className, showSecondaryText, theme } = props;

  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const size = sizeBoolean(props.size as PersonaSize);
  const presence = presenceBoolean(props.presence as PersonaPresence);

  const showSecondaryTextDefaultHeight = '16px';

  const sharedTextStyles: IStyle = {
    color: palette.neutralSecondary,
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.small
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
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
            display: 'none'
          },

          ':hover': {
            selectors: {
              $primaryText: {
                color: palette.neutralDark
              }
            }
          }
        }
      },

      size.isSize10 && [
        classNames.size10,
        {
          height: personaSize.size10,
          minWidth: personaSize.size10
        }
      ],

      size.isSize16 && [
        classNames.size16,
        {
          height: personaSize.size16,
          minWidth: personaSize.size16
        }
      ],

      size.isSize24 && [
        classNames.size24,
        {
          height: personaSize.size24,
          minWidth: personaSize.size24
        }
      ],

      size.isSize24 &&
        showSecondaryText && {
          height: '36px'
        },

      size.isSize28 && [
        classNames.size28,
        {
          height: personaSize.size28,
          minWidth: personaSize.size28
        }
      ],

      size.isSize28 &&
        showSecondaryText && {
          height: '32px'
        },

      size.isSize32 && [
        classNames.size32,
        {
          height: personaSize.size32,
          minWidth: personaSize.size32
        }
      ],

      size.isSize40 && [
        classNames.size40,
        {
          height: personaSize.size40,
          minWidth: personaSize.size40
        }
      ],

      size.isSize48 && classNames.size48,

      size.isSize72 && [
        classNames.size72,
        {
          height: personaSize.size72,
          minWidth: personaSize.size72
        }
      ],

      size.isSize100 && [
        classNames.size100,
        {
          height: personaSize.size100,
          minWidth: personaSize.size100
        }
      ],

      /**
       * Modifiers: presence
       */
      presence.isAvailable && classNames.available,
      presence.isAway && classNames.away,
      presence.isBlocked && classNames.blocked,
      presence.isBusy && classNames.busy,
      presence.isDoNotDisturb && classNames.doNotDisturb,
      presence.isOffline && classNames.offline,
      className
    ],

    details: [
      classNames.details,
      {
        padding: '0 24px 0 16px',
        minWidth: 0,
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      },

      size.isSize10 && {
        paddingLeft: '17px'
      },

      (size.isSize24 || size.isSize28) && {
        padding: '0 12px'
      }
    ],

    primaryText: [
      classNames.primaryText,
      noWrap,
      {
        color: palette.neutralPrimary,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.large
      },

      showSecondaryText && {
        height: showSecondaryTextDefaultHeight,
        lineHeight: showSecondaryTextDefaultHeight,
        overflowX: 'hidden'
      },

      size.isSize10 && {
        fontSize: FontSizes.small,
        lineHeight: personaSize.size10
      },

      (size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40) && {
        fontSize: FontSizes.medium
      },

      size.isSize16 && {
        lineHeight: personaSize.size28
      },

      (size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40) &&
        showSecondaryText && {
          height: '18px'
        },

      size.isSize72 && {
        fontSize: FontSizes.xLarge
      },

      size.isSize100 && {
        fontSize: FontSizes.xLarge,
        fontWeight: FontWeights.semilight
      }
    ],

    secondaryText: [
      classNames.secondaryText,
      noWrap,
      sharedTextStyles,

      (size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && {
        display: 'none'
      },

      size.isSize24 &&
        showSecondaryText && {
          height: '18px'
        },

      (size.isSize72 || size.isSize100) && {
        fontSize: FontSizes.medium
      },

      showSecondaryText && {
        display: 'block',
        height: showSecondaryTextDefaultHeight,
        lineHeight: showSecondaryTextDefaultHeight,
        overflowX: 'hidden'
      }
    ],

    tertiaryText: [
      classNames.tertiaryText,
      noWrap,
      sharedTextStyles,
      {
        display: 'none'
      },

      (size.isSize72 || size.isSize100) && {
        display: 'block'
      }
    ],

    optionalText: [
      classNames.optionalText,
      noWrap,
      sharedTextStyles,
      {
        display: 'none'
      },

      size.isSize100 && {
        display: 'block'
      }
    ],

    textContent: [classNames.textContent, noWrap]
  };
};
