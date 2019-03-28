import { getTheme, mergeStyleSets, DefaultFontStyles, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
export const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, -1),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: theme.palette.neutralLight }
      }
    }
  ],
  itemName: [
    DefaultFontStyles.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  ]
});
