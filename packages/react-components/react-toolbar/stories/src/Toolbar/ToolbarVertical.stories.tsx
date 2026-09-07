import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Vertical = (props: Partial<ToolbarProps>): JSXElement => (
  <Toolbar vertical {...props} aria-label="Vertical">
    <ToolbarToggleButton name="text" value="bold" aria-label="Bold" icon={<TextBoldRegular />} />
    <ToolbarToggleButton name="text" value="italic" aria-label="Italic" icon={<TextItalicRegular />} />
    <ToolbarToggleButton name="text" value="underline" aria-label="Underline" icon={<TextUnderlineRegular />} />
  </Toolbar>
);
