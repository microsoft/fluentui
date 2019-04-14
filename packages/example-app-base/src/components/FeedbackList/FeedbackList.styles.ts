import { getTheme, mergeStyleSets, DefaultFontStyles, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
// TODO any is used because of a strange dependency resolution issue with @uifabric/legacy
// tslint:disable-next-line: no-any
export const classNames: any = mergeStyleSets({
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
