import * as React from 'react';
import { Steps, type StoryParameters } from 'storywright';
import { makeStyles } from '@griffel/react';
import {
  Toolbar,
  ToolbarProps,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  ToolbarGroup,
} from '@fluentui/react-toolbar';
import {
  TextBold24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
  AlertSnooze24Regular,
  FontIncreaseRegular,
  FontDecreaseRegular,
  TextFontRegular,
} from '@fluentui/react-icons';
import type { Meta } from '@storybook/react';

export default {
  title: 'Toolbar Converged',
  component: Toolbar,
  decorators: [
    story => (
      <div className="testWrapper" style={{ width: '600px' }}>
        {story()}
      </div>
    ),
  ],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('#snooze-toggle')
        .snapshot('Toggle On', { cropTo: '.testWrapper' })
        .mouseDown('#bold-button')
        .snapshot('Button Pressed', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Toolbar>;

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

export const Transparent = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton
      id="bold-button"
      aria-label="Text option - Bold"
      appearance="transparent"
      icon={<TextBold24Regular />}
    />
    <ToolbarButton aria-label="Text option - Italic" appearance="transparent" icon={<TextItalic24Regular />} />
    <ToolbarButton aria-label="Text option - Underline" appearance="transparent" icon={<TextUnderline24Regular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      appearance="transparent"
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

export const Large = (props: Partial<ToolbarProps>) => (
  <Toolbar size="large">
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

export const VerticalButton = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton
      vertical
      id="bold-button"
      aria-label="Text option - Bold"
      appearance="primary"
      icon={<TextBold24Regular />}
    />
    <ToolbarButton vertical appearance="primary" icon={<FontIncreaseRegular />}>
      Increase
    </ToolbarButton>
    <ToolbarButton vertical icon={<FontDecreaseRegular />}>
      Decrease
    </ToolbarButton>
    <ToolbarButton id="snooze-toggle" vertical icon={<TextFontRegular />}>
      Reset
    </ToolbarButton>
  </Toolbar>
);

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const FarGroup = (props: Partial<ToolbarProps>) => {
  const farGroupStyles = useStyles();
  return (
    <Toolbar {...props} className={farGroupStyles.toolbar}>
      <ToolbarGroup role="presentation">
        <ToolbarButton
          id="bold-button"
          aria-label="Text option - Bold"
          appearance="primary"
          icon={<TextBold24Regular />}
        />
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFontRegular />} />
        <ToolbarDivider />
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFontRegular />} />
      </ToolbarGroup>
      <ToolbarGroup role="presentation">
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
        <ToolbarToggleButton
          id="snooze-toggle"
          aria-label="Snooze Alert Option"
          name="toggle"
          value="toggle"
          icon={<AlertSnooze24Regular />}
        />
      </ToolbarGroup>
    </Toolbar>
  );
};
