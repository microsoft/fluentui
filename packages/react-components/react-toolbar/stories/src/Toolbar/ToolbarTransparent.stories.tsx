import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Transparent = (props: Partial<ToolbarProps>): JSXElement => (
  <Toolbar aria-label="transparent" {...props}>
    <ToolbarToggleButton
      appearance="transparent"
      aria-label="Bold"
      icon={<TextBold24Regular />}
      name="textOptions"
      value="bold"
    />
    <ToolbarToggleButton
      appearance="transparent"
      aria-label="Italic"
      icon={<TextItalic24Regular />}
      name="textOptions"
      value="italic"
    />
    <ToolbarToggleButton
      appearance="transparent"
      aria-label="Underline"
      icon={<TextUnderline24Regular />}
      name="textOptions"
      value="underline"
    />
  </Toolbar>
);
