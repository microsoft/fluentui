import { IPersonaStyleProps, IPersonaStyles, PersonaPresence, PersonaSize } from './Persona.types';
import {
  FontSizes,
  FontWeights,
  HighContrastSelector,
  IStyle,
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
    isDarkText,
    isReadOnly,
    isSelectable,
    showSecondaryText,
    presence,
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

  const HighContrastBWSelector = '@media screen and (-ms-high-contrast: black-on-white)';

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

      /**
       * Modifier: Size 10 Persona
       */
      isSize10 && [
        'ms-Persona--size10',
        {
          height: personaSize10,
          minWidth: personaSize10,

          selectors: {
            '$presence': {
              right: 'auto',
              top: '7px',
              left: 0,
              border: 0,
              height: personaPresenceSize8,
              width: personaPresenceSize8,

              selectors: {
                [HighContrastSelector]: {
                  top: '9px',
                  border: '1px solid WindowText',
                },

                '$presenceIcon': {
                  display: 'none',
                }
              }
            },

            '$details': {
              paddingLeft: '17px',
            },

            '$primaryText': {
              fontSize: FontSizes.small,
              lineHeight: personaSize10,
            },

            '$secondaryText': {
              display: 'none',
            }
          }
        }
      ],

      /**
       * Modifier: Size 10 Persona with read only state
       *
       * This variant includes a semicolon, and is
       * most often presented within a People Picker.
       */
      isSize10 && isReadOnly && {
        padding: 0,
        backgroundColor: 'transparent',

        selectors: {
          '$primaryText:after': {
            content: ';',
          }
        }
      },

      /**
       * Modifier: Size 16 Persona
       */
      isSize16 && [
        'ms-Persona--size16',
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

      /**
       * Modifier: Size 24 Persona
       */
      isSize24 && [
        'ms-Persona--size24',
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

      /**
       * Modifier: Size 28 Persona
       */
      isSize28 && [
        'ms-Persona--size28',
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

      /**
       * Modifier: Size 32 Persona
       */
      isSize32 && [
        'ms-Persona--size32',
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

      /**
       * Modifier: Size 40 Persona
       */
      isSize40 && [
        'ms-Persona--size40',
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

      /**
       * Modifier: Size 72 Persona
       */
      isSize72 && [
        'ms-Persona--size72',
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

      /**
       * Modifier: Size 100 Persona
       */
      isSize100 && [
        'ms-Persona--size100',
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

      /**
       * Modifier: Persona with darker text
       *
       * Note: Typically applied when the component has a colored background.
       */
      isDarkText && [
        'ms-Persona--DarkText',
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

      /**
       * Modifier: Selectable Persona
       */
      isSelectable && [
        'ms-Persona--Selected',
        {
          cursor: 'pointer',
          padding: '0 10px',
        }
      ],

      isSelectable && !isSize100 && [
        {
          selectors: {
            '&:hover, &:focus': {
              backgroundColor: palette.themeLighter,
              outline: '1px solid transparent',
            }
          }
        }
      ],

      /**
       * === Presence indicator variants. ===
       */

      /**
       * Modifier: Persona with available presence
       */
      isAvailable && [
        'ms-Persona--online',
        {
          selectors: {
            '$presence': {
              backgroundColor: colorPresenceAvailable,
            },

            [HighContrastSelector]: {
              backgroundColor: 'WindowText',
            },

            [HighContrastBWSelector]: {
              backgroundColor: palette.white,
            }
          }
        }
      ],

      /**
       * Modifier: Persona with away presence
       */
      isAway && [
        'ms-Persona--away',
        {
          selectors: {
            '$presence': {
              backgroundColor: colorPresenceAway,

              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: 'WindowText',
                }
              }
            },

            '$presenceIcon': {
              position: 'relative',
              left: '1px',
            }
          }
        }
      ],

      /**
       * Modifier: Persona with blocked presence
       */
      isBlocked && [
        'ms-Persona--blocked',
        {
          selectors: {
            '$presence': {
              backgroundColor: palette.white,

              selectors: {
                '&:before': {
                  content: '""',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  boxShadow: `0 0 0 2px ${colorPresenceBusyAverage} inset`,
                  borderRadius: '50%',
                },

                '&:after': {
                  content: '""',
                  width: '100%',
                  height: '2px',
                  backgroundColor: colorPresenceBusyAverage,
                  transform: 'rotate(-45deg)',
                  position: 'absolute',
                  top: '40%',
                  left: 0,
                },

                [HighContrastSelector]: {
                  color: palette.contrastBlackDisabled,
                  backgroundColor: 'Window',

                  selectors: {
                    '&:before': {
                      boxShadow: `0 0 0 2px ${palette.contrastBlackDisabled} inset`,
                    },

                    '&:after': {
                      backgroundColor: palette.contrastBlackDisabled,
                    }
                  }
                },

                [HighContrastBWSelector]: {
                  color: palette.contrastWhiteDisabled,

                  selectors: {
                    '&:before': {
                      boxShadow: `0 0 0 2px ${palette.contrastWhiteDisabled} inset`,
                    },

                    '&:after': {
                      backgroundColor: palette.contrastWhiteDisabled,
                    }
                  }
                }
              }
            }
          }
        }
      ],

      isBlocked && isSize72 && [
        {
          selectors: {
            '$presence': {
              selectors: {
                '&:after': {
                  top: '9px',
                }
              }
            }
          }
        }
      ],

      isBlocked && isSize100 && [
        {
          selectors: {
            '$presence': {
              selectors: {
                '&:after': {
                  top: '13px',
                }
              }
            }
          }
        }
      ],

      /**
       * Modifier: Persona with busy presence
       */
      isBusy && [
        'ms-Persona--Busy',
        {
          selectors: {
            '$presence': {
              backgroundColor: colorPresenceBusyAverage,

              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: palette.contrastBlackDisabled,
                },

                [HighContrastBWSelector]: {
                  backgroundColor: palette.contrastWhiteDisabled,
                }
              }
            }
          }
        }
      ],

      /**
       * Modifier: Persona with do not disturb presence
       */
      isDoNotDisturb && [
        'ms-Persona--DoNotDisturb',
        {
          selectors: {
            '$presence': {
              backgroundColor: colorPresenceDndBackground,

              selectors: {
                [HighContrastSelector]: {
                  color: palette.black,
                  backgroundColor: palette.contrastBlackDisabled,

                  selectors: {
                    '&:before': {
                      backgroundColor: palette.contrastBlackDisabled,
                    },

                    '&:after': {
                      backgroundColor: palette.contrastBlackDisabled,
                    }
                  }
                },

                [HighContrastBWSelector]: {
                  backgroundColor: palette.contrastWhiteDisabled,
                }
              }
            }
          }
        }
      ],

      /**
       * Modifier: Persona with offline presence
       */
      isOffline && [
        'ms-Persona--Offline',
        {
          selectors: {
            '$presence': {
              backgroundColor: colorPresenceOffline,

              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: palette.contrastBlackDisabled,
                  boxShadow: `0 0 0 1px ${palette.white} inset`,
                },

                [HighContrastBWSelector]: {
                  backgroundColor: palette.white,
                  boxShadow: `0 0 0 1px ${palette.black} inset`,
                }
              }
            }
          }
        }
      ],

      className,
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
      }
    ],

    primaryText: [
      'ms-Persona-primaryText',
      noWrap,
      {
        color: palette.neutralPrimary,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.large,
      }
    ],

    secondaryText: [
      'ms-Persona-secondaryText',
      noWrap,
      sharedTextStyles
    ],

    tertiaryText: [
      'ms-Persona-tertiaryText',
      noWrap,
      sharedTextStyles,
      {
        display: 'none',
      }
    ],

    optionalText: [
      'ms-Persona-optionalText',
      noWrap,
      sharedTextStyles,
      {
        display: 'none',
      }
    ],

    textContent: [
      'ms-Persona-textContent',
      noWrap
    ],
  });
};
