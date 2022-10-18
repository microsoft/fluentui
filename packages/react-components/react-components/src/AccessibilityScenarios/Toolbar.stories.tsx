import * as React from 'react';

import { Toolbar, ToolbarButton, ToolbarToggleButton, ToolbarDivider } from '@fluentui/react-components/unstable';

import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const TextEditorToolbars: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Text editor Toolbars">
      <Toolbar aria-label="Font type">
        <ToolbarToggleButton name="bold" value="bold" icon={<TextBold24Regular />} aria-label="Bold" />
        <ToolbarToggleButton name="italic" value="italic" icon={<TextItalic24Regular />} aria-label="Italic" />
        <ToolbarToggleButton
          name="underline"
          value="underline"
          icon={<TextUnderline24Regular />}
          aria-label="Underline"
        />
      </Toolbar>

      <Toolbar aria-label="Insert">
        <ToolbarButton aria-haspopup="dialog">Image</ToolbarButton>
        <ToolbarButton aria-haspopup="dialog">Table</ToolbarButton>
        <ToolbarButton aria-haspopup="dialog">Formula</ToolbarButton>
        <ToolbarButton aria-haspopup="dialog">Symbol</ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>Page break</ToolbarButton>
        <ToolbarButton>Page number</ToolbarButton>
      </Toolbar>
    </Scenario>
  );
};
