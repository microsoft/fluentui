import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Textarea } from '../index';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    '& > div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('10px'), ...shorthands.padding('10px') },
  },
});

export const Resize = () => {
  const noneId = useId('textarea-none');
  const verticalId = useId('textarea-vertical');
  const horizontalId = useId('textarea-horizontal');
  const bothId = useId('textarea-both');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Label htmlFor={noneId}>Textarea with resize set to "none".</Label>
        <Textarea id={noneId} resize="none" />
      </div>
      <div>
        <Label htmlFor={verticalId}>Textarea with resize set to "vertical".</Label>
        <Textarea id={verticalId} resize="vertical" />
      </div>
      <div>
        <Label htmlFor={horizontalId}>Textarea with resize set to "horizontal".</Label>
        <Textarea id={horizontalId} resize="horizontal" />
      </div>
      <div>
        <Label htmlFor={bothId}>Textarea with resize set to "both".</Label>
        <Textarea id={bothId} resize="both" />
      </div>
    </div>
  );
};
