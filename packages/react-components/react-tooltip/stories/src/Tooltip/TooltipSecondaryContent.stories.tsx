import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { TextBoldRegular } from '@fluentui/react-icons';

export const SecondaryContent = (): JSXElement => (
  <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
    <Button icon={<TextBoldRegular />} />
  </Tooltip>
);

SecondaryContent.parameters = {
  docs: {
    description: {
      story:
        'Use `secondaryContent` for short supporting information displayed opposite the primary content, such as a keyboard shortcut.',
    },
  },
};
