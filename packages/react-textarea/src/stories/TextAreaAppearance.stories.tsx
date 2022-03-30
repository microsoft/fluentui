import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Textarea } from '../index';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
  filledDarker: {
    backgroundColor: 'white',
  },
});

export const Appearance = () => {
  const outlineId = useId('textarea-outline');
  const filledDarkerId = useId('textarea-filleddarker');
  const filledLighterId = useId('textarea-filledlighter');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Label htmlFor={outlineId}>Textarea with Outline appearance.</Label>
        <Textarea id={outlineId} appearance="outline" placeholder="type here..." resize="both" />
      </div>
      <div className={styles.filledDarker}>
        <Label htmlFor={filledDarkerId}>Textarea with Filled Darker appearance.</Label>
        <Textarea id={filledDarkerId} appearance="filledDarker" placeholder="type here..." resize="both" />
      </div>
      <div>
        <Label htmlFor={filledLighterId}>Textarea with Filled Lighter appearance.</Label>
        <Textarea id={filledLighterId} appearance="filledLighter" placeholder="type here..." resize="both" />
      </div>
    </div>
  );
};
