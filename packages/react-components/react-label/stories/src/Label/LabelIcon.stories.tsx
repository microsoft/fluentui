import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';
import { InfoRegular } from '@fluentui/react-icons';

export const Icon = (): JSXElement => {
  return (
    <Label icon={<InfoRegular />} required>
      Label with icon
    </Label>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story: 'A Label can render an optional `icon` slot before its content.',
    },
  },
};
