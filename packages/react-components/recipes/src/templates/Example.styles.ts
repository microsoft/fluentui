import { tokens } from '@fluentui/react-theme';
import { makeStyles, shorthands } from '@griffel/react';

export const useExampleStyles = makeStyles({
  root: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius('16px'),
    ...shorthands.padding('30px'),
    ...shorthands.margin('6px'),
  },
  innerContainer: {
    display: 'flex',
    backgroundColor: 'rgb(250, 250, 250)',
    ...shorthands.padding('48px', '24px', '48px', '24px'),
  },
  centered: {
    justifyContent: 'center',
  },
});
