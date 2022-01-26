import * as React from 'react';
import { shorthands, makeStyles } from '@griffel/react';

import { Tooltip } from '../Tooltip';

const useStyles = makeStyles({
  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 64px)',
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
        <Tooltip content="above start" positioning="above-start" relationship="label">
          <button style={{ gridArea: '1 / 2' }} />
        </Tooltip>
        <Tooltip content="above center" positioning="above" relationship="label">
          <button style={{ gridArea: '1 / 3' }} />
        </Tooltip>
        <Tooltip content="above end" positioning="above-end" relationship="label">
          <button style={{ gridArea: '1 / 4' }} />
        </Tooltip>

        <Tooltip content="before top" positioning="before-top" relationship="label">
          <button style={{ gridArea: '2 / 1' }} />
        </Tooltip>
        <Tooltip content="before center" positioning="before" relationship="label">
          <button style={{ gridArea: '3 / 1' }} />
        </Tooltip>
        <Tooltip content="before bottom" positioning="before-bottom" relationship="label">
          <button style={{ gridArea: '4 / 1' }} />
        </Tooltip>

        <Tooltip content="after top" positioning="after-top" relationship="label">
          <button style={{ gridArea: '2 / 5' }} />
        </Tooltip>
        <Tooltip content="after center" positioning="after" relationship="label">
          <button style={{ gridArea: '3 / 5' }} />
        </Tooltip>
        <Tooltip content="after bottom" positioning="after-bottom" relationship="label">
          <button style={{ gridArea: '4 / 5' }} />
        </Tooltip>

        <Tooltip content="below start" positioning="below-start" relationship="label">
          <button style={{ gridArea: '5 / 2' }} />
        </Tooltip>
        <Tooltip content="below center" positioning="below" relationship="label">
          <button style={{ gridArea: '5 / 3' }} />
        </Tooltip>
        <Tooltip content="below end" positioning="below-end" relationship="label">
          <button style={{ gridArea: '5 / 4' }} />
        </Tooltip>
      </div>
    </>
  );
};
