import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    '& label': { display: 'block', paddingBottom: '2px' },
    // filledLighter and filledDarker appearances depend on particular background colors,
    // so the story includes wrapper divs around the example of each appearance
    '> div': { ...shorthands.padding('20px'), ...shorthands.borderRadius('20px') },
    '> div:not(:first-child)': { paddingTop: '10px' },
  },
  filledDarker: { backgroundColor: tokens.colorNeutralBackground1 },
  // ideally should match doc site, #faf9f8
  filledLighter: { backgroundColor: tokens.colorNeutralBackground2 },
});

export const Appearance = () => {
  const outlineId = useId('input-outline');
  const underlineId = useId('input-underline');
  const filledLighterId = useId('input-filledLighter');
  const filledDarkerId = useId('input-filledDarker');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Label htmlFor={outlineId}>Outline (default)</Label>
        <Input appearance="outline" id={outlineId} />
      </div>

      <div>
        <Label htmlFor={underlineId}>Underline</Label>
        <Input appearance="underline" id={underlineId} />
      </div>

      <div className={styles.filledLighter}>
        <Label htmlFor={filledLighterId}>Filled lighter</Label>
        <Input appearance="filledLighter" id={filledLighterId} />
      </div>

      <div className={styles.filledDarker}>
        <Label htmlFor={filledDarkerId}>Filled darker</Label>
        <Input appearance="filledDarker" id={filledDarkerId} />
      </div>
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
