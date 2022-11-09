import * as React from 'react';
import { AlignCenterHorizontal24Regular, AlignLeft24Regular, AlignRight24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Radio = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarRadioButton
      aria-label="Radio Option - Align left"
      name="text-style"
      value="italic"
      icon={<AlignLeft24Regular />}
    />
    <ToolbarRadioButton
      aria-label="Radio Option - Align Center"
      name="text-style"
      value="bold"
      icon={<AlignCenterHorizontal24Regular />}
    />
    <ToolbarRadioButton
      aria-label="Radio Option - Align Right"
      name="text-style"
      value="underline"
      icon={<AlignRight24Regular />}
    />
  </Toolbar>
);
