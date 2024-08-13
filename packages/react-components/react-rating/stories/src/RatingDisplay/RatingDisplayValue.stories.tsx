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

export const Value = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RatingDisplay value={1} />
      <RatingDisplay value={3.7} />
      <RatingDisplay value={3.9} />
      <RatingDisplay value={5} />
    </div>
  );
};

Value.parameters = {
  docs: {
    description: {
      story:
        'The `value` controls the number of filled stars, and is written out next to the RatingDisplay. The number of filled stars is rounded to the nearest half-star.',
    },
  },
};
