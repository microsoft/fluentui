import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Color = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <RatingDisplay value={3.5} ratingDisplayLabel={3.5} ratingDisplayCountLabel={'1,160'} />

      <RatingDisplay color="brand" value={3} ratingDisplayLabel={3} ratingDisplayCountLabel={'1,160'} />

      <RatingDisplay color="marigold" value={3.5} ratingDisplayLabel={3.5} ratingDisplayCountLabel={'1,160'} />
    </div>
  );
};

Color.parameters = {
  docs: {
    description: {
      story: "A RatingDisplay's `color` can be `neutral` (default), `brand`, or `marigold`.",
    },
  },
};
