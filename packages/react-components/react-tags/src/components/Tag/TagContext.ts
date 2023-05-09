import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { TagContextValue } from './Tag.types';

export const TagContext: Context<TagContextValue> = createContext<TagContextValue | undefined>(
  undefined,
) as Context<TagContextValue>;

const tagContextDefaultValue: TagContextValue = {
  dismissible: false,
  shape: 'rounded',
  size: 'medium',
  interactive: false,
};

export const TagProvider = TagContext.Provider;
export const useTagContext_unstable = <T>(selector: ContextSelector<TagContextValue, T>): T =>
  useContextSelector(TagContext, (ctx = tagContextDefaultValue) => selector(ctx));
