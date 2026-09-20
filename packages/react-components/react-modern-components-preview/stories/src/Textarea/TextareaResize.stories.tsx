import * as React from 'react';

import { Field, makeStyles, tokens } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
});

export const Resize = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Field label='Textarea with resize set to "none"'>
        <Textarea resize="none" />
      </Field>

      <Field label='Textarea with resize set to "vertical"'>
        <Textarea resize="vertical" />
      </Field>

      <Field label='Textarea with resize set to "horizontal"'>
        <Textarea resize="horizontal" />
      </Field>

      <Field label='Textarea with resize set to "both"'>
        <Textarea resize="both" />
      </Field>
    </div>
  );
};
