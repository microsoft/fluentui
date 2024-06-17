import { tokens } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

export const useExampleStyles = makeStyles({
  root: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '16px',
    padding: '30px',
    margin: '6px',
  },
  innerContainer: {
    display: 'flex',
    backgroundColor: 'rgb(250, 250, 250)',
    padding: '48px 24px 48px 24px',
  },
  centered: {
    justifyContent: 'center',
  },
});
