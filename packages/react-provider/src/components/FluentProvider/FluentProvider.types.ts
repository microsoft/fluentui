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

interface FluentProviderCommons {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument: Document | undefined;
}

export interface FluentProviderProps
  extends Omit<ComponentProps<FluentProviderSlots>, 'dir'>,
    Partial<FluentProviderCommons> {
  theme?: PartialTheme;
}

export interface FluentProviderState extends ComponentState<FluentProviderSlots>, FluentProviderCommons {
  theme: Theme | Partial<Theme> | undefined;
  themeClassName: string;
}

export interface FluentProviderContextValues extends Pick<FluentProviderState, 'theme'> {
  provider: ProviderContextValue;
  themeClassName: ThemeClassNameContextValue;
  textDirection: 'ltr' | 'rtl';
  tooltip: TooltipContextType;
}
