import * as React from 'react';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Vertical = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};

Vertical.parameters = {
  docs: {
    description: {
      story: 'A divider can vertically separate two pieces of content.',
    },
  },
};
