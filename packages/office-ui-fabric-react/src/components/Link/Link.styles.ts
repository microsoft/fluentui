import {
  getFocusStyle,
  HighContrastSelector
} from '../../Styling';
import {
  ILinkStyleProps,
  ILinkStyles
} from './Link.types';

export const getStyles = (props: ILinkStyleProps): ILinkStyles => {
  const { theme } = props;
  const { palette } = theme;

  return {
    root: [
      'ms-Link',
      {
        color: palette.themePrimary,
        margin: 0,
        overflow: 'inherit',
        padding: 0,
        textOverflow: 'inherit',
        selectors: {
          'button&': [
            getFocusStyle(theme),
            {
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline',
              fontSize: 'inherit',
              textAlign: 'left',
              selectors: {
                [HighContrastSelector]: {
                  color: 'Highlight'
                }
              }
            }
          ],
          'a&': [
            getFocusStyle(theme),
            {
              textDecoration: 'none'
            }
          ]
        }
      }
    ]
  };
};