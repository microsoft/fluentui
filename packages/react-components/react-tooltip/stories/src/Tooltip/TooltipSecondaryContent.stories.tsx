import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { TextBoldRegular } from '@fluentui/react-icons';

export const SecondaryContent = (): JSXElement => (
  <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
    <Button aria-keyshortcuts="Control+B" icon={<TextBoldRegular />} />
  </Tooltip>
);

SecondaryContent.parameters = {
  docs: {
    description: {
      story:
        'Use `secondaryContent` for short supporting information such as a keyboard shortcut. ' +
        'Use `aria-keyshortcuts` on the trigger to expose the keyboard shortcut semantically.',
    },
  },
};
