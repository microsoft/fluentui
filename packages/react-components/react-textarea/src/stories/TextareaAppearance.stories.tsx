import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';
import { Text } from '@fluentui/react-text';
import { Textarea } from '../index';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    '& > div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('10px'), ...shorthands.padding('10px') },
  },
  filledLighter: {
    backgroundColor: '#8a8a8a',
  },
  filledDarker: {
    backgroundColor: '#8a8a8a',
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
      <div>
        <Label htmlFor={filledDarkerId}>Textarea with Filled Darker appearance.</Label>
        <div className={styles.filledDarker}>
          <Textarea id={filledDarkerId} appearance="filledDarker" placeholder="type here..." resize="both" />
        </div>
      </div>
      <div>
        <Label htmlFor={filledLighterId}>Textarea with Filled Lighter appearance.</Label>
        <div className={styles.filledLighter}>
          <Textarea id={filledLighterId} appearance="filledLighter" placeholder="type here..." resize="both" />
        </div>
      </div>
      <div>
        <Text>
          The colors adjacent to the Textarea should have a sufficient contrast. Particularly, the color of input with
          filled darker and lighter styles needs to provide a contrast ratio greater than 3 to 1 against the immediate
          surrounding color to pass accessibility requirement.
        </Text>
      </div>
    </div>
  );
};
