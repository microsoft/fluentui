import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Size = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Rating size="small" />
      <Rating size="medium" />
      <Rating size="large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A Rating can be small, medium, or large. You can specify the size with the "size" prop.',
    },
  },
};
