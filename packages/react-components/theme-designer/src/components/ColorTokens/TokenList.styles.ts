import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  colorLabel: {
    color: tokens.colorBrandForeground1,
  },
  selected: {
    fontWeight: 'bold',
  },
  cellRow: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  badge: {
    marginRight: tokens.spacingHorizontalS,
  },
  colorPreview: {
    display: 'inline',
    paddingLeft: '5px',
    paddingRight: '5px',
    /* eslint-disable deprecation/deprecation */
    ...shorthands.borderRadius('10px'),
    /* eslint-enable deprecation/deprecation */
  },
  menu: {
    marginTop: tokens.spacingVerticalXS,
  },
  output: {
    fontSize: tokens.fontSizeBase200,
  },
});
