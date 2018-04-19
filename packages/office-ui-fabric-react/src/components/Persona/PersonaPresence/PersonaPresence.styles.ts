import {
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles,
  PersonaPresence,
  personaPresenceSizes,
  PersonaSize,
  presenceBoolean,
  sizeBoolean,
} from '../Persona.types';
import {
  FontSizes,
  HighContrastSelector,
} from '../../../Styling';

export const getStyles = (
  props: IPersonaPresenceStyleProps
): IPersonaPresenceStyles => {
  const { theme } = props;
  const { semanticColors } = theme;

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
        position: 'absolute',
        height: personaPresenceSizes.size12,
        width: personaPresenceSizes.size12,
        borderRadius: '50%',
        top: 'auto',
        right: `-${personaPresenceSizes.border}`,
        bottom: `-${personaPresenceSizes.border}`,
        border: `${personaPresenceSizes.border} solid ${semanticColors.bodyBackground}`,
        textAlign: 'center',
        boxSizing: 'content-box',
        backgroundClip: 'content-box',
        MsHighContrastAdjust: 'none',

        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
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
        height: personaPresenceSizes.size8,
        width: personaPresenceSizes.size8,
      },

      size.isSize16 && {
        height: personaPresenceSizes.size6,
        width: personaPresenceSizes.size6,
        borderWidth: '1.5px',
      },

      size.isSize72 && {
        height: personaPresenceSizes.size20,
        width: personaPresenceSizes.size20,
      },

      size.isSize100 && {
        height: personaPresenceSizes.size28,
        width: personaPresenceSizes.size28,
      },

      presence.isAvailable && {
        backgroundColor: presenceColorAvailable,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Highlight',
          },
        }
      },

      presence.isAway && {
        backgroundColor: presenceColorAway,
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
              border: `${personaPresenceSizes.border} solid ${presenceColorBusy}`,
              borderRadius: '50%',
              boxSizing: 'border-box',
            },

            // Only show :after at larger sizes
            ':after': (size.isSize40 || size.isSize48 || size.isSize72 || size.isSize100) ? {
              content: '""',
              width: '100%',
              height: personaPresenceSizes.border,
              backgroundColor: presenceColorBusy,
              transform: 'translateY(-50%) rotate(-45deg)',
              position: 'absolute',
              top: '50%',
              left: 0,
            } : undefined,

            [HighContrastSelector]: {
              backgroundColor: 'WindowText',

              selectors: {
                ':before': {
                  width: `calc(100% - ${personaPresenceSizes.border})`,
                  height: `calc(100% - ${personaPresenceSizes.border})`,
                  top: parseFloat(personaPresenceSizes.border) / 2 + 'px',
                  left: parseFloat(personaPresenceSizes.border) / 2 + 'px',
                  borderColor: 'Window',
                },

                ':after': {
                  width: `calc(100% - ${parseFloat(personaPresenceSizes.border) * 2}px)`,
                  left: personaPresenceSizes.border,
                  backgroundColor: 'Window',
                }
              }
            },
          }
        },
      ],

      presence.isBusy && {
        backgroundColor: presenceColorBusy,
      },

      presence.isDoNotDisturb && {
        backgroundColor: presenceColorDnd,
      },

      presence.isOffline && {
        backgroundColor: presenceColorOffline,
      },
    ],

    presenceIcon: [
      'ms-Persona-presenceIcon',
      {
        color: semanticColors.bodyBackground,
        fontSize: '6px',
        lineHeight: personaPresenceSizes.size12,
        verticalAlign: 'top',
        userSelect: 'none',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
          }
        }
      },

      size.isSize72 && {
        fontSize: FontSizes.small,
        lineHeight: personaPresenceSizes.size20,
      },

      size.isSize100 && {
        fontSize: FontSizes.medium,
        lineHeight: personaPresenceSizes.size28,
      },

      presence.isAway && {
        position: 'relative',
        left: '1px',
      },
    ]
  });
};
