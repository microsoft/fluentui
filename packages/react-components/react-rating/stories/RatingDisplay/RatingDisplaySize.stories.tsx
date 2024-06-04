import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-components';
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
      <RatingDisplay value={3} size="small" />
      <RatingDisplay value={3} size="medium" />
      <RatingDisplay value={3} size="large" />
      <RatingDisplay value={3} size="extra-large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A RatingDisplay's `size` can be `small`, `medium`, `large`, or `extra-large`.",
    },
  },
};
