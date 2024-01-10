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

export const Color = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Rating color="brand" defaultValue={3} ratingLabel={3} ratingCountLabel="1,160" />

      <Rating color="marigold" defaultValue={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />

      <Rating defaultValue={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />
    </div>
  );
};

Color.parameters = {
  docs: {
    description: {
      story: 'You can specify the appearance of the Rating component with the "color" prop.',
    },
  },
};
