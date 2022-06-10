import * as React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import { themes, defaultTheme, FluentProvider } from '../theme';
import { THEME_ID } from '../constants';
import { FluentGlobals } from '../hooks';

import { Theme } from '@fluentui/react-theme';

const getActiveFluentTheme = (globals: FluentGlobals) => {
  const selectedThemeId = globals[THEME_ID];
  const { theme } = themes.find(value => value.id === selectedThemeId) ?? defaultTheme;

  return { theme };
};

export const withFluentProvider: DecoratorFunction<JSX.Element> = (StoryFn, context) => {
  const { theme } = getActiveFluentTheme(context.globals);

  return (
    <FluentProvider theme={theme}>
      <FluentExampleContainer theme={theme}>{StoryFn()}</FluentExampleContainer>
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ theme: Theme }> = props => {
  const { theme } = props;

  const backgroundColor = theme.colorNeutralBackground2;
  return <div style={{ padding: '48px 24px', backgroundColor: backgroundColor }}>{props.children}</div>;
};
