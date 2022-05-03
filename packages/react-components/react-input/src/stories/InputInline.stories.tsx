import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Input } from '../index';

export const Inline = () => {
  const inputId = useId('input');

  return (
    <div>
      <Label htmlFor={inputId} style={{ paddingInlineEnd: '12px' }}>
        Sample Inline Input
      </Label>
      <Input id={inputId} />

      <p>
        This input is <Input placeholder="inline" aria-label="inline" /> within a paragraph of text (be sure to provide
        an <code>aria-label</code>).
      </p>
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'An input can be rendered inline with text.',
    },
  },
};
