import * as React from 'react';
import { Field, makeStyles, Textarea, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
});

export const Resize = () => {
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
