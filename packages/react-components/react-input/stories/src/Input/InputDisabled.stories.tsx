import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, useId, Input, Label, tokens, mergeClasses, Switch } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    gap: tokens.spacingVerticalMNudge,
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    paddingBlock: tokens.spacingVerticalMNudge,
  },
  filledFields: {
    padding: tokens.spacingVerticalXXL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground1,
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
      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}>
        <Label htmlFor={inputIds.filledLighter}>Disabled (filled lighter appearance on Background 3)</Label>
        <Input
          appearance="filled-lighter"
          disabled={disabled}
          id={inputIds.filledLighter}
          defaultValue="disabled value"
          placeholder="Enter text"
        />
      </div>
      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}>
        <Label htmlFor={inputIds.filledDarker}>Disabled (filled darker appearance on Background 1)</Label>
        <Input
          appearance="filled-darker"
          disabled={disabled}
          id={inputIds.filledDarker}
          defaultValue="disabled value"
          placeholder="Enter text"
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
