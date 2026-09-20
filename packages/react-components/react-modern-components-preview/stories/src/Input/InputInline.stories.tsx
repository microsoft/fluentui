import * as React from 'react';

import { useId, Label } from '@fluentui/react-components';
import { Input } from '@fluentui/react-modern-components-preview/input';

export const Inline = (): React.ReactNode => {
  const inputId = useId('input');

  return (
    <div>
      <Label htmlFor={inputId} style={{ paddingInlineEnd: '12px' }}>
        Sample inline input
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
