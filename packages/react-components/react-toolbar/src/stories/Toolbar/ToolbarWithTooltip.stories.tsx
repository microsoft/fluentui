import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular, TextBold24Regular, TextItalic24Regular } from '@fluentui/react-icons';

export const WithTooltip = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <Tooltip content="Content - Makes text bold" relationship="label" withArrow>
      <ToolbarButton aria-label="Text Options - Bold" appearance="primary" icon={<TextBold24Regular />} />
    </Tooltip>
    <ToolbarDivider />
    <Tooltip content="Tooltip Content - Show something here" relationship="label" withArrow>
      <ToolbarButton aria-label="Calendar" icon={<CalendarMonthRegular />} />
    </Tooltip>
    <Tooltip content="Tooltip Content - Makes text Italic" relationship="label" withArrow>
      <ToolbarButton aria-label="Italic Option" icon={<TextItalic24Regular />} />
    </Tooltip>
  </Toolbar>
);
