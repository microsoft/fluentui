import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { TextArea } from '../TextArea';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Size = () => {
  const smallId = useId('textarea-small');
  const mediumId = useId('textarea-medium');
  const largeId = useId('textarea-large');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Label htmlFor={smallId}>Small TextArea.</Label>
        <TextArea id={smallId} size="small" placeholder="Small TextArea" />
      </div>
      <div>
        <Label htmlFor={mediumId}>Medium TextArea.</Label>
        <TextArea id={mediumId} size="medium" placeholder="Medium TextArea" />
      </div>
      <div>
        <Label htmlFor={largeId}>Large TextArea.</Label>
        <TextArea id={largeId} size="large" placeholder="Large TextArea" />
      </div>
    </div>
  );
};
