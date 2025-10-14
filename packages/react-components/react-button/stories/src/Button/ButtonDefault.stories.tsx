import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import type { ButtonProps } from '@fluentui/react-components';

export const Default = (props: ButtonProps): JSXElement => <Button {...props}>Example</Button>;

// Add Figma Code Connect metadata to the default story
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/yourfile/yournode', // Replace with actual Figma file URL
  },
  figmaConnect: {
    componentId: 'Button',
    variantKey: 'Default',
  },
};
