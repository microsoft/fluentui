import { AccessTimeFilled, SendRegular } from '@fluentui/react-icons';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },

  iconAccessTime: {
    color: tokens.colorPaletteLightGreenForeground2,
    fontSize: '32px',
  },
  iconSend: {
    color: tokens.colorPaletteDarkOrangeForeground2,
    fontSize: '64px',
  },
});

export const Styling = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <AccessTimeFilled aria-label="An AccessTimeFilled icon" className={classes.iconAccessTime} />
      <SendRegular aria-label="A SendRegular icon" className={classes.iconSend} />
    </div>
  );
};

Styling.parameters = {
  docs: {
    description: {
      story: 'Colors & sizes of icons could be tweaked using CSS. Bundled icons can be styled the same way.',
    },
  },
};
