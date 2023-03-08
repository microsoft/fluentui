import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Subtle = (props: Partial<ToolbarProps>) => (
  <Toolbar aria-label="Subtle" {...props}>
    <ToolbarToggleButton
      appearance="subtle"
      aria-label="Bold"
      icon={<TextBold24Regular />}
      name="textOptions"
      value="bold"
    />
    <ToolbarToggleButton
      appearance="subtle"
      aria-label="Italic"
      icon={<TextItalic24Regular />}
      name="textOptions"
      value="italic"
    />
    <ToolbarToggleButton
      appearance="subtle"
      aria-label="Underline"
      icon={<TextUnderline24Regular />}
      name="textOptions"
      value="underline"
    />
  </Toolbar>
);
