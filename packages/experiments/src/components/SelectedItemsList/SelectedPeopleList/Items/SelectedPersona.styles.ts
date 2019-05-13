import { IStyle, FontSizes, FontWeights, DefaultPalette, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (props: ISelectedPersonaStyleProps): ISelectedPersonaStyles => {
  const { className, theme } = props;
  const { palette } = theme!;
  const { color } = theme;

  return {
    personaContainer: [
      {
        borderRadius: 15,
        display: 'inline-flex',
        alignItems: 'center',
        background: theme.palette.neutralLighterAlt,
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
              background: theme.palette.themeLighter
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
          '.ms-Persona-primaryText': [
            {
              color: theme.palette.themeDark,
              fontSize: FontSizes.medium
            },
            {
              selectors: {
                [HighContrastSelector]: 'HighlightText'
              }
            }
          ]
        }
      }
    ]
  };
};
