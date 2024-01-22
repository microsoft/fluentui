import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';
import { Label, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Mode = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div>
        <Label> Compact </Label>
        <Rating mode="read-only-compact" ratingLabel={3} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Read Only </Label>
        <Rating mode="read-only" value={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Brand Compact </Label>
        <Rating color="brand" mode="read-only-compact" ratingLabel={3} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Brand Read Only </Label>
        <Rating color="brand" mode="read-only" value={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Marigold Compact </Label>
        <Rating color="marigold" mode="read-only-compact" ratingLabel={3} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Marigold Read Only </Label>
        <Rating color="marigold" mode="read-only" value={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />
      </div>
    </div>
  );
};

Mode.parameters = {
  docs: {
    description: {
      story: 'You can specify the mode of the Rating component with the "mode" prop.',
    },
  },
};
