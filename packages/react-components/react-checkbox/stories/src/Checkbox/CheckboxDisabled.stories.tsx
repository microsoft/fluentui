import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
});

export const Disabled = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Checkbox disabled label="Disabled" />
        <Checkbox disabled label="Disabled checked" checked />
        <Checkbox disabled label="Disabled mixed" checked="mixed" />
      </div>

      <div>
        <Checkbox shape="circular" disabled label="Disabled" />
        <Checkbox shape="circular" disabled label="Disabled checked" checked />
        <Checkbox shape="circular" disabled label="Disabled mixed" checked="mixed" />
      </div>

      <div>
        <Checkbox size="large" disabled label="Disabled" />
        <Checkbox size="large" disabled label="Disabled checked" checked />
        <Checkbox size="large" disabled label="Disabled mixed" checked="mixed" />
      </div>

      <div>
        <Checkbox size="large" shape="circular" disabled label="Disabled" />
        <Checkbox size="large" shape="circular" disabled label="Disabled checked" checked />
        <Checkbox size="large" shape="circular" disabled label="Disabled mixed" checked="mixed" />
      </div>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be disabled.',
    },
  },
};
