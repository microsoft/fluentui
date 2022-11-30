import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Vertical = (props: Partial<ToolbarProps>) => (
  <Toolbar vertical {...props}>
    <ToolbarToggleButton name="text" value="bold" aria-label="Bold" icon={<TextBold24Regular />} />
    <ToolbarToggleButton name="text" value="italic" aria-label="Italic" icon={<TextItalic24Regular />} />
    <ToolbarToggleButton name="text" value="underline" aria-label="Underline" icon={<TextUnderline24Regular />} />
  </Toolbar>
);
