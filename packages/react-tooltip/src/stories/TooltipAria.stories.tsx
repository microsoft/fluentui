import * as React from 'react';
import { shorthands, makeStyles } from '@griffel/react';

import { Tooltip } from '../Tooltip';

const useStyles = makeStyles({
  exampleList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...shorthands.margin('16px', '0'),
    ...shorthands.gap('16px'),
  },
});

export const Aria = () => {
  const styles = useStyles();

  return (
    <>
      Use a screen reader to hear how the tooltip can be used as its target's label or description:
      <div className={styles.exampleList}>
        <Tooltip content="This tooltip is the label for the button" relationship="label">
          <button>
            <span aria-hidden="true">💬</span>
          </button>
        </Tooltip>
        <Tooltip content="This tooltip describes the button" relationship="description">
          <button>Description</button>
        </Tooltip>
      </div>
    </>
  );
};
