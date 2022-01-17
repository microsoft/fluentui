import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { PartialTheme, Theme } from '@fluentui/react-theme';
import type {
  ProviderContextValue,
  TooltipContextType,
  ThemeClassNameContextValue,
} from '@fluentui/react-shared-contexts';

export type FluentProviderSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export interface FluentProviderCommons {
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
  tooltip: TooltipContextType;
}
