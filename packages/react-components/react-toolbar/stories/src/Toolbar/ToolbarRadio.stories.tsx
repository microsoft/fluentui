import * as React from 'react';
import { AlignCenterHorizontal24Regular, AlignLeft24Regular, AlignRight24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton, ToolbarRadioGroup } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Radio = (props: Partial<ToolbarProps>) => (
  <Toolbar
    {...props}
    aria-label="with Radio Buttons"
    defaultCheckedValues={{
      textOptions: ['center'],
    }}
  >
    <ToolbarRadioGroup>
      <ToolbarRadioButton aria-label="Align left" name="textOptions" value="left" icon={<AlignLeft24Regular />} />
      <ToolbarRadioButton
        aria-label="Align Center"
        name="textOptions"
        value="center"
        icon={<AlignCenterHorizontal24Regular />}
      />
      <ToolbarRadioButton aria-label="Align Right" name="textOptions" value="right" icon={<AlignRight24Regular />} />
    </ToolbarRadioGroup>
  </Toolbar>
);
