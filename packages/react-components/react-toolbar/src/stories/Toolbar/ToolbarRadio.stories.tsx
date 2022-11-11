import * as React from 'react';
import { AlignCenterHorizontal24Regular, AlignLeft24Regular, AlignRight24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Radio = (props: Partial<ToolbarProps>) => (
  <Toolbar
    {...props}
    defaultCheckedValues={{
      textOptions: ['bold'],
    }}
  >
    <ToolbarRadioButton aria-label="Align left" name="textOptions" value="italic" icon={<AlignLeft24Regular />} />
    <ToolbarRadioButton
      aria-label="Align Center"
      name="textOptions"
      value="bold"
      icon={<AlignCenterHorizontal24Regular />}
    />
    <ToolbarRadioButton aria-label="Align Right" name="textOptions" value="underline" icon={<AlignRight24Regular />} />
  </Toolbar>
);
