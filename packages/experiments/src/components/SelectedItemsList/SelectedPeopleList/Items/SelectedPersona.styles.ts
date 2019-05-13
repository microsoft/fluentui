import { FontSizes, IRawStyle } from 'office-ui-fabric-react/lib/Styling';
import { HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';
import { ISelectedPersonaStyleProps, ISelectedPersonaStyles } from './SelectedPersona.types';

export const getStyles = (props: ISelectedPersonaStyleProps): ISelectedPersonaStyles => {
  const { theme: maybeTheme, isSelected, isValid } = props;
  // theme is actually non-nullable (supplied by styles)
  const theme = maybeTheme!;
  const { palette } = theme;

  return {
    personaContainer: [
      {
        borderRadius: 15,
        display: 'inline-flex',
        alignItems: 'center',
        background: isSelected ? palette.themePrimary : palette.themeLighterAlt,
        margin: 4,
        cursor: 'default',
        userSelect: 'none',
        verticalAlign: 'middle',
        position: 'relative'
      },
      {
        selectors: {
          // hover styles
          ':hover': [
            {
              background: palette.themeLighter
            },
            {
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText'
                }
              }
            }
          ],
          // primary text in personas
          '.ms-Persona-primaryText': {
            color: !isValid
              ? // red iff valid, else white iff selected, else dark
                palette.red
              : isSelected
              ? palette.white
              : palette.themeDark,
            fontSize: FontSizes.small,
            selectors: {
              [HighContrastSelector]: {
                color: 'HighlightText'
              }
            }
          },
          // Make initials large when invalid and rendering a persona without an image
          '.ms-Persona-initials': isValid
            ? {}
            : {
                fontSize: 20
              },
          // Add border and background in high contrast
          [HighContrastSelector]: {
            borderColor: 'Highlight',
            background: 'Highlight',
            '-ms-high-contrast-adjust': 'none'
            // cast here because '-ms-high-contrast-adjust is not on styles
          } as IRawStyle
        }
      },
      isSelected && {
        background: palette.themePrimary,
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          }
        }
      }
    ],
    // Class applied to all 3 buttons
    actionButton: [
      {
        color: palette.white,
        selectors: {
          '.ms-Button-icon': {
            color: isSelected ? palette.white : palette.themeDark,
            selectors: {
              ':hover': {
                backgroundColor: isSelected ? palette.themeDark : undefined
              },
              [HighContrastSelector]: {
                color: 'HighlightText'
              }
            }
          }
        }
      }
    ],
    personaWrapper: [
      {
        position: 'relative',
        display: 'inherit',
        selectors: {
          '.ms-Persona-details': {
            padding: '0 8px'
          }
        }
      }
    ],
    expandButton: [
      {
        borderRadius: '15px 0px 0px 15px',
        height: 33,
        width: 44,
        paddingRight: 16,
        position: 'inherit',
        display: 'flex',
        marginRight: -17
      }
    ],
    removeButton: [
      {
        borderRadius: 15,
        flex: '0 0 auto',
        width: 33,
        height: 33,
        flexBasis: 32
      }
    ],
    itemContentWrapper: [
      {
        flex: '0 1 auto',
        minWidth: 0,
        /** Needed for IE 11 to properly truncate long persona names in the picker **/
        maxWidth: '100%'
      }
    ]
  };
};
