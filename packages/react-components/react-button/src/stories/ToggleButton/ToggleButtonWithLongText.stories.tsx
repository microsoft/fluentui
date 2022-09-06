import * as React from 'react';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const WithLongText = () => {
  const styles = useStyles();

  return (
    <>
      <ToggleButton>Short text</ToggleButton>
      <ToggleButton className={styles.longText}>
        Long text wraps after it hits the max width of the component
      </ToggleButton>
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
