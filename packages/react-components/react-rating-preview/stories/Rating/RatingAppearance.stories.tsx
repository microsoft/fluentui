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

export const Appearance = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div>
        <Label> Brand </Label>
        <Rating appearance="brand" defaultValue={3} ratingLabel={3} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Marigold </Label>
        <Rating appearance="marigold" defaultValue={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />
      </div>
      <div>
        <Label> Neutral </Label>
        <Rating defaultValue={3.5} ratingLabel={3.5} ratingCountLabel="1,160" />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'You can specify the appearance of the Rating component with the "appearance" prop.',
    },
  },
};
