import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { CircleFilled, SquareFilled } from '@fluentui/react-icons';
import { RatingDisplay } from '@fluentui/react-modern-components-preview/rating-display';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Shape = (): React.ReactNode => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <RatingDisplay icon={CircleFilled} value={3.5} />
      <RatingDisplay icon={SquareFilled} value={3.5} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'You can pass in a custom icon to the RatingDisplay component using the `icon` prop.',
    },
  },
};
