import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const WithLongText = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton>Short text</ToggleButton>
      <ToggleButton className={styles.longText}>
        Long text wraps after it hits the max width of the component
      </ToggleButton>
    </div>
  );
};

WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text wraps after it hits the max width of the component.',
    },
  },
};
