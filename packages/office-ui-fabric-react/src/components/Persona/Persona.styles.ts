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

export const getStyles = (
  props: IPersonaStyleProps
): IPersonaStyles => {
  const {
    className,
    presence,
    showSecondaryText,
    size,
    theme,
  } = props;

  const { palette } = theme;

  // Persona presence conditionals
  const isAvailable = presence === PersonaPresence.online;
  const isAway = presence === PersonaPresence.away;
  const isBlocked = presence === PersonaPresence.blocked;
  const isBusy = presence === PersonaPresence.busy;
  const isDoNotDisturb = presence === PersonaPresence.dnd;
  const isOffline = presence === PersonaPresence.offline;

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
  const personaSize10 = '20px';
  const personaSize16 = '16px';
  const personaSize24 = '24px';
  const personaSize28 = '28px';
  const personaSize32 = '32px';
  const personaSize40 = '40px';
  const personaSize48 = '48px'; // default
  const personaSize72 = '72px';
  const personaSize100 = '100px';

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
        height: personaSize48,
        minWidth: personaSize48,
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

      isSize10 && [
        'ms-Persona--size10',
        {
          height: personaSize10,
          minWidth: personaSize10,
        }
      ],

      isSize16 && [
        'ms-Persona--size16',
        {
          height: personaSize16,
          minWidth: personaSize16,
        }
      ],

      isSize24 && [
        'ms-Persona--size24',
        {
          height: personaSize24,
          minWidth: personaSize24,
        }
      ],

      isSize24 && showSecondaryText && {
        height: '36px',
      },

      isSize28 && [
        'ms-Persona--size28',
        {
          height: personaSize28,
          minWidth: personaSize28,
        }
      ],

      isSize28 && showSecondaryText && {
        height: '32px',
      },

      isSize32 && [
        'ms-Persona--size32',
        {
          height: personaSize32,
          minWidth: personaSize32,
        }
      ],

      isSize40 && [
        'ms-Persona--size40',
        {
          height: personaSize40,
          minWidth: personaSize40,
        }
      ],

      isSize48 && 'ms-Persona--size48',

      isSize72 && [
        'ms-Persona--size72',
        {
          height: personaSize72,
          minWidth: personaSize72,
        }
      ],

      isSize100 && [
        'ms-Persona--size100',
        {
          height: personaSize100,
          minWidth: personaSize100,
        }
      ],

      /**
       * Modifiers: presence
       */
      isAvailable && 'ms-Persona--online',
      isAway && 'ms-Persona--away',
      isBlocked && 'ms-Persona--blocked',
      isBusy && 'ms-Persona--busy',
      isDoNotDisturb && 'ms-Persona--donotdisturb',
      isOffline && 'ms-Persona--offline',
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

      (isSize16 || isSize24 || isSize28) && {
        fontSize: '18px',
        top: '4px',
      },

      isSize32 && {
        fontSize: '28px',
        top: '6px',
      },

      isSize40 && {
        fontSize: '38px',
        top: '5px',
      },

      isSize72 && {
        fontSize: '67px',
        top: '10px',
      },

      isSize100 && {
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

      isSize10 && {
        paddingLeft: '17px',
      },

      (isSize24 || isSize28) && {
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
        height: '16px',
        lineHeight: '16px',
        overflowX: 'hidden',
      },

      isSize10 && {
        fontSize: FontSizes.small,
        lineHeight: personaSize10,
      },

      (isSize16 || isSize24 || isSize28 || isSize32 || isSize40) && {
        fontSize: FontSizes.medium,
      },

      isSize16 && {
        lineHeight: personaSize28,
      },

      isSize24 && showSecondaryText && { height: '18px' },

      isSize72 && {
        fontSize: FontSizes.xLarge,
      },

      isSize100 && {
        fontSize: FontSizes.xLarge,
        fontWeight: FontWeights.semilight,
      }
    ],

    secondaryText: [
      'ms-Persona-secondaryText',
      noWrap,
      sharedTextStyles,

      (isSize10 || isSize16 || isSize24 || isSize28 || isSize32) && {
        display: 'none',
      },

      isSize24 && showSecondaryText && {
        height: '18px',
      },

      (isSize72 || isSize100) && {
        fontSize: FontSizes.medium,
      },

      showSecondaryText && {
        display: 'block',
        height: '16px',
        lineHeight: '16px',
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

      (isSize72 || isSize100) && {
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

      isSize100 && {
        display: 'block',
      }
    ],

    textContent: [
      'ms-Persona-textContent',
      noWrap
    ],
  });
};
