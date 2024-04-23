import { makeStyles, shorthands } from '@fluentui/react-components';
import { SendRegular, SendFilled } from '@fluentui/react-icons';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('5px'),
  },

  icon24: { fontSize: '24px' },
  icon32: { fontSize: '32px' },
  icon48: { fontSize: '48px' },
});

export const Default = () => {
  const classes = useClasses();

  return (
    <>
      <div className={classes.container}>
        <SendRegular className={classes.icon24} />
        <SendRegular className={classes.icon32} />
        <SendRegular className={classes.icon48} />
      </div>
      <div className={classes.container}>
        <SendFilled className={classes.icon24} />
        <SendFilled className={classes.icon32} />
        <SendFilled className={classes.icon48} />
      </div>
    </>
  );
};
