import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadio } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Radio = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarRadio name="text-style" value="italic" icon={<TextItalic24Regular />} />
    <ToolbarRadio name="text-style" value="bold" icon={<TextBold24Regular />} />
    <ToolbarRadio name="text-style" value="underline" icon={<TextUnderline24Regular />} />
  </Toolbar>
);
