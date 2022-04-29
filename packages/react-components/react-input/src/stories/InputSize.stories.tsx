import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
    '> div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('2px') },
  },
});

export const Size = () => {
  const smallId = useId('input-small');
  const mediumId = useId('input-medium');
  const largeId = useId('input-large');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Label size="small" htmlFor={smallId}>
          Small input
        </Label>
        <Input size="small" id={smallId} />
      </div>

      <div>
        <Label size="medium" htmlFor={mediumId}>
          Medium input
        </Label>
        <Input size="medium" id={mediumId} />
      </div>

      <div>
        <Label size="large" htmlFor={largeId}>
          Large input
        </Label>
        <Input size="large" id={largeId} />
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'An input can have different sizes.',
    },
  },
};
