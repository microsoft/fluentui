import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Text } from '@fluentui/react-text';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: tokens.spacingVerticalMNudge,
    },

    '> div div': {
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.padding(tokens.spacingHorizontalMNudge),
    },
    '> div label': {
      marginBottom: tokens.spacingVerticalXXS,
      marginLeft: tokens.spacingHorizontalMNudge,
    },
  },

  filledLighter: { backgroundColor: '#8a8a8a' },
  filledDarker: { backgroundColor: '#8a8a8a' },
});

export const Appearance = () => {
  const styles = useStyles();

  const outlineId = useId('outline-id');
  const underlineId = useId('underline-id');
  const filledLighterId = useId('filledLighter-id');
  const filledDarkerId = useId('filledDarker-id');

  return (
    <div className={styles.base}>
      <div>
        <Label htmlFor={outlineId}>Outline (default)</Label>
        <div>
          <SpinButton id={outlineId} />
        </div>
      </div>

      <div>
        <Label htmlFor={underlineId}>Underline</Label>
        <div>
          <SpinButton appearance="underline" id={underlineId} />
        </div>
      </div>

      <div>
        <Label htmlFor={filledLighterId}>Filled Lighter</Label>
        <div className={styles.filledLighter}>
          <SpinButton appearance="filledLighter" id={filledLighterId} />
        </div>
      </div>

      <div>
        <Label htmlFor={filledDarkerId}>Filled Darker</Label>
        <div className={styles.filledDarker}>
          <SpinButton appearance="filledDarker" id={filledDarkerId} />
        </div>
      </div>

      <div>
        <Text>
          The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
          filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
          surrounding color to pass accessibility requirements.
        </Text>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: `SpinButton can have different appearances.`,
    },
  },
};
