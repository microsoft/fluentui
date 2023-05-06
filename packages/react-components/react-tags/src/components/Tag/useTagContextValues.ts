import type { TagContextValue, TagContextValues, TagState } from './Tag.types';

export function useTagContextValues_unstable(state: TagState): TagContextValues {
  const { dismissable, shape, size, interactive } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const tag: TagContextValue = {
    dismissable,
    shape,
    size,
    interactive,
  };

  return { tag };
}
