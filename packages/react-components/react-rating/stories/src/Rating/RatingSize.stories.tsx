import * as React from 'react';
import { Rating } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Size = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Rating defaultValue={3} size="small" />
      <Rating defaultValue={3} size="medium" />
      <Rating defaultValue={3} size="large" />
      <Rating defaultValue={3} size="extra-large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Rating's `size` can be `small`, `medium`, `large`, or `extra-large`.",
    },
  },
};
