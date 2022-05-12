import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Input } from '../index';
import { Text } from '@fluentui/react-text';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    '> div': {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: tokens.spacingVerticalMNudge,
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
  filledLighter: {
    backgroundColor: '#8a8a8a',
  },
  filledDarker: {
    backgroundColor: '#8a8a8a',
  },
});

export const Appearance = () => {
  const outlineId = useId('input-outline');
  const underlineId = useId('input-underline');
  const filledLighterId = useId('input-filledLighter');
  const filledDarkerId = useId('input-filledDarker');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div>
        <Label htmlFor={outlineId}>Outline Input Appearance (default)</Label>
        <div>
          <Input appearance="outline" id={outlineId} />
        </div>
      </div>

      <div>
        <Label htmlFor={underlineId}>Underline Input Appearance </Label>
        <div>
          <Input appearance="underline" id={underlineId} />
        </div>
      </div>

      <div>
        <Label htmlFor={filledLighterId}>Filled Lighter Input Appearance </Label>
        <div className={styles.filledLighter}>
          <Input appearance="filledLighter" id={filledLighterId} />
        </div>
      </div>

      <div>
        <Label htmlFor={filledDarkerId}>Filled Darker Input Appearance </Label>
        <div className={styles.filledDarker}>
          <Input appearance="filledDarker" id={filledDarkerId} />
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
      story: 'An input can have different appearances.',
    },
  },
};
