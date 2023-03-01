import * as React from 'react';
import { Calendar, CalendarProps } from '@fluentui/react-datepicker';
import { makeStyles, tokens, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    [`& *:focus-visible`]: {
      backgroundColor: 'hotpink',
    },
  },
  wrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding('50px'),
  },
});

export const Default = (props: Partial<CalendarProps>) => {
  const style = useStyles();

  return (
    <div className={style.wrapper}>
      <Calendar className={style.root} {...props} />
    </div>
  );
};
