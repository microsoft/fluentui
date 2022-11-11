import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Vertical = (props: Partial<ToolbarProps>) => (
  <Toolbar vertical {...props}>
    <ToolbarButton aria-label="Bold" icon={<TextBold24Regular />} />
    <ToolbarButton aria-label="Italic" icon={<TextItalic24Regular />} />
    <ToolbarButton aria-label="Underline" icon={<TextUnderline24Regular />} />
  </Toolbar>
);
