import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Subtle = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton appearance="subtle" icon={<TextBold24Regular />} />
    <ToolbarButton appearance="subtle" icon={<TextItalic24Regular />} />
    <ToolbarButton appearance="subtle" icon={<TextUnderline24Regular />} />
  </Toolbar>
);
