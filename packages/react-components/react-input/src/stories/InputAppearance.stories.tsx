import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    '> div': {
      // Stack the label above the field (with 2px gap per the design system)
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.gap('2px'),
      // Align the examples horizontally to all match the extra padding on filled examples (below)
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  // filledLighter and filledDarker appearances depend on particular background colors
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius('20px'),
    ...shorthands.padding('20px'),
  },
  // By default this will match the example background, so don't add padding above
  filledDarker: { backgroundColor: tokens.colorNeutralBackground1, paddingBottom: '20px' },
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
