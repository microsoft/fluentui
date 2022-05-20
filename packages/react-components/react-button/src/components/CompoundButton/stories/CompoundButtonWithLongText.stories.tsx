import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { CompoundButton } from '../../../CompoundButton';

const useStyles = makeStyles({
  maxWidth: {
    maxWidth: '280px',
  },
});

export const WithLongText = () => {
  const styles = useStyles();

  return (
    <>
      <CompoundButton className={styles.maxWidth} secondaryContent="Secondary content">
        Short text
      </CompoundButton>
      <CompoundButton className={styles.maxWidth} secondaryContent="Secondary content">
        Long text truncates after it hits the max width of the component
      </CompoundButton>
    </>
  );
};
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width of the component.',
    },
  },
};
