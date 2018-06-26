import { IPersonaPresenceStyleProps, IPersonaPresenceStyles, PersonaPresence, PersonaSize } from '../Persona.types';
import { FontSizes, HighContrastSelector, getGlobalClassNames } from '../../../Styling';
import { personaPresenceSize, presenceBoolean, sizeBoolean } from '../PersonaConsts';

const GlobalClassNames = {
  presence: 'ms-Persona-presence',
  presenceIcon: 'ms-Persona-presenceIcon'
};

export const getStyles = (props: IPersonaPresenceStyleProps): IPersonaPresenceStyles => {
  const { theme } = props;
  const { semanticColors } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const size = sizeBoolean(props.size as PersonaSize);
  const presence = presenceBoolean(props.presence as PersonaPresence);

  // Presence colors
  const presenceColorAvailable = '#7FBA00';
  const presenceColorAway = '#FCD116';
  const presenceColorBusy = '#D93B3B';
  const presenceColorDnd = '#E81123';
  const presenceColorOffline = '#93ABBD';

  return {
    presence: [
      classNames.presence,
      {
        position: 'absolute',
        height: personaPresenceSize.size12,
        width: personaPresenceSize.size12,
        borderRadius: '50%',
        top: 'auto',
        right: `-${personaPresenceSize.border}`,
        bottom: `-${personaPresenceSize.border}`,
        border: `${personaPresenceSize.border} solid ${semanticColors.bodyBackground}`,
        textAlign: 'center',
        boxSizing: 'content-box',
        backgroundClip: 'content-box',
        MsHighContrastAdjust: 'none',

        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
            backgroundColor: 'WindowText'
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
            border: '1px solid WindowText'
          }
        }
      },

      (size.isSize10 || size.isSize24 || size.isSize28 || size.isSize32) && {
        height: personaPresenceSize.size8,
        width: personaPresenceSize.size8
      },

      size.isSize16 && {
        height: personaPresenceSize.size6,
        width: personaPresenceSize.size6,
        borderWidth: '1.5px'
      },

      size.isSize72 && {
        height: personaPresenceSize.size20,
        width: personaPresenceSize.size20
      },

      size.isSize100 && {
        height: personaPresenceSize.size28,
        width: personaPresenceSize.size28
      },

      presence.isAvailable && {
        backgroundColor: presenceColorAvailable,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Highlight'
          }
        }
      },

      presence.isAway && {
        backgroundColor: presenceColorAway
      },

      presence.isBlocked && [
        {
          backgroundColor: semanticColors.bodyBackground,

          selectors: {
            ':before': {
              content: '""',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              border: `${personaPresenceSize.border} solid ${presenceColorBusy}`,
              borderRadius: '50%',
              boxSizing: 'border-box'
            },

            // Only show :after at larger sizes
            ':after':
              size.isSize40 || size.isSize48 || size.isSize72 || size.isSize100
                ? {
                    content: '""',
                    width: '100%',
                    height: personaPresenceSize.border,
                    backgroundColor: presenceColorBusy,
                    transform: 'translateY(-50%) rotate(-45deg)',
                    position: 'absolute',
                    top: '50%',
                    left: 0
                  }
                : undefined,

            [HighContrastSelector]: {
              backgroundColor: 'WindowText',

              selectors: {
                ':before': {
                  width: `calc(100% - ${personaPresenceSize.border})`,
                  height: `calc(100% - ${personaPresenceSize.border})`,
                  top: parseFloat(personaPresenceSize.border) / 2 + 'px',
                  left: parseFloat(personaPresenceSize.border) / 2 + 'px',
                  borderColor: 'Window'
                },

                ':after': {
                  width: `calc(100% - ${parseFloat(personaPresenceSize.border) * 2}px)`,
                  left: personaPresenceSize.border,
                  backgroundColor: 'Window'
                }
              }
            }
          }
        }
      ],

      presence.isBusy && {
        backgroundColor: presenceColorBusy
      },

      presence.isDoNotDisturb && {
        backgroundColor: presenceColorDnd
      },

      presence.isOffline && {
        backgroundColor: presenceColorOffline
      }
    ],

    presenceIcon: [
      classNames.presenceIcon,
      {
        color: semanticColors.bodyBackground,
        fontSize: '6px',
        lineHeight: personaPresenceSize.size12,
        verticalAlign: 'top',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window'
          }
        }
      },

      size.isSize72 && {
        fontSize: FontSizes.small,
        lineHeight: personaPresenceSize.size20
      },

      size.isSize100 && {
        fontSize: FontSizes.medium,
        lineHeight: personaPresenceSize.size28
      },

      presence.isAway && {
        position: 'relative',
        left: '1px'
      }
    ]
  };
};
