import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Textarea } from '../index';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';
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

export const Resize = () => {
  const noneId = useId('textarea-none');
  const verticalId = useId('textarea-vertical');
  const horizontalId = useId('textarea-horizontal');
  const bothId = useId('textarea-both');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div>
        <Label htmlFor={noneId}>Textarea with resize set to "none".</Label>
        <div>
          <Textarea id={noneId} resize="none" />
        </div>
      </div>

      <div>
        <Label htmlFor={verticalId}>Textarea with resize set to "vertical".</Label>
        <div>
          <Textarea id={verticalId} resize="vertical" />
        </div>
      </div>

      <div>
        <Label htmlFor={horizontalId}>Textarea with resize set to "horizontal".</Label>
        <div>
          <Textarea id={horizontalId} resize="horizontal" />
        </div>
      </div>

      <div>
        <Label htmlFor={bothId}>Textarea with resize set to "both".</Label>
        <div>
          <Textarea id={bothId} resize="both" />
        </div>
      </div>
    </div>
  );
};
