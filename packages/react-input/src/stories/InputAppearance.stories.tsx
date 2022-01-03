import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@fluentui/react-make-styles';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    '& label': { display: 'block', paddingBottom: '2px' },
    '& label:not(:first-child)': { paddingTop: '20px' },
  },
});

export const Appearance = () => {
  const outlineId = useId('input-outline');
  const underlineId = useId('input-underline');
  const filledLighterId = useId('input-filledLighter');
  const filledDarkerId = useId('input-filledDarker');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={outlineId}>Outline (default)</Label>
      <Input appearance="outline" id={outlineId} placeholder="placeholder" />

      <Label htmlFor={underlineId}>Underline</Label>
      <Input appearance="underline" id={underlineId} placeholder="placeholder" />

      <Label htmlFor={filledLighterId}>Filled lighter</Label>
      <Input appearance="filledLighter" id={filledLighterId} placeholder="placeholder" />

      <Label htmlFor={filledDarkerId}>Filled darker</Label>
      <Input appearance="filledDarker" id={filledDarkerId} placeholder="placeholder" />
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'An input can have different appearances.',
    },
  },
};
