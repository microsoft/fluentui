import { Theme } from '@fluentui/react-theme';

export interface FluentContextValue {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';
  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document;
  tooltipContext: TooltipContextValue;
  theme: Theme;
  themeClassName: string;
}

export interface TooltipContextValue {
  visibleTooltip?: {
    hide: () => void;
  };
}
