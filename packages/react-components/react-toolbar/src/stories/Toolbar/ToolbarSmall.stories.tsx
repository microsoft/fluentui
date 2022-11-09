import * as React from 'react';
import {
  TextBold16Regular,
  TextItalic16Regular,
  TextUnderline16Regular,
  AlertSnooze16Regular,
} from '@fluentui/react-icons';
import { Toolbar, ToolbarButton, ToolbarDivider, ToolbarToggleButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Small = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <ToolbarButton aria-label="Text Options - Bold" appearance="primary" icon={<TextBold16Regular />} />
    <ToolbarButton aria-label="Text Options - Italic" icon={<TextItalic16Regular />} />
    <ToolbarButton aria-label="Text Options - Underline" icon={<TextUnderline16Regular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      aria-label="Toggle Option - Alert Snooze"
      name="toggle"
      value="toggle"
      icon={<AlertSnooze16Regular />}
    />
  </Toolbar>
);
