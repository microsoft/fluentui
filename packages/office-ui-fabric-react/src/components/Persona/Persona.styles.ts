import { IPersonaStyleProps, IPersonaStyles, PersonaSize } from './Persona.types';
import {
  FontSizes,
  FontWeights,
  HighContrastSelector,
  IStyle,
  ITheme,
  normalize,
  noWrap,
  zIndex,
} from '../../Styling';
import { optionalText } from 'office-ui-fabric-react/lib/components/Persona/Persona.scss';

export const getStyles = (
  props: IPersonaStyleProps
): IPersonaStyles => {
  const {
    className,
    extraLarge,
    isAvailable,
    isAway,
    isBlocked,
    isBusy,
    isDarkText,
    isDoNotDisturb,
    isOffline,
    isReadOnly,
    isSelectable,
    showSecondaryText,
    size,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  // Skype presence colors
  const colorPresenceAvailable = '#7FBA00';
  const colorPresenceAway = '#FCD116';
  const colorPresenceBusy = '#E81123';
  const colorPresenceDndBackground = '#E81123';
  const colorPresenceDndLine = '#FFFFFF';
  const colorPresenceOffline = '#93ABBD';
  const colorPresenceOutOfOffice = palette.magenta;

  // Other presence colors
  const colorPresenceBlockedBackground = '#DEDEDE';
  const colorPresenceBlockedLine = '#C72D25';
  const colorPresenceBusyStripeLight = '#E57A79';
  const colorPresenceBusyStripeDark = '#D00E0D';
  const colorPresenceBusyAverage = '#D93B3B';

  // Persona size conditionals
  const isSize10 = size === PersonaSize.size10;
  const isSize16 = size === PersonaSize.size16;
  const isSize24 = size === PersonaSize.size24;
  const isSize28 = size === PersonaSize.size28;
  const isSize32 = size === PersonaSize.size32;
  const isSize40 = size === PersonaSize.size40;
  const isSize48 = size === PersonaSize.size48;
  const isSize72 = size === PersonaSize.size72;
  const isSize100 = size === PersonaSize.size100;

  // Persona Sizes
  const personaSize10 = '20px';
  const personaSize16 = '16px';
  const personaSize24 = '24px';
  const personaSize28 = '28px';
  const personaSize32 = '32px';
  const personaSize40 = '40px';
  const personaSize48 = '48px';
  const personaSize72 = '72px';
  const personaSize100 = '100px';

  // Presence Sizes
  const personaPresenceSize6 = '6px';
  const personaPresenceSize8 = '8px';
  const personaPresenceSize12 = '12px';
  const personaPresenceSize20 = '20px';
  const personaPresenceSize28 = '28px';
  const personaPresenceBorder = '2px';

  const sharedTextStyles: IStyle = {
    color: palette.neutralSecondary,
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.small,
    whiteSpace: 'nowrap',
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
        display: 'flex',
        alignItems: 'center',

        selectors: {
          '.contextualHost': {
            display: 'none',
          },

          '&:hover': {
            selectors: {
              '$primaryText': {
                color: palette.neutralDark,
              }
            }
          }
        }
      },
      className,
      isSize10 && isReadOnly && [
        {
          padding: 0,
          backgroundColor: 'transparent',

          selectors: {
            '$primaryText:after': {
              content: ';',
            }
          }
        }
      ],
      isSize16 && [
        {
          height: personaSize16,
          minWidth: personaSize16,

          selectors: {
            '$placeholder': {
              fontSize: '18px',
              top: '4px',
            },

            '$presence': {
              height: personaPresenceSize6,
              width: personaPresenceSize6,
              borderWidth: '1.5px',
            },

            '$presenceIcon': {
              display: 'none',
            },

            '$primaryText': {
              fontSize: FontSizes.medium,
              lineHeight: personaSize28,
            },

            '$secondaryText': {
              display: 'none',
            }
          }
        }
      ],

      isSize24 && [
        {
          height: personaSize24,
          minWidth: personaSize24,

          selectors: {
            '$placeholder': {
              fontSize: '18px',
              top: '4px',
            },

            '$presence': {
              height: personaPresenceSize8,
              width: personaPresenceSize8,

              selectors: {
                '&:after': {
                  display: 'none',
                }
              }
            },

            '$presenceIcon': {
              display: 'none',
            },

            '$details': {
              padding: '0 12px',
            },

            '$primaryText': {
              fontSize: FontSizes.medium,
            },

            '$secondaryText': {
              display: 'none',
            }
          }
        },

        showSecondaryText && {
          height: '36px',

          selectors: {
            '$primaryText, $secondaryText': {
              display: 'block',
              height: '18px',
              lineHeight: '16px',
              overflowX: 'hidden',
            }
          }
        }
      ],

      isSize28 && [
        {
          height: personaSize28,
          minWidth: personaSize28,

          selectors: {
            '$placeholder': {
              fontSize: '18px',
              top: '4px',
            },

            '$presence': {
              height: personaPresenceSize8,
              width: personaPresenceSize8,

              selectors: {
                '&:after': {
                  display: 'none',
                }
              }
            },

            '$presenceIcon': {
              display: 'none',
            },

            '$details': {
              padding: '0 12px',
            },

            '$primaryText': {
              fontSize: FontSizes.medium,
            },

            '$secondaryText': {
              display: 'none',
            }
          }
        },

        showSecondaryText && {
          height: '32px',

          selectors: {
            '$primaryText, $secondaryText': {
              display: 'block',
              lineHeight: '16px',
              height: '16px',
              overflowX: 'hidden',
            }
          }
        }
      ],

      isSize32 && [
        {
          height: personaSize32,
          minWidth: personaSize32,

          selectors: {
            '$placeholder': {
              fontSize: '28px',
              top: '6px',
            },

            '$presence': {
              height: personaPresenceSize8,
              width: personaPresenceSize8,
            },

            '$presenceIcon': {
              display: 'none',
            },

            '$primaryText': {
              fontSize: FontSizes.medium,
            },

            '$secondaryText': {
              display: 'none',
            }
          }
        },

        showSecondaryText && {
          selectors: {
            '$primaryText, $secondaryText': {
              display: 'block',
              height: '16px',
              lineHeight: '16px',
              overflowX: 'hidden',
            }
          }
        }
      ],

      isSize40 && [
        {
          height: personaSize40,
          minWidth: personaSize40,

          selectors: {
            '$placeholder': {
              fontSize: '38px',
              top: '5px',
            },

            '$primaryText': {
              fontSize: FontSizes.medium,
            }
          }
        }
      ],

      isSize48 && [],

      isSize72 && [
        {
          height: personaSize72,
          maxWidth: personaSize72,

          selectors: {
            '$placeholder': {
              fontSize: '67px',
              top: '10px',
            },

            '$presence': {
              height: personaPresenceSize20,
              width: personaPresenceSize20,
            },

            '$presenceIcon': {
              lineHeight: personaPresenceSize20,
              fontSize: FontSizes.small,
            },

            '$primaryText': {
              fontSize: FontSizes.xLarge,
            },

            '$secondaryText': {
              fontSize: FontSizes.medium,
            },

            '$tertiaryText': {
              display: 'block',
            }
          }
        }
      ],

      isSize100 && [
        {
          height: personaSize100,
          maxWidth: personaSize100,

          selectors: {
            '$placeholder': {
              fontSize: '95px',
              top: '12px',
            },

            '$presence': {
              height: personaPresenceSize28,
              width: personaPresenceSize28,
            },

            '$presenceIcon': {
              fontSize: FontSizes.medium,
              lineHeight: personaPresenceSize28,
            },

            '$primaryText': {
              fontSize: FontSizes.xLarge,
              fontWeight: FontWeights.semilight,
            },

            '$secondaryText': {
              fontSize: FontSizes.medium,
            },

            '$tertiaryText, $optionalText': {
              display: 'block',
            }
          }
        }
      ],

      isDarkText && [
        {
          selectors: {
            '$primaryText': {
              color: palette.neutralDark,
            },

            '$secondaryText, $tertiaryText, $optionalText': {
              color: palette.neutralPrimary,
            }
          }
        }
      ],

      isSelectable && [
        {
          cursor: 'pointer',
          padding: '0 10px',
        }
      ],

      isSelectable && !extraLarge && [
        {
          selectors: {
            '&:hover, &:focus': {
              backgroundColor: palette.themeLighter,
              outline: '1px solid transparent',
            }
          }
        }
      ],

      isAvailable && [
        {
          selectors: {
            '$presence': {
              backgroundColor: colorPresenceAvailable,
            },

            [HighContrastSelector]: {
              backgroundColor: 'WindowText',
            },

            '@media screen and (-ms-high-contrast: black-on-white)': {
              backgroundColor: palette.white,
            }
          }
        }
      ],

      isAway && [],
      isBlocked && [],
      isBusy && [],
      isDoNotDisturb && [],
      isOffline && [],
      isReadOnly && [],
    ],

    placeholder: [
      {
        color: palette.white,
        position: 'absolute',
        right: '0',
        left: '0',
        fontSize: '47px',
        top: '9px',
        zIndex: zIndex.middle,
      }
    ],

    presense: [
      {
        backgroundColor: colorPresenceAvailable,
        position: 'absolute',
        height: personaPresenceSize12,
        width: personaPresenceSize12,
        borderRadius: '50%',
        top: 'auto',
        right: personaPresenceBorder,
        bottom: personaPresenceBorder,
        border: `${personaPresenceBorder} solid ${palette.white}`,
        textAlign: 'center',
        boxSizing: 'content-box',
        MsHighContrastAdjust: 'none',

        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
            color: 'Window',
            backgroundColor: 'WindowText',
          },

          '$presenseIcon': {
            color: palette.white,
            fontSize: '6px',
            lineHeight: personaPresenceSize12,
            verticalAlign: 'top',

            selectors: {
              [HighContrastSelector]: {
                color: 'Window',
              }
            }
          }
        }
      }
    ],

    presenseIcon: [
      {}
    ],

    details: [
      {
        padding: '0 24px 0 16px',
        minWidth: 0,
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }
    ],

    primaryText: [
      noWrap,
      {
        color: palette.neutralPrimary,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.large,
      }
    ],

    secondaryText: [
      noWrap,
      sharedTextStyles,
      {}
    ],

    tertiaryText: [
      noWrap,
      sharedTextStyles,
      {
        display: 'none',
      }
    ],

    optionalText: [
      noWrap,
      sharedTextStyles,
      {
        display: 'none',
      }
    ],

    textContent: [
      noWrap,
      {},
    ],
  });
};
