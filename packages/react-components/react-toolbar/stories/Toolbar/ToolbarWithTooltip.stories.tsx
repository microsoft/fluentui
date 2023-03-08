import * as React from 'react';
import type { ToolbarProps } from '@fluentui/react-components';
import { Toolbar, ToolbarToggleButton, ToolbarDivider, ToolbarButton, Tooltip } from '@fluentui/react-components';
import {
  TextUnderline24Regular,
  TextBold24Regular,
  TextItalic24Regular,
  Highlight24Filled,
} from '@fluentui/react-icons';

export const WithTooltip = (props: Partial<ToolbarProps>) => (
  <Toolbar aria-label="with Tooltip" {...props} size="small">
    <Tooltip content="Makes selected text Bold" relationship="description" withArrow>
      <ToolbarToggleButton aria-label="Bold" icon={<TextBold24Regular />} name="textOptions" value="bold" />
    </Tooltip>
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
    <ToolbarDivider />
    <Tooltip content="Highlights the selected text" relationship="description" withArrow>
      <ToolbarButton aria-label="Highlight" icon={<Highlight24Filled />} />
    </Tooltip>
  </Toolbar>
);
