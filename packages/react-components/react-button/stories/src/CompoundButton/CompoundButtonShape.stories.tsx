import * as React from 'react';
import { makeStyles, CompoundButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Shape = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content">Rounded</CompoundButton>
      <CompoundButton secondaryContent="Secondary content" shape="circular">
        Circular
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" shape="square">
        Square
      </CompoundButton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A compound button can be rounded, circular, or square.',
    },
  },
};
