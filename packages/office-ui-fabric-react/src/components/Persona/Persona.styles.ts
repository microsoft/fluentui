import { IPersonaStyleProps, IPersonaStyles } from './Persona.types';
import {
  IStyle,
  ITheme,
  normalize,
  FontSizes,
  FontWeights,
  zIndex,
} from '../../Styling';
import { optionalText } from 'office-ui-fabric-react/lib/components/Persona/Persona.scss';

export const getStyles = (
  props: IPersonaStyleProps
): IPersonaStyles => {
  const {
    className,
    theme,
    personaSize,
    readOnly,
    showSecondaryText,
    darkText,
    isSelectable,
    extraLarge,
    isAvailable,
    isAway,
    isBlocked,
    isBusy,
    isDoNotDisturb,
    isOffline,
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
      className
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
      {}
    ],

    presenseIcon: [
      {}
    ],

    details: [
      {}
    ],

    primaryText: [
      {}
    ],

    secondaryText: [
      {}
    ],

    tertiaryText: [
      {}
    ],

    optionalText: [
      {}
    ],

    textContent: [
      {}
    ]
  });
};
