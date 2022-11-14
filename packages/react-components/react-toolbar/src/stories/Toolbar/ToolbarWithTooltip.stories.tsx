import * as React from 'react';
import { Toolbar, ToolbarToggleButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Tooltip } from '@fluentui/react-components';
import { TextUnderline24Regular, TextBold24Regular, TextItalic24Regular } from '@fluentui/react-icons';

export const WithTooltip = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <Tooltip content="Makes selected text Bold" relationship="description" withArrow>
      <ToolbarToggleButton aria-label="Bold" icon={<TextBold24Regular />} name="textOptions" value="bold" />
    </Tooltip>
    <ToolbarDivider />
    <Tooltip content="Makes selected text Italic" relationship="description" withArrow>
      <ToolbarToggleButton aria-label="Italic" icon={<TextItalic24Regular />} name="textOptions" value="italic" />
    </Tooltip>
    <Tooltip content="Makes selected text Underline" relationship="description" withArrow>
      <ToolbarToggleButton
        aria-label="Underline"
        icon={<TextUnderline24Regular />}
        name="textOptions"
        value="underline"
      />
    </Tooltip>
  </Toolbar>
);
