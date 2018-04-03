import {
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles,
  PersonaPresence,
  PersonaSize,
} from './Persona.types';
import {
  FontSizes,
  HighContrastSelector,
  HighContrastBWSelector,
} from '../../Styling';
import {
  personaPresenceSize,
  presenceBoolean,
  sizeBoolean,
} from './PersonaConsts';

export const getStyles = (
  props: IPersonaPresenceStyleProps
): IPersonaPresenceStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette } = theme;

  const size = sizeBoolean(props.size as PersonaSize);
  const presence = presenceBoolean(props.presence as PersonaPresence);

  // Presence colors
  const presenceColorAvailable = '#7FBA00';
  const presenceColorAway = '#FCD116';
  const presenceColorBusy = '#D93B3B';
  const presenceColorDnd = '#E81123';
  const presenceColorOffline = '#93ABBD';

  return ({
    presence: [
      'ms-Persona-presence',
      {
        backgroundColor: presenceColorAvailable,
        position: 'absolute',
        height: personaPresenceSize.size12,
        width: personaPresenceSize.size12,
        borderRadius: '50%',
        top: 'auto',
        right: `-${personaPresenceSize.border}`,
        bottom: `-${personaPresenceSize.border}`,
        border: `${personaPresenceSize.border} solid ${palette.white}`,
        textAlign: 'center',
        boxSizing: 'content-box',
        MsHighContrastAdjust: 'none',

        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
            color: 'Window',
            backgroundColor: 'WindowText',
          }
        }
      },

      size.isSize10 && {
        right: 'auto',
        top: '7px',
        left: 0,
        border: 0,

        selectors: {
          [HighContrastSelector]: {
            top: '9px',
            border: '1px solid WindowText',
          }
        }
      },

      (size.isSize10 || size.isSize24 || size.isSize28 || size.isSize32) && {
        height: personaPresenceSize.size8,
        width: personaPresenceSize.size8,
      },

      size.isSize16 && {
        height: personaPresenceSize.size6,
        width: personaPresenceSize.size6,
        borderWidth: '1.5px',
      },

      (size.isSize24 || size.isSize28) && {
        selectors: {
          ':after': {
            display: 'none',
          }
        }
      },

      size.isSize72 && {
        height: personaPresenceSize.size20,
        width: personaPresenceSize.size20,
      },

      size.isSize100 && {
        height: personaPresenceSize.size28,
        width: personaPresenceSize.size28,
      },

      presence.isAvailable && {
        backgroundColor: presenceColorAvailable,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText',
          },
        }
      },

      presence.isAway && {
        backgroundColor: presenceColorAway,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText',
          }
        }
      },

      presence.isBlocked && {
        backgroundColor: palette.white,

        selectors: {
          ':before': {
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            boxShadow: `0 0 0 2px ${presenceColorBusy} inset`,
            borderRadius: '50%',
          },

          ':after': {
            content: '""',
            width: '100%',
            height: '2px',
            backgroundColor: presenceColorBusy,
            transform: 'rotate(-45deg)',
            position: 'absolute',
            top: '40%',
            left: 0,
          },

          [HighContrastSelector]: {
            color: palette.contrastBlackDisabled,
            backgroundColor: 'Window',

            selectors: {
              ':before': {
                boxShadow: `0 0 0 2px ${palette.contrastBlackDisabled} inset`,
              },

              ':after': {
                backgroundColor: palette.contrastBlackDisabled,
              }
            }
          },

          [HighContrastBWSelector]: {
            color: palette.contrastWhiteDisabled,

            selectors: {
              ':before': {
                boxShadow: `0 0 0 2px ${palette.contrastWhiteDisabled} inset`,
              },

              ':after': {
                backgroundColor: palette.contrastWhiteDisabled,
              }
            }
          }
        }
      },

      presence.isBlocked && size.isSize72 && {
        selectors: {
          ':after': {
            top: '9px',
          }
        }
      },

      presence.isBlocked && size.isSize100 && {
        selectors: {
          ':after': {
            top: '13px',
          }
        }
      },

      presence.isBusy && {
        backgroundColor: presenceColorBusy,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: palette.contrastBlackDisabled,
          },

          [HighContrastBWSelector]: {
            backgroundColor: palette.contrastWhiteDisabled,
          }
        }
      },

      presence.isDoNotDisturb && {
        backgroundColor: presenceColorDnd,

        selectors: {
          [HighContrastSelector]: {
            color: palette.black,
            backgroundColor: palette.contrastBlackDisabled,

            selectors: {
              ':before': {
                backgroundColor: palette.contrastBlackDisabled,
              },

              ':after': {
                backgroundColor: palette.contrastBlackDisabled,
              },
            }
          },

          [HighContrastBWSelector]: {
            backgroundColor: palette.contrastWhiteDisabled,
          }
        }
      },

      presence.isOffline && {
        backgroundColor: presenceColorOffline,

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
      },
    ],

    presenceIcon: [
      'ms-Persona-presenceIcon',
      {
        color: palette.white,
        fontSize: '6px',
        lineHeight: personaPresenceSize.size12,
        verticalAlign: 'top',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
          }
        }
      },

      size.isSize72 && {
        fontSize: FontSizes.small,
        lineHeight: personaPresenceSize.size20,
      },

      size.isSize100 && {
        fontSize: FontSizes.medium,
        lineHeight: personaPresenceSize.size28,
      },

      presence.isAway && {
        position: 'relative',
        left: '1px',
      },
    ]
  });
};
