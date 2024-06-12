import * as React from 'react';
import { Rating } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Color = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Rating defaultValue={3} />

      <Rating color="brand" defaultValue={3} />

      <Rating color="marigold" defaultValue={3} />
    </div>
  );
};

Color.parameters = {
  docs: {
    description: {
      story: "A Rating's `color` can be `neutral` (default), `brand`, or `marigold`.",
    },
  },
};
