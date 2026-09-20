import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-modern-components-preview/rating';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Size = (): React.ReactNode => {
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
