import type {
  ProviderContextValue_unstable as ProviderContextValue,
  TooltipVisibilityContextValue_unstable as TooltipVisibilityContextValue,
  ThemeClassNameContextValue_unstable as ThemeClassNameContextValue,
  ThemeContextValue_unstable as ThemeContextValue,
} from '@fluentui/react-shared-contexts';
import type { PartialTheme } from '@fluentui/react-theme';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type FluentProviderSlots = {
  root: Slot<'div'>;
};

export type FluentProviderProps = Omit<ComponentProps<FluentProviderSlots>, 'dir'> & {
  /** Sets the direction of text & generated styles. */
  dir?: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document;

  theme?: PartialTheme;
};

export type FluentProviderState = ComponentState<FluentProviderSlots> &
  Pick<FluentProviderProps, 'targetDocument'> &
  Required<Pick<FluentProviderProps, 'dir'>> & {
    theme: ThemeContextValue;
    themeClassName: string;
  };

export type FluentProviderContextValues = Pick<FluentProviderState, 'theme'> & {
  provider: ProviderContextValue;
  themeClassName: ThemeClassNameContextValue;
  textDirection: 'ltr' | 'rtl';
  tooltip: TooltipVisibilityContextValue;
};
