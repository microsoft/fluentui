import * as React from 'react';
import { shorthands, makeStyles } from '@fluentui/react-make-styles';

import { Tooltip } from '../Tooltip';

const useStyles = makeStyles({
  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    ...shorthands.gap('4px'),
    ...shorthands.margin('16px 128px'),
  },
});

export const Positioning = () => {
  const styles = useStyles();

  return (
    <>
      <div>Each of these buttons places the tooltip in a different location relative to its trigger button.</div>
      <div className={styles.targetContainer}>
        <Tooltip content="above start" positioning="above-start">
          <button style={{ gridArea: '1 / 2' }}>above start</button>
        </Tooltip>
        <Tooltip content="above center" positioning="above">
          <button style={{ gridArea: '1 / 3' }}>above center</button>
        </Tooltip>
        <Tooltip content="above end" positioning="above-end">
          <button style={{ gridArea: '1 / 4' }}>above end</button>
        </Tooltip>

        <Tooltip content="before top" positioning="before-top">
          <button style={{ gridArea: '2 / 1' }}>before top</button>
        </Tooltip>
        <Tooltip content="before center" positioning="before">
          <button style={{ gridArea: '3 / 1' }}>before center</button>
        </Tooltip>
        <Tooltip content="before bottom" positioning="before-bottom">
          <button style={{ gridArea: '4 / 1' }}>before bottom</button>
        </Tooltip>

        <Tooltip content="after top" positioning="after-top">
          <button style={{ gridArea: '2 / 5' }}>after top</button>
        </Tooltip>
        <Tooltip content="after center" positioning="after">
          <button style={{ gridArea: '3 / 5' }}>after center</button>
        </Tooltip>
        <Tooltip content="after bottom" positioning="after-bottom">
          <button style={{ gridArea: '4 / 5' }}>after bottom</button>
        </Tooltip>

        <Tooltip content="below start" positioning="below-start">
          <button style={{ gridArea: '5 / 2' }}>below start</button>
        </Tooltip>
        <Tooltip content="below center" positioning="below">
          <button style={{ gridArea: '5 / 3' }}>below center</button>
        </Tooltip>
        <Tooltip content="below end" positioning="below-end">
          <button style={{ gridArea: '5 / 4' }}>below end</button>
        </Tooltip>
      </div>
    </>
  );
};
