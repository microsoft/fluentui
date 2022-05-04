import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import type { SpinButtonStrings } from '../SpinButton';

export const Strings = () => {
  const id = useId();

  const strings: SpinButtonStrings = {
    // Uses the `{step}` token which will be replaced by the `step` prop.
    incrementButtonLabel: 'Increment the SpinButton by {step}',
    // Omits the `{step}` token.
    decrementButtonLabel: 'Decrement',
  };

  return (
    <>
      <Label htmlFor={id}>Custom Strings</Label>
      <SpinButton strings={strings} defaultValue={0} id={id} />
      <p>
        Inspect the <code>aria-label</code> attributes for the increment and decrement buttons in dev tools, or use a
        tool like a screen reader to hear the labels announced.
      </p>
    </>
  );
};

Strings.parameters = {
  docs: {
    description: {
      story: `SpinButton increment and decrement button \`aria-label\`s can be customized with the \`strings\` prop.
      This feature allows labels to be localized.`,
    },
  },
};
