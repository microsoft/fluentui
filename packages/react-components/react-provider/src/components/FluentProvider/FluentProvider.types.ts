import type {
  ProviderContextValue,
  TooltipContextType,
  ThemeClassNameContextValue,
} from '@fluentui/react-shared-contexts';
import type { PartialTheme, Theme } from '@fluentui/react-theme';
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
    theme: Theme | Partial<Theme> | undefined;
    themeClassName: string;
  };

export type FluentProviderContextValues = Pick<FluentProviderState, 'theme'> & {
  provider: ProviderContextValue;
  themeClassName: ThemeClassNameContextValue;
  textDirection: 'ltr' | 'rtl';
  tooltip: TooltipContextType;
};
