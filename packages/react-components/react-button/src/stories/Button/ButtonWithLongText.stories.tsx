import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const WithLongText = () => {
  const styles = useStyles();

  return (
    <>
      <Button>Short text</Button>
      <Button className={styles.longText}>Long text wraps after it hits the max width of the component</Button>
    </>
  );
};

WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text wraps after it hits the max width of the component.',
    },
  },
};
