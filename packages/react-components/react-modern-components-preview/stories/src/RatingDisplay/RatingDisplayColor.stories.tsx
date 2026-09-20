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

export const Color = (): React.ReactNode => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <RatingDisplay value={3} />

      <RatingDisplay color="brand" value={3} />

      <RatingDisplay color="marigold" value={3} />
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
