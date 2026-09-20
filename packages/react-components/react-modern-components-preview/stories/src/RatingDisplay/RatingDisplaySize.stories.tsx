import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-modern-components-preview/rating-display';

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
