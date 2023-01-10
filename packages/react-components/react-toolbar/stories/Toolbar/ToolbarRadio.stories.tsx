import * as React from 'react';
import { AlignCenterHorizontal24Regular, AlignLeft24Regular, AlignRight24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton } from '@fluentui/react-components/unstable';
import type { ToolbarProps } from '@fluentui/react-components/unstable';

export const Radio = (props: Partial<ToolbarProps>) => (
  <Toolbar
    {...props}
    defaultCheckedValues={{
      textOptions: ['center'],
    }}
  >
    <ToolbarRadioButton aria-label="Align left" name="textOptions" value="left" icon={<AlignLeft24Regular />} />
    <ToolbarRadioButton
      aria-label="Align Center"
      name="textOptions"
      value="center"
      icon={<AlignCenterHorizontal24Regular />}
    />
    <ToolbarRadioButton aria-label="Align Right" name="textOptions" value="right" icon={<AlignRight24Regular />} />
  </Toolbar>
);
