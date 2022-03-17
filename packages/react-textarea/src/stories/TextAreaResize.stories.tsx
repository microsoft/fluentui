import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { TextArea } from '../index';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
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
        <Label htmlFor={noneId}>TextArea with resize set to "none".</Label>
        <TextArea id={noneId} placeholder="Placeholder text" resize="none" />
      </div>
      <div>
        <Label htmlFor={verticalId}>TextArea with resize set to "vertical".</Label>
        <TextArea id={verticalId} placeholder="Placeholder text" resize="vertical" />
      </div>
      <div>
        <Label htmlFor={horizontalId}>TextArea with resize set to "horizontal".</Label>
        <TextArea id={horizontalId} placeholder="Placeholder text" resize="horizontal" />
      </div>
      <div>
        <Label htmlFor={bothId}>TextArea with resize set to "both".</Label>
        <TextArea id={bothId} placeholder="Placeholder text" resize="both" />
      </div>
    </div>
  );
};
