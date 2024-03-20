import type { Theme, PartialTheme } from '@fluentui/react-theme';

export type XPlatProviderProps = {
  theme: Theme | PartialTheme | undefined;
  children: JSX.Element;
};
