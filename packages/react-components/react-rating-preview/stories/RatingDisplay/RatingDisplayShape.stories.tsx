import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';
import { CircleFilled, SquareFilled } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Shape = () => {
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
