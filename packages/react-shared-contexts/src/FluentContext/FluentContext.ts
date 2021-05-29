import { ContextSelector, createContext, useContextSelector, Context } from '@fluentui/react-context-selector';
import { FluentContextValue } from './FluentContext.types';

export const FluentContext: Context<FluentContextValue> = createContext<FluentContextValue>({
  targetDocument: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
  theme: null!,
  tooltipContext: {},
  themeClassName: '',
});

export const useFluent = <SelectedValue>(selector: ContextSelector<FluentContextValue, SelectedValue>) =>
  useContextSelector(FluentContext, selector);
