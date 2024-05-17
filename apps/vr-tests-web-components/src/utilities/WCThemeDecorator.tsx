import * as React from 'react';
import { StoryContext } from '@storybook/addons';
import { ComponentStory } from '@storybook/react';
import { FASTElement, customElement, html, attr } from '@microsoft/fast-element';
import { teamsLightTheme, teamsDarkTheme, webLightTheme, webDarkTheme } from '@fluentui/tokens';
import { setThemeFor } from '@fluentui/web-components';

const themes = [
  { id: 'web-light', label: 'Web Light', theme: webLightTheme },
  { id: 'web-dark', label: 'Web Dark', theme: webDarkTheme },
  { id: 'teams-light', label: 'Teams Light', theme: teamsLightTheme },
  { id: 'teams-dark', label: 'Teams Dark', theme: teamsDarkTheme },
] as const;

const defaultTheme = themes[0];

type ThemeId = (typeof themes)[number]['id'];

interface WCStoryContext extends StoryContext {
  parameters: {
    dir?: 'ltr' | 'rtl';
    fluentTheme?: ThemeId;
  };
}

@customElement({
  name: 'fast-theme-decorator',
  template: html`<slot></slot>`,
  styles: `
  :host {
      display: block;
      color: var(--colorNeutralForeground2);
      background-color: var(--colorNeutralBackground2);
      font-family: var(--fontFamilyBase);
      }
  `,
})
export class FASTThemeDecorator extends FASTElement {
  @attr({
    attribute: 'fluent-theme',
  })
  public fluentTheme: ThemeId = defaultTheme.id;

  connectedCallback() {
    super.connectedCallback();
    const theme = themes.find(value => value.id === this.fluentTheme)?.theme ?? defaultTheme.theme;
    setThemeFor(this, theme);
  }
}

export const WCThemeDecorator = (StoryFn: () => JSX.Element, context: WCStoryContext) => {
  const { dir = 'ltr', fluentTheme = defaultTheme.id } = context.parameters;

  return React.createElement('fast-theme-decorator', { dir, 'fluent-theme': fluentTheme }, StoryFn());
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
