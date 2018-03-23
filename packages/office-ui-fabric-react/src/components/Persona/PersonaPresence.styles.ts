import { IPersonaPresenceStyleProps, IPersonaPresenceStyles } from './Persona.types';
import {
  HighContrastSelector,
} from '../../Styling';

export const getStyles = (
  props: IPersonaPresenceStyleProps
): IPersonaPresenceStyles => {
  const {
    className,
    theme,
    presence: presenceEnum
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

  // Presence Sizes
  const personaPresenceSize6 = '6px';
  const personaPresenceSize8 = '8px';
  const personaPresenceSize12 = '12px';
  const personaPresenceSize20 = '20px';
  const personaPresenceSize28 = '28px';
  const personaPresenceBorder = '2px';

  return ({
    presense: [
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

    presenseIcon: ['ms-Persona-presenceIcon'],
  });
};
