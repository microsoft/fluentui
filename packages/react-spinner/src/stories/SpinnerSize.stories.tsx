import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';
import { Spinner } from '../index';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Size = () => {
  const tinyId = useId('tiny');
  const extraSmallId = useId('extra-small');
  const smallId = useId('small');
  const mediumId = useId('medium');
  const largeId = useId('large');
  const extraLargeId = useId('extra-large');
  const hugeId = useId('huge');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={tinyId}>Tiny Spinner</Label>
      <Spinner size="tiny" id={tinyId} />

      <Label htmlFor={extraSmallId}>Extra Small Spinner</Label>
      <Spinner size="extra-small" id={extraSmallId} />

      <Label htmlFor={smallId}>Small Spinner</Label>
      <Spinner size="small" id={smallId} />

      <Label htmlFor={mediumId}>Medium Spinner</Label>
      <Spinner size="medium" id={mediumId} />

      <Label htmlFor={largeId}>Large Spinner</Label>
      <Spinner size="large" id={largeId} />

      <Label htmlFor={extraLargeId}>Extra Large Spinner</Label>
      <Spinner size="extra-large" id={extraLargeId} />

      <Label htmlFor={hugeId}>Huge Spinner</Label>
      <Spinner size="huge" id={hugeId} />
    </div>
  );
};
