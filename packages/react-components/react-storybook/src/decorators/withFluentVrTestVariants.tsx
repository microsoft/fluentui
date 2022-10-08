import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import { makeDecorator, LegacyStoryFn, StoryContext } from '@storybook/addons';

export const DARK_MODE = 'DarkMode';
export const HIGH_CONTRAST = 'HighContrast';
export const RTL = 'Rtl';

// MakeDecoratorOptions is not an exported interface by storybook so had to include necessary options
interface AssertedMakeDecoratorOptions {
  name: string;
  parameterName: string;
  skipIfNoParametersOrOptions?: boolean;
  wrapper: (
    storyFn: LegacyStoryFn,
    context: StoryContext,
    settings: {
      parameters: typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL;
    },
  ) => React.ReactNode;
}

type AssertedMakeDecorator = ({
  name,
  parameterName,
  skipIfNoParametersOrOptions,
  wrapper,
}: AssertedMakeDecoratorOptions) => () => React.ReactNode;

export const withFluentVrTestVariants = ((makeDecorator as unknown) as AssertedMakeDecorator)({
  name: 'withFluentVrTestVariants.',
  parameterName: 'vrTestVariant',
  skipIfNoParametersOrOptions: true,
  wrapper: (storyFn, context, { parameters }) => {
    if (parameters === RTL) {
      return (
        <FluentProvider dir={'rtl'} theme={webLightTheme}>
          {storyFn(context)}
        </FluentProvider>
      );
    }

    if (parameters === DARK_MODE) {
      return <FluentProvider theme={webDarkTheme}>{storyFn(context)}</FluentProvider>;
    }

    if (parameters === HIGH_CONTRAST) {
      return <FluentProvider theme={teamsHighContrastTheme}>{storyFn(context)}</FluentProvider>;
    }

    return storyFn(context);
  },
});
