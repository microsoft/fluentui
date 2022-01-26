import { PersonaPresence, PersonaSize } from '../Persona.types';
import { HighContrastSelector, getGlobalClassNames, getHighContrastNoAdjustStyle } from '../../../Styling';
import { personaPresenceSize, presenceBoolean, sizeBoolean } from '../PersonaConsts';
import type { IPersonaPresenceStyleProps, IPersonaPresenceStyles } from '../Persona.types';
import type { IRawStyle } from '../../../Styling';

const GlobalClassNames = {
  presence: 'ms-Persona-presence',
  presenceIcon: 'ms-Persona-presenceIcon',
};

export const getStyles = (props: IPersonaPresenceStyleProps): IPersonaPresenceStyles => {
  const { theme, presenceColors } = props;
  const { semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const size = sizeBoolean(props.size as PersonaSize);
  const presence = presenceBoolean(props.presence as PersonaPresence);

  // Presence colors
  const presenceColorAvailable = (presenceColors && presenceColors.available) || '#6BB700';
  const presenceColorAway = (presenceColors && presenceColors.away) || '#FFAA44';
  const presenceColorBusy = (presenceColors && presenceColors.busy) || '#C43148';
  const presenceColorDnd = (presenceColors && presenceColors.dnd) || '#C50F1F';
  const presenceColorOffline = (presenceColors && presenceColors.offline) || '#8A8886';
  const presenceColorOof = (presenceColors && presenceColors.oof) || '#B4009E';
  const presenceColorBackground = (presenceColors && presenceColors.background) || semanticColors.bodyBackground;

  const isOpenCirclePresence =
    presence.isOffline ||
    (props.isOutOfOffice && (presence.isAvailable || presence.isBusy || presence.isAway || presence.isDoNotDisturb));

  const borderSizeForSmallPersonas = '1px';
  const borderSizeForLargePersonas = '2px';

  const borderSize = size.isSize72 || size.isSize100 ? borderSizeForLargePersonas : borderSizeForSmallPersonas;

  return {
    presence: [
      classNames.presence,
      {
        position: 'absolute',
        height: personaPresenceSize.size12,
        width: personaPresenceSize.size12,
        borderRadius: '50%',
        top: 'auto',
        right: '-2px',
        bottom: '-2px',
        border: `2px solid ${presenceColorBackground}`,
        textAlign: 'center',
        boxSizing: 'content-box',
        backgroundClip: 'border-box',
        ...getHighContrastNoAdjustStyle(),

        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
            backgroundColor: 'WindowText',
          },
        },
      },

      (size.isSize8 || size.isSize10) && {
        right: 'auto',
        top: '7px',
        left: 0,
        border: 0,

        selectors: {
          [HighContrastSelector]: {
            top: '9px',
            border: '1px solid WindowText',
          },
        },
      },

      (size.isSize8 || size.isSize10 || size.isSize24 || size.isSize28 || size.isSize32) &&
        makeSizeStyle(personaPresenceSize.size8),

      (size.isSize40 || size.isSize48) && makeSizeStyle(personaPresenceSize.size12),

      size.isSize16 && {
        height: personaPresenceSize.size6,
        width: personaPresenceSize.size6,
        borderWidth: '1.5px',
      },

      size.isSize56 && makeSizeStyle(personaPresenceSize.size16),

      size.isSize72 && makeSizeStyle(personaPresenceSize.size20),

      size.isSize100 && makeSizeStyle(personaPresenceSize.size28),

      size.isSize120 && makeSizeStyle(personaPresenceSize.size32),

      presence.isAvailable && {
        backgroundColor: presenceColorAvailable,

        selectors: {
          [HighContrastSelector]: backgroundColor('Highlight'),
        },
      },

      presence.isAway && backgroundColor(presenceColorAway),

      presence.isBlocked && [
        {
          selectors: {
            // Only show :after at larger sizes
            ':after':
              size.isSize40 || size.isSize48 || size.isSize72 || size.isSize100
                ? {
                    content: '""',
                    width: '100%',
                    height: borderSize,
                    backgroundColor: presenceColorBusy,
                    transform: 'translateY(-50%) rotate(-45deg)',
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                  }
                : undefined,

            [HighContrastSelector]: {
              selectors: {
                ':after': {
                  width: `calc(100% - 4px)`,
                  left: '2px',
                  backgroundColor: 'Window',
                },
              },
            },
          },
        },
      ],

      presence.isBusy && backgroundColor(presenceColorBusy),

      presence.isDoNotDisturb && backgroundColor(presenceColorDnd),

      presence.isOffline && backgroundColor(presenceColorOffline),

      (isOpenCirclePresence || presence.isBlocked) && [
        {
          backgroundColor: presenceColorBackground,

          selectors: {
            ':before': {
              content: '""',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              border: `${borderSize} solid ${presenceColorBusy}`,
              borderRadius: '50%',
              boxSizing: 'border-box',
            },
            [HighContrastSelector]: {
              backgroundColor: 'WindowText',

              selectors: {
                ':before': {
                  width: `calc(100% - 2px)`,
                  height: `calc(100% - 2px)`,
                  top: '1px',
                  left: '1px',
                  borderColor: 'Window',
                },
              },
            },
          },
        },
      ],

      isOpenCirclePresence && presence.isAvailable && makeBeforeBorderStyle(borderSize, presenceColorAvailable),

      isOpenCirclePresence && presence.isBusy && makeBeforeBorderStyle(borderSize, presenceColorBusy),

      isOpenCirclePresence && presence.isAway && makeBeforeBorderStyle(borderSize, presenceColorOof),

      isOpenCirclePresence && presence.isDoNotDisturb && makeBeforeBorderStyle(borderSize, presenceColorDnd),

      isOpenCirclePresence && presence.isOffline && makeBeforeBorderStyle(borderSize, presenceColorOffline),

      isOpenCirclePresence &&
        presence.isOffline &&
        props.isOutOfOffice &&
        makeBeforeBorderStyle(borderSize, presenceColorOof),
    ],

    presenceIcon: [
      classNames.presenceIcon,
      {
        color: presenceColorBackground,
        fontSize: '6px', // exception case where we don't have an available theme.fonts variable to match it.
        lineHeight: personaPresenceSize.size12,
        verticalAlign: 'top',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
          },
        },
      },

      size.isSize56 && {
        fontSize: '8px', // exception case where we don't have an available theme.fonts variable to match it.
        lineHeight: personaPresenceSize.size16,
      },

      size.isSize72 && {
        fontSize: fonts.small.fontSize,
        lineHeight: personaPresenceSize.size20,
      },

      size.isSize100 && {
        fontSize: fonts.medium.fontSize,
        lineHeight: personaPresenceSize.size28,
      },

      size.isSize120 && {
        fontSize: fonts.medium.fontSize,
        lineHeight: personaPresenceSize.size32,
      },

      presence.isAway && {
        position: 'relative',
        left: isOpenCirclePresence ? undefined : '1px',
      },

      isOpenCirclePresence && presence.isAvailable && makeOpenCircleIconStyle(presenceColorAvailable),

      isOpenCirclePresence && presence.isBusy && makeOpenCircleIconStyle(presenceColorBusy),

      isOpenCirclePresence && presence.isAway && makeOpenCircleIconStyle(presenceColorOof),

      isOpenCirclePresence && presence.isDoNotDisturb && makeOpenCircleIconStyle(presenceColorDnd),

      isOpenCirclePresence && presence.isOffline && makeOpenCircleIconStyle(presenceColorOffline),

      isOpenCirclePresence && presence.isOffline && props.isOutOfOffice && makeOpenCircleIconStyle(presenceColorOof),
    ],
  };
};

function makeOpenCircleIconStyle(color: string): IRawStyle {
  return {
    color,
    borderColor: color,
  };
}

function makeBeforeBorderStyle(borderSize: string, color: string): IRawStyle {
  return {
    selectors: {
      ':before': {
        border: `${borderSize} solid ${color}`,
      },
    },
  };
}

function makeSizeStyle(size: string): IRawStyle {
  return {
    height: size,
    width: size,
  };
}

function backgroundColor(color: string): IRawStyle {
  return { backgroundColor: color };
}
