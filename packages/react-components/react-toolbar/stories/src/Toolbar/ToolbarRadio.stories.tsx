import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AlignCenterHorizontalRegular, AlignLeftRegular, AlignRightRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton, ToolbarRadioGroup } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Radio = (props: Partial<ToolbarProps>): JSXElement => (
  <Toolbar
    {...props}
    aria-label="with Radio Buttons"
    defaultCheckedValues={{
      textOptions: ['center'],
    }}
  >
    <ToolbarRadioGroup>
      <ToolbarRadioButton aria-label="Align left" name="textOptions" value="left" icon={<AlignLeftRegular />} />
      <ToolbarRadioButton
        aria-label="Align Center"
        name="textOptions"
        value="center"
        icon={<AlignCenterHorizontalRegular />}
      />
      <ToolbarRadioButton aria-label="Align Right" name="textOptions" value="right" icon={<AlignRightRegular />} />
    </ToolbarRadioGroup>
  </Toolbar>
);
