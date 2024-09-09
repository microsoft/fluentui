import * as React from 'react';
import type { OptionCollectionState, OptionValue } from './OptionCollection.types';

/**
 * A hook for managing a collection of child Options
 */
export const useOptionCollection = (): OptionCollectionState => {
  const optionsById = React.useRef(new Map<string, OptionValue>());

  const collectionAPI = React.useMemo(() => {
    const getCount = () => optionsById.current.size;

    // index searches are no longer used
    const getOptionAtIndex = () => undefined;
    const getIndexOfId = () => -1;

    const getOptionById = (id: string) => {
      return optionsById.current.get(id);
    };
    const getOptionsMatchingText = (matcher: (text: string) => boolean) => {
      return Array.from(optionsById.current.values()).filter(({ text }) => matcher(text));
    };

    const getOptionsMatchingValue = (matcher: (value: string) => boolean) => {
      const matches: OptionValue[] = [];
      for (const option of optionsById.current.values()) {
        if (matcher(option.value)) {
          matches.push(option);
        }
      }

      return matches;
    };

    return {
      getCount,
      getOptionAtIndex,
      getIndexOfId,
      getOptionById,
      getOptionsMatchingText,
      getOptionsMatchingValue,
    };
  }, []);

  const registerOption = React.useCallback((option: OptionValue) => {
    optionsById.current.set(option.id, option);

    return () => optionsById.current.delete(option.id);
  }, []);

  return {
    ...collectionAPI,
    options: Array.from(optionsById.current.values()),
    registerOption,
  };
};
