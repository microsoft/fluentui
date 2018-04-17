import {
  IPersonaStyleProps,
  IPersonaStyles,
  PersonaPresence,
  PersonaSize,
  personaCoinSizes,
  presenceBoolean,
  sizeBoolean,
} from './Persona.types';
import {
  FontSizes,
  FontWeights,
  IStyle,
  normalize,
  noWrap,
} from '../../Styling';

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
        height: personaCoinSizes.size48,
        minWidth: personaCoinSizes.size48,
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
          height: personaCoinSizes.size10,
          minWidth: personaCoinSizes.size10,
        }
      ],

      size.isSize16 && [
        'ms-Persona--size16',
        {
          height: personaCoinSizes.size16,
          minWidth: personaCoinSizes.size16,
        }
      ],

      size.isSize24 && [
        'ms-Persona--size24',
        {
          height: personaCoinSizes.size24,
          minWidth: personaCoinSizes.size24,
        }
      ],

      size.isSize24 && showSecondaryText && {
        height: '36px',
      },

      size.isSize28 && [
        'ms-Persona--size28',
        {
          height: personaCoinSizes.size28,
          minWidth: personaCoinSizes.size28,
        }
      ],

      size.isSize28 && showSecondaryText && {
        height: '32px',
      },

      size.isSize32 && [
        'ms-Persona--size32',
        {
          height: personaCoinSizes.size32,
          minWidth: personaCoinSizes.size32,
        }
      ],

      size.isSize40 && [
        'ms-Persona--size40',
        {
          height: personaCoinSizes.size40,
          minWidth: personaCoinSizes.size40,
        }
      ],

      size.isSize48 && 'ms-Persona--size48',

      size.isSize72 && [
        'ms-Persona--size72',
        {
          height: personaCoinSizes.size72,
          minWidth: personaCoinSizes.size72,
        }
      ],

      size.isSize100 && [
        'ms-Persona--size100',
        {
          height: personaCoinSizes.size100,
          minWidth: personaCoinSizes.size100,
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
        lineHeight: personaCoinSizes.size10,
      },

      (size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40) && {
        fontSize: FontSizes.medium,
      },

      size.isSize16 && {
        lineHeight: personaCoinSizes.size28,
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
