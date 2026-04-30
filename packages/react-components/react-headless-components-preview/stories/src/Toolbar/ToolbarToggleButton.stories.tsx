import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarToggleButton } from '@fluentui/react-headless-components-preview/toolbar';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';

const classes = {
  toolbar:
    'inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-sm data-[vertical]:flex-col',
  toggleButton:
    'flex items-center justify-center size-8 rounded border-none bg-transparent p-0 text-gray-700 cursor-pointer ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ' +
    'data-[checked]:text-blue-700 data-[checked]:bg-blue-50 ' +
    'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
  divider: 'mx-0.5 w-px self-stretch bg-gray-200 data-[vertical]:h-px data-[vertical]:w-auto data-[vertical]:my-0.5',
  group: 'flex items-center gap-0.5 data-[vertical]:flex-col',
};

export const Toggle = (): React.ReactNode => {
  return (
    <Toolbar className={classes.toolbar} aria-label="Multiple formatting states">
      <ToolbarGroup className={classes.group} aria-label="Pre-selected formatting">
        <ToolbarToggleButton
          name="format"
          value="bold"
          className={classes.toggleButton}
          aria-label="Bold (checked)"
          icon={<TextBoldRegular />}
        />
        <ToolbarToggleButton
          name="format"
          value="italic"
          className={classes.toggleButton}
          aria-label="Italic"
          icon={<TextItalicRegular />}
        />
        <ToolbarToggleButton
          name="format"
          value="underline"
          className={classes.toggleButton}
          aria-label="Underline"
          icon={<TextUnderlineRegular />}
        />
      </ToolbarGroup>
    </Toolbar>
  );
};
