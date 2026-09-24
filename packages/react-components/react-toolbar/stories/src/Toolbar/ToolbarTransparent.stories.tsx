import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Transparent = (props: Partial<ToolbarProps>): JSXElement => (
  <Toolbar aria-label="transparent" {...props}>
    <ToolbarToggleButton
      appearance="transparent"
      aria-label="Bold"
      icon={<TextBoldRegular />}
      name="textOptions"
      value="bold"
    />
    <ToolbarToggleButton
      appearance="transparent"
      aria-label="Italic"
      icon={<TextItalicRegular />}
      name="textOptions"
      value="italic"
    />
    <ToolbarToggleButton
      appearance="transparent"
      aria-label="Underline"
      icon={<TextUnderlineRegular />}
      name="textOptions"
      value="underline"
    />
  </Toolbar>
);
