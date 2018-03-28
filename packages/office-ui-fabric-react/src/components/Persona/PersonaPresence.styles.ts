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

export const getStyles = (
  props: IPersonaPresenceStyleProps
): IPersonaPresenceStyles => {
  const {
    className,
    theme,
    presence,
    size,
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
  // const colorPresenceOutOfOffice = palette.magenta;

  // Other presence colors
  const colorPresenceBusyAverage = '#D93B3B';

  // Presence Sizes
  const personaPresenceSize6 = '6px';
  const personaPresenceSize8 = '8px';
  const personaPresenceSize12 = '12px';
  const personaPresenceSize20 = '20px';
  const personaPresenceSize28 = '28px';
  const personaPresenceBorder = '2px';

  return ({
    presence: [
      'ms-Persona-presence',
      {
        backgroundColor: colorPresenceAvailable,
        position: 'absolute',
        height: personaPresenceSize12,
        width: personaPresenceSize12,
        borderRadius: '50%',
        top: 'auto',
        right: `-${personaPresenceBorder}`,
        bottom: `-${personaPresenceBorder}`,
        border: `${personaPresenceBorder} solid ${palette.white}`,
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

      isSize10 && {
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
          }
        }
      },

      isSize16 && {
        height: personaPresenceSize6,
        width: personaPresenceSize6,
        borderWidth: '1.5px',
      },

      isSize24 && {
        height: personaPresenceSize8,
        width: personaPresenceSize8,

        selectors: {
          ':after': {
            display: 'none',
          }
        }
      },

      isSize28 && {
        height: personaPresenceSize8,
        width: personaPresenceSize8,

        selectors: {
          ':after': {
            display: 'none',
          }
        }
      },

      isSize32 && {
        height: personaPresenceSize8,
        width: personaPresenceSize8,
      },

      isSize72 && {
        height: personaPresenceSize20,
        width: personaPresenceSize20,
      },

      isSize100 && {
        height: personaPresenceSize28,
        width: personaPresenceSize28,
      },

      isAvailable && {
        backgroundColor: colorPresenceAvailable,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText',
          },
        }
      },

      isAway && {
        backgroundColor: colorPresenceAway,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText',
          }
        }
      },

      isBlocked && {
        backgroundColor: palette.white,

        selectors: {
          ':before': {
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            boxShadow: `0 0 0 2px ${colorPresenceBusyAverage} inset`,
            borderRadius: '50%',
          },

          ':after': {
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

      isBlocked && isSize72 && {
        selectors: {
          ':after': {
            top: '9px',
          }
        }
      },

      isBlocked && isSize100 && {
        selectors: {
          ':after': {
            top: '13px',
          }
        }
      },

      isBusy && {
        backgroundColor: colorPresenceBusyAverage,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: palette.contrastBlackDisabled,
          },

          [HighContrastBWSelector]: {
            backgroundColor: palette.contrastWhiteDisabled,
          }
        }
      },

      isDoNotDisturb && {
        backgroundColor: colorPresenceDndBackground,

        selectors: {
          ':before, :after': {
            backgroundColor: palette.contrastBlackDisabled,
          },

          ':after': {
            backgroundColor: palette.contrastBlackDisabled,
          },

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

            selectors: {
              ':before': {
                backgroundColor: palette.contrastWhiteDisabled,
              },

              ':after': {
                backgroundColor: palette.contrastWhiteDisabled,
              },
            }
          }
        }
      },

      isOffline && {
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
      },
    ],

    presenceIcon: [
      'ms-Persona-presenceIcon',
      {
        color: palette.white,
        fontSize: '6px',
        lineHeight: personaPresenceSize12,
        verticalAlign: 'top',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
          }
        }
      },

      (isSize10 || isSize16 || isSize24 || isSize28 || isSize32) && {
        display: 'none',
      },

      isSize72 && {
        fontSize: FontSizes.small,
        lineHeight: personaPresenceSize20,
      },

      isSize100 && {
        fontSize: FontSizes.medium,
        lineHeight: personaPresenceSize28,
      },

      isAway && {
        position: 'relative',
        left: '1px',
      },
    ]
  });
};
