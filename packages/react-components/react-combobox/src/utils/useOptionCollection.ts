import * as React from 'react';
import type { OptionCollectionState, OptionValue } from './OptionCollection.types';

/**
 * A hook for managing a collection of child Options
 */
export const useOptionCollection = (): OptionCollectionState => {
  const nodes = React.useRef<{ option: OptionValue; element: HTMLElement }[]>([]);

  const collectionAPI = React.useMemo(() => {
    const getCount = () => nodes.current.length;
    const getOptionAtIndex = (index: number) => nodes.current[index]?.option;
    const getIndexOfId = (id: string) => nodes.current.findIndex(node => node.option.id === id);
    const getOptionById = (id: string) => {
      const item = nodes.current.find(node => node.option.id === id);
      return item?.option;
    };
    const getOptionsMatchingValue = (matcher: (value: string) => boolean) => {
      return nodes.current.filter(node => matcher(node.option.value)).map(node => node.option);
    };

    return {
      getCount,
      getOptionAtIndex,
      getIndexOfId,
      getOptionById,
      getOptionsMatchingValue,
    };
  }, []);

  const registerOption = React.useCallback((option: OptionValue, element: HTMLElement) => {
    const index = nodes.current.findIndex(node => {
      if (!node.element || !element) {
        return false;
      }

      if (node.option.id === option.id) {
        return true;
      }

      // use the DOM method compareDocumentPosition to order the current node against registered nodes
      // eslint-disable-next-line no-bitwise
      return node.element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING;
    });

    // do not register the option if it already exists
    if (nodes.current[index]?.option.id !== option.id) {
      const newItem = {
        element,
        option,
      };

      // If an index is not found we will push the element to the end.
      if (index === -1) {
        nodes.current = [...nodes.current, newItem];
      } else {
        nodes.current.splice(index, 0, newItem);
      }
    }

    // return the unregister function
    return () => {
      nodes.current = nodes.current.filter(node => node.option.id !== option.id);
    };
  }, []);

  return {
    ...collectionAPI,
    options: nodes.current.map(node => node.option),
    registerOption,
  };
};
