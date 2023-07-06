import * as React from 'react';
import { StoryContext } from '@storybook/addons';
import { teamsLightTheme, teamsDarkTheme, webLightTheme, webDarkTheme } from '@fluentui/tokens';
import { DesignToken } from '@microsoft/fast-foundation';
import { setTheme } from '@fluentui/web-components';
import { ComponentStory } from '@storybook/react';

DesignToken.registerDefaultStyleTarget();

const themes = [
  { id: 'web-light', label: 'Web Light', theme: webLightTheme },
  { id: 'web-dark', label: 'Web Dark', theme: webDarkTheme },
  { id: 'teams-light', label: 'Teams Light', theme: teamsLightTheme },
  { id: 'teams-dark', label: 'Teams Dark', theme: teamsDarkTheme },
] as const;

const defaultTheme = themes[0];

type ThemeId = typeof themes[number]['id'];

interface WCStoryContext extends StoryContext {
  parameters: {
    dir?: 'ltr' | 'rtl';
    fluentTheme?: ThemeId;
  };
}

export const WCThemeDecorator = (StoryFn: () => JSX.Element, context: WCStoryContext) => {
  const { dir = 'ltr', fluentTheme = defaultTheme.id } = context.parameters;
  const theme = themes.find(value => value.id === fluentTheme)?.theme ?? defaultTheme.theme;

  // FIXME: we currently do not support scoped theming in FUIWC3.
  // Global setTheme() works for VR tests as those are rendered in a new window, but when running storybook you only see the last theme.
  setTheme(theme);

  return (
    <div
      className="WCTest"
      style={{
        color: 'var(--colorNeutralForeground2)',
        backgroundColor: 'var(--colorNeutralBackground2)',
        fontFamily: 'var(--fontFamilyBase)',
      }}
      dir={dir}
    >
      {StoryFn()}
    </div>
  );
};

export const DARK_MODE = 'Dark Mode';
export const RTL = 'RTL';

type Variant = typeof DARK_MODE | typeof RTL;

function getStoryName(story: ComponentStory<never>) {
  if (story.storyName) {
    return story.storyName;
  }

  return story.name.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export const getStoryVariant = (story: () => string | JSX.Element | JSX.Element[], variant: Variant) => {
  return {
    ...story,
    render: story,
    storyName: `${getStoryName(story as ComponentStory<never>)} - ${variant}`,
    parameters: {
      ...(variant === DARK_MODE && { fluentTheme: 'teams-dark' }),
      ...(variant === RTL && { dir: 'rtl' }),
    },
  };
};
