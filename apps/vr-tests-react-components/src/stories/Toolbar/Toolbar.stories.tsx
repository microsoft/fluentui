import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Toolbar, ToolbarProps, ToolbarButton, ToolbarDivider, ToolbarToggleButton } from '@fluentui/react-toolbar';
import {
  TextBold24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
  AlertSnooze24Regular,
} from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { steps } from './utils';

export default {
  title: 'Toolbar Converged',
  Component: Toolbar,
  decorators: [
    story => (
      <Screener steps={steps}>
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export const Default = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBold24Regular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalic24Regular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderline24Regular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnooze24Regular />}
    />
  </Toolbar>
);

export const Vertical = (props: Partial<ToolbarProps>) => (
  <Toolbar vertical>
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBold24Regular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalic24Regular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderline24Regular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnooze24Regular />}
    />
  </Toolbar>
);

export const Small = (props: Partial<ToolbarProps>) => (
  <Toolbar size="small">
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBold24Regular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalic24Regular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderline24Regular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnooze24Regular />}
    />
  </Toolbar>
);
