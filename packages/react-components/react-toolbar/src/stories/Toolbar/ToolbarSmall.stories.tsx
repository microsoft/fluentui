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
    <ToolbarButton appearance="primary" icon={<TextBold16Regular />} />
    <ToolbarButton icon={<TextItalic16Regular />} />
    <ToolbarButton icon={<TextUnderline16Regular />} />
    <ToolbarDivider />
    <ToolbarToggleButton name="toggle" value="toggle" icon={<AlertSnooze16Regular />} />
  </Toolbar>
);
