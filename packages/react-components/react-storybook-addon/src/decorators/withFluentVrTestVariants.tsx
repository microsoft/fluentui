import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import { makeDecorator } from '@storybook/addons';
import type { StoryContext } from '@storybook/addons';
import { useParameter } from '@storybook/api';

export const DARK_MODE = 'DarkMode';
export const HIGH_CONTRAST = 'HighContrast';
export const RTL = 'Rtl';

// MakeDecoratorOptions is not an exported interface by storybook so had to include necessary options
interface AssertedMakeDecoratorOptions {
  name: string;
  parameterName: string;
  skipIfNoParametersOrOptions?: boolean;
  wrapper: (
    storyFn: (context: StoryContext) => React.ReactNode,
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

// export const withFluentVrTestVariants = ((makeDecorator as unknown) as AssertedMakeDecorator)({
//   name: 'withFluentVrTestVariants.',
//   parameterName: 'vrTestVariant',
//   skipIfNoParametersOrOptions: true,
//   wrapper: (storyFn, context, { parameters }) => {
//     console.log('parameter ', parameters);
//   if (parameters === RTL) {
//     return (
//       <FluentProvider dir={'rtl'} theme={webLightTheme}>
//         {storyFn(context)}
//       </FluentProvider>
//     );
//   }

//   if (parameters === DARK_MODE) {
//     return <FluentProvider theme={webDarkTheme}>{storyFn(context)}</FluentProvider>;
//   }

//   if (parameters === HIGH_CONTRAST) {
//     return <FluentProvider theme={teamsHighContrastTheme}>{storyFn(context)}</FluentProvider>;
//   }

//   return storyFn(context);
// },
// });

export const withFluentVrTestVariants = (storyFn: () => JSX.Element, context: StoryContext) => {
  const { variant } = context.parameters;

  // console.log('context', context);
  if (variant === RTL) {
    return (
      <FluentProvider dir={'rtl'} theme={webLightTheme}>
        {storyFn()}
      </FluentProvider>
    );
  }

  if (variant === DARK_MODE) {
    return <FluentProvider theme={webDarkTheme}>{storyFn()}</FluentProvider>;
  }

  if (variant === HIGH_CONTRAST) {
    return <FluentProvider theme={teamsHighContrastTheme}>{storyFn()}</FluentProvider>;
  }

  return storyFn();
};
