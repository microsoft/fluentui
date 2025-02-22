import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    ...shorthands.gap('5px'),
    ...shorthands.padding('50px', '120px'),
    backgroundColor: tokens.colorNeutralBackground1,

    '& button, & .target': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    },
  },
  wrapperBordered: {
    position: 'relative',
    height: '400px',
    width: '400px',
    padding: '10px',
    ...shorthands.border('1px', 'dashed', 'red'),
  },
});
