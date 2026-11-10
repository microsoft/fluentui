import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, useId, Input, Label, tokens, mergeClasses, Switch } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    padding: tokens.spacingHorizontalMNudge,
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  toggle: {
    marginTop: tokens.spacingVerticalXL,
  },
});

export const Disabled = (): JSXElement => {
  const idPrefix = 'input-disabled-story';
  const inputIds = {
    default: useId(idPrefix),
    underline: useId(idPrefix),
    filledLighter: useId(idPrefix),
    filledDarker: useId(idPrefix),
  };
  const styles = useStyles();

  const [disabled, setDisabled] = React.useState(true);

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <Label htmlFor={inputIds.default}>Disabled (default outline appearance)</Label>
        <Input disabled={disabled} id={inputIds.default} defaultValue="disabled value" />
      </div>
      <div className={styles.field}>
        <Label htmlFor={inputIds.underline}>Disabled (underline appearance)</Label>
        <Input appearance="underline" disabled={disabled} id={inputIds.underline} defaultValue="disabled value" />
      </div>
      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <Label htmlFor={inputIds.filledLighter}>Disabled (filled lighter appearance)</Label>
        <Input
          appearance="filled-lighter"
          disabled={disabled}
          id={inputIds.filledLighter}
          defaultValue="disabled value"
        />
      </div>
      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <Label htmlFor={inputIds.filledDarker}>Disabled (filled darker appearance)</Label>
        <Input
          appearance="filled-darker"
          disabled={disabled}
          id={inputIds.filledDarker}
          defaultValue="disabled value"
        />
      </div>
      <Switch
        className={styles.toggle}
        checked={disabled}
        label="Disabled"
        onChange={(_e, data) => setDisabled(data.checked)}
      />
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'An input can be disabled.',
    },
  },
};
