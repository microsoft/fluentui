import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme, Theme } from '@fluentui/react-theme';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import * as React from 'react';

interface IDecoratorContext {
  /** Sets the direction to render the component */
  dir: 'ltr' | 'rtl';

  /** Sets the theme to render for the component  */
  theme?: Theme;
}

export const DecoratorContext = React.createContext<IDecoratorContext>({
  dir: 'ltr',
  theme: webLightTheme,
});

export const FluentProviderDecorator: DecoratorFunction<StoryFnReactReturnType> = story => {
  const decoratorContext = React.useContext(DecoratorContext);

  return (
    <FluentProvider theme={decoratorContext.theme} dir={decoratorContext.dir}>
      {story()}
    </FluentProvider>
  );
};
