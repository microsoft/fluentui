import * as React from 'react';
import { Steps, type StoryParameters } from 'storywright';
import { makeStyles } from '@griffel/react';
import type {
  ToolbarProps} from '@fluentui/react-toolbar';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  ToolbarGroup,
} from '@fluentui/react-toolbar';
import {
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
  AlertSnoozeRegular,
  FontIncreaseRegular,
  FontDecreaseRegular,
  TextFontRegular,
} from '@fluentui/react-icons';
import type { Meta } from '@storybook/react-webpack5';

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
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBoldRegular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalicRegular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderlineRegular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnoozeRegular />}
    />
  </Toolbar>
);

export const Transparent = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton
      id="bold-button"
      aria-label="Text option - Bold"
      appearance="transparent"
      icon={<TextBoldRegular />}
    />
    <ToolbarButton aria-label="Text option - Italic" appearance="transparent" icon={<TextItalicRegular />} />
    <ToolbarButton aria-label="Text option - Underline" appearance="transparent" icon={<TextUnderlineRegular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      appearance="transparent"
      icon={<AlertSnoozeRegular />}
    />
  </Toolbar>
);

export const Vertical = (props: Partial<ToolbarProps>) => (
  <Toolbar vertical>
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBoldRegular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalicRegular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderlineRegular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnoozeRegular />}
    />
  </Toolbar>
);

export const Small = (props: Partial<ToolbarProps>) => (
  <Toolbar size="small">
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBoldRegular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalicRegular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderlineRegular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnoozeRegular />}
    />
  </Toolbar>
);

export const Large = (props: Partial<ToolbarProps>) => (
  <Toolbar size="large">
    <ToolbarButton id="bold-button" aria-label="Text option - Bold" appearance="primary" icon={<TextBoldRegular />} />
    <ToolbarButton aria-label="Text option - Italic" icon={<TextItalicRegular />} />
    <ToolbarButton aria-label="Text option - Underline" icon={<TextUnderlineRegular />} />
    <ToolbarDivider />
    <ToolbarToggleButton
      id="snooze-toggle"
      aria-label="Snooze Alert Option"
      name="toggle"
      value="toggle"
      icon={<AlertSnoozeRegular />}
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
      icon={<TextBoldRegular />}
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
          icon={<TextBoldRegular />}
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
          icon={<AlertSnoozeRegular />}
        />
      </ToolbarGroup>
    </Toolbar>
  );
};
