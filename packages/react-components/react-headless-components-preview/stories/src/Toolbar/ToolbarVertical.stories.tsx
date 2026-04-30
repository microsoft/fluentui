import * as React from 'react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
} from '@fluentui/react-headless-components-preview/toolbar';
import {
  CutRegular,
  CopyRegular,
  ClipboardPasteRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
} from '@fluentui/react-icons';

const classes = {
  toolbar:
    'inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-sm data-[vertical]:flex-col',
  button:
    'flex items-center justify-center size-8 rounded border-none bg-transparent p-0 text-gray-700 cursor-pointer ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ' +
    'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
  divider: 'mx-0.5 w-px self-stretch bg-gray-200 data-[vertical]:h-px data-[vertical]:w-auto data-[vertical]:my-0.5',
  group: 'flex items-center gap-0.5 data-[vertical]:flex-col',
};

export const Vertical = (): React.ReactNode => (
  <Toolbar className={classes.toolbar} vertical aria-label="Text formatting">
    <ToolbarButton className={classes.button} aria-label="Cut" icon={<CutRegular />} />
    <ToolbarButton className={classes.button} aria-label="Copy" icon={<CopyRegular />} />
    <ToolbarButton className={classes.button} aria-label="Paste" icon={<ClipboardPasteRegular />} />

    <ToolbarDivider className={classes.divider} />

    <ToolbarGroup className={classes.group} aria-label="Text formatting">
      <ToolbarButton className={classes.button} aria-label="Bold" icon={<TextBoldRegular />} />
      <ToolbarButton className={classes.button} aria-label="Italic" icon={<TextItalicRegular />} />
      <ToolbarButton className={classes.button} aria-label="Underline" icon={<TextUnderlineRegular />} />
    </ToolbarGroup>
  </Toolbar>
);
