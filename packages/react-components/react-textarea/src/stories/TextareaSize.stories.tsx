import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { Textarea } from '../Textarea';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  base: {
    '& > div': {
      marginTop: tokens.spacingVerticalMNudge,
    },
    '& > div > div': {
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.padding(tokens.spacingHorizontalMNudge),
    },
    '& > div > label': {
      marginBottom: tokens.spacingHorizontalXXS,
      marginLeft: tokens.spacingHorizontalMNudge,
    },
  },
});

export const Size = () => {
  const smallId = useId('textarea-small');
  const mediumId = useId('textarea-medium');
  const largeId = useId('textarea-large');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div>
        <Label htmlFor={smallId}>Small Textarea.</Label>
        <div>
          <Textarea id={smallId} size="small" />
        </div>
      </div>

      <div>
        <Label htmlFor={mediumId}>Medium Textarea.</Label>
        <div>
          <Textarea id={mediumId} size="medium" />
        </div>
      </div>

      <div>
        <Label htmlFor={largeId}>Large Textarea.</Label>
        <div>
          <Textarea id={largeId} size="large" />
        </div>
      </div>
    </div>
  );
};
