import * as React from 'react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-headless-components-preview';
import {
  CutRegular,
  CopyRegular,
  ClipboardPasteRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
} from '@fluentui/react-icons';

const classes = {
  toolbar:
    'inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-sm data-[vertical]:flex-col',
  button:
    'flex items-center justify-center size-8 rounded border-none bg-transparent p-0 text-gray-700 cursor-pointer ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ' +
    'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
  activeButton:
    'flex items-center justify-center size-8 rounded border-none p-0 text-blue-700 bg-blue-50 cursor-pointer ' +
    'hover:bg-blue-100 active:bg-blue-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1',
  toggleButton:
    'flex items-center justify-center size-8 rounded border-none bg-transparent p-0 text-gray-700 cursor-pointer ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ' +
    'data-[checked]:text-blue-700 data-[checked]:bg-blue-50 ' +
    'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
  divider: 'mx-0.5 w-px self-stretch bg-gray-200 data-[vertical]:h-px data-[vertical]:w-auto data-[vertical]:my-0.5',
  group: 'flex items-center gap-0.5 data-[vertical]:flex-col',
};

const alignIcons = {
  left: TextAlignLeftRegular,
  center: TextAlignCenterRegular,
  right: TextAlignRightRegular,
};

export const Default = (): React.ReactNode => {
  const [align, setAlign] = React.useState('left');

  return (
    <Toolbar className={classes.toolbar} aria-label="Text formatting">
      <ToolbarButton className={classes.button} aria-label="Cut" icon={<CutRegular />} />
      <ToolbarButton className={classes.button} aria-label="Copy" icon={<CopyRegular />} />
      <ToolbarButton className={classes.button} aria-label="Paste" icon={<ClipboardPasteRegular />} />

      <ToolbarDivider className={classes.divider} />

      <ToolbarGroup className={classes.group} aria-label="Text formatting">
        <ToolbarToggleButton
          name="format"
          value="bold"
          className={classes.toggleButton}
          aria-label="Bold"
          icon={<TextBoldRegular />}
          onClick={() => undefined}
        />
        <ToolbarToggleButton
          name="format"
          value="italic"
          className={classes.toggleButton}
          aria-label="Italic"
          icon={<TextItalicRegular />}
          onClick={() => undefined}
        />
        <ToolbarToggleButton
          name="format"
          value="underline"
          className={classes.toggleButton}
          aria-label="Underline"
          icon={<TextUnderlineRegular />}
          onClick={() => undefined}
        />
        <ToolbarToggleButton
          name="format"
          value="strikethrough"
          disabled
          className={classes.toggleButton}
          aria-label="Strikethrough"
          icon={<TextUnderlineRegular />}
        />
      </ToolbarGroup>

      <ToolbarDivider className={classes.divider} />

      <ToolbarRadioGroup className={classes.group} aria-label="Text alignment">
        {Object.entries(alignIcons).map(([option, Icon]) => {
          return (
            <ToolbarButton
              key={option}
              className={align === option ? classes.activeButton : classes.button}
              aria-label={`Align ${option}`}
              aria-pressed={align === option}
              icon={<Icon />}
              onClick={() => setAlign(option)}
            />
          );
        })}
      </ToolbarRadioGroup>
    </Toolbar>
  );
};
