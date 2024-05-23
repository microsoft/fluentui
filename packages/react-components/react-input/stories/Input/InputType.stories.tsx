import * as React from 'react';
import { makeStyles, useId, Input, Label } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
    '> div': { display: 'flex', flexDirection: 'column', gap: '2px' },
  },
});

export const Type = () => {
  const emailId = useId('input-email');
  const urlId = useId('input-url');
  const passwordId = useId('input-password');
  const styles = useStyles();

  return (
    <form noValidate autoComplete="off" className={styles.root}>
      <div>
        <Label htmlFor={emailId}>Email input</Label>
        <Input type="email" id={emailId} />
      </div>

      <div>
        <Label htmlFor={urlId}>URL input</Label>
        <Input type="url" id={urlId} />
      </div>

      <div>
        <Label htmlFor={passwordId}>Password input</Label>
        <Input type="password" defaultValue="password" id={passwordId} />
      </div>
    </form>
  );
};

Type.parameters = {
  docs: {
    description: {
      story:
        'An input can have a custom text-based [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types) ' +
        'such as `email`, `url`, or `password` based on the type of value the user will enter.\n\n' +
        'Note that no custom styling is currently applied for alternative types, and some types may ' +
        'activate browser-default styling which does not match the Fluent design language.',
    },
  },
};
