import * as React from 'react';
import type { IFloatingSuggestionsHeaderFooterProps } from '../../FloatingSuggestionsComposite/FloatingSuggestionsHeaderFooterItem/FloatingSuggestionsHeaderFooterItem.types';

export interface IUseFloatingSuggestionItems<T> {
  focusItemIndex: number;
  setFocusItemIndex: React.Dispatch<React.SetStateAction<number>>;
  suggestionItems: T[];
  setSuggestionItems: React.Dispatch<React.SetStateAction<T[]>>;
  footerItemIndex: number;
  setfooterItemIndex: React.Dispatch<React.SetStateAction<number>>;
  footerItems: IFloatingSuggestionsHeaderFooterProps[];
  setFooterItems: React.Dispatch<React.SetStateAction<IFloatingSuggestionsHeaderFooterProps[]>>;
  headerItemIndex: number;
  setHeaderItemIndex: React.Dispatch<React.SetStateAction<number>>;
  headerItems: IFloatingSuggestionsHeaderFooterProps[];
  setHeaderItems: React.Dispatch<React.SetStateAction<IFloatingSuggestionsHeaderFooterProps[]>>;
  isSuggestionsShown: boolean;
  showPicker: (show: boolean) => void;
  selectNextSuggestion: () => void;
  selectPreviousSuggestion: () => void;
  getFocusedSuggestion: () => T;
  hasSuggestionSelected: () => void;
  removeSuggestion: (index: number) => void;
  clearPickerSelectedIndex: () => void;
  queryString: string;
  setQueryString: (queryString: string) => void;
}

export const useFloatingSuggestionItems = <T extends {}>(
  floatingSuggestionItems: T[],
  footerSuggestionItems?: IFloatingSuggestionsHeaderFooterProps[],
  headerSuggestionItems?: IFloatingSuggestionsHeaderFooterProps[],
  focusSuggestionIndex?: number,
  focusFooterIndex?: number,
  focusHeaderIndex?: number,
  isSuggestionsVisible?: boolean,
  initialQueryString?: string,
) => {
  const [focusItemIndex, setFocusItemIndex] = React.useState(focusSuggestionIndex || -1);
  const [suggestionItems, setSuggestionItems] = React.useState(floatingSuggestionItems);

  const [footerItemIndex, setFooterItemIndex] = React.useState(focusFooterIndex || -1);
  const [footerItems, setFooterItems] = React.useState(footerSuggestionItems);

  const [headerItemIndex, setHeaderItemIndex] = React.useState(focusHeaderIndex || -1);
  const [headerItems, setHeaderItems] = React.useState(headerSuggestionItems);

  const [isSuggestionsShown, setIsSuggestionsShown] = React.useState(isSuggestionsVisible || false);

  const [queryString, setQueryString] = React.useState(initialQueryString || '');

  React.useEffect(() => {
    setSuggestionItems(floatingSuggestionItems);
    // If we have a query string and suggestions, set the first one as selected
    if (queryString !== '' && floatingSuggestionItems && floatingSuggestionItems.length > 0) {
      setFocusItemIndex(0);
      setHeaderItemIndex(-1);
      setFooterItemIndex(-1);
    }
    // Otherwise clear the selection
    else {
      clearPickerSelectedIndex();
    }
  }, [floatingSuggestionItems, queryString]);

  const headerFooterItemsHaveExecute = (items: IFloatingSuggestionsHeaderFooterProps[]): boolean => {
    let haveExecute = false;
    items!.forEach(item => {
      if (item.onExecute !== undefined) {
        haveExecute = true;
      }
    });
    return haveExecute;
  };

  const hasSelectableFooters = footerItems ? headerFooterItemsHaveExecute(footerItems) : false;
  const hasSelectableHeaders = headerItems ? headerFooterItemsHaveExecute(headerItems) : false;

  const getNextSelectableHeaderOrFooter = (
    items: IFloatingSuggestionsHeaderFooterProps[],
    itemIndex: number,
  ): number => {
    let nextIndex = -1;
    if (items) {
      let i = itemIndex + 1;
      while (i < items.length) {
        if (items[i].onExecute && items[i].shouldShow()) {
          nextIndex = i;
          i = items.length;
        }
        i++;
      }
    }
    return nextIndex;
  };

  const getPreviousSelectableHeaderOrFooter = (
    items: IFloatingSuggestionsHeaderFooterProps[],
    itemIndex: number,
  ): number => {
    let nextIndex = -1;
    if (items) {
      let i = itemIndex !== -1 ? itemIndex - 1 : items.length - 1;
      while (i > -1) {
        if (items[i].onExecute && items[i].shouldShow()) {
          nextIndex = i;
          i = -1;
        }
        i--;
      }
    }
    return nextIndex;
  };

  const showPicker = (show: boolean) => {
    clearPickerSelectedIndex();
    setIsSuggestionsShown(show);
  };

  const selectNextSuggestion = (): void => {
    // We're currently selected on a header
    if (headerItemIndex > -1) {
      // First, try and find another header
      const nextHeaderIndex = getNextSelectableHeaderOrFooter(headerItems!, headerItemIndex);
      if (nextHeaderIndex !== -1) {
        setHeaderItemIndex(nextHeaderIndex);
      } else {
        // select the first suggestion item
        setHeaderItemIndex(-1);
        if (suggestionItems && suggestionItems.length > 0) {
          // select the first suggestion item
          setFocusItemIndex(0);
        } else if (hasSelectableFooters) {
          setFooterItemIndex(getNextSelectableHeaderOrFooter(footerItems!, footerItemIndex));
        }
      }
    }
    // We're currently selected on a selected item
    else if (focusItemIndex > -1) {
      // If we're at the end of the list
      if (focusItemIndex === suggestionItems.length - 1) {
        if (hasSelectableFooters) {
          setFooterItemIndex(getNextSelectableHeaderOrFooter(footerItems!, footerItemIndex));
          setFocusItemIndex(-1);
        } else if (hasSelectableHeaders) {
          setHeaderItemIndex(getNextSelectableHeaderOrFooter(headerItems!, headerItemIndex));
          setFocusItemIndex(-1);
        } else {
          setFocusItemIndex(0);
        }
      } else {
        setFocusItemIndex(focusItemIndex + 1);
      }
    }
    // We're currently selected on a footer
    else if (footerItemIndex > -1) {
      // First, try and find another footer
      const nextFooterIndex = getNextSelectableHeaderOrFooter(footerItems!, footerItemIndex);
      if (nextFooterIndex !== -1) {
        setFooterItemIndex(nextFooterIndex);
      } else {
        setFooterItemIndex(-1);
        if (hasSelectableHeaders) {
          setHeaderItemIndex(getNextSelectableHeaderOrFooter(headerItems!, headerItemIndex));
        } else if (suggestionItems && suggestionItems.length > 0) {
          // select the first suggestion item
          setFocusItemIndex(0);
        }
      }
    }
    // else, we have no items selected, so select the first one available
    else {
      if (hasSelectableHeaders) {
        setHeaderItemIndex(getNextSelectableHeaderOrFooter(headerItems!, headerItemIndex));
      } else if (suggestionItems && suggestionItems.length > 0) {
        // select the first suggestion item
        setFocusItemIndex(0);
      } else if (hasSelectableFooters) {
        setFooterItemIndex(getNextSelectableHeaderOrFooter(footerItems!, footerItemIndex));
      }
      // else, we stay in the state with nothing selected
    }
  };

  const selectPreviousSuggestion = (): void => {
    // We're currently selected on a footer
    if (footerItemIndex > -1) {
      // First, try and find another footer
      const previousFooterIndex = getPreviousSelectableHeaderOrFooter(footerItems!, footerItemIndex);
      if (previousFooterIndex !== -1) {
        setFooterItemIndex(previousFooterIndex);
      } else {
        setFooterItemIndex(-1);
        if (suggestionItems && suggestionItems.length > 0) {
          // select the first suggestion item
          setFocusItemIndex(suggestionItems.length - 1);
        } else if (hasSelectableHeaders) {
          setHeaderItemIndex(getPreviousSelectableHeaderOrFooter(headerItems!, headerItemIndex));
        }
      }
    }
    // We're currently selected on a selected item
    else if (focusItemIndex > -1) {
      // If we're at the beginning of the list
      if (focusItemIndex === 0) {
        setFocusItemIndex(-1);
        if (hasSelectableHeaders) {
          setHeaderItemIndex(getPreviousSelectableHeaderOrFooter(headerItems!, headerItemIndex));
        } else if (hasSelectableFooters) {
          setFooterItemIndex(getPreviousSelectableHeaderOrFooter(footerItems!, footerItemIndex));
        } else {
          setFocusItemIndex(suggestionItems.length - 1);
        }
      } else {
        setFocusItemIndex(focusItemIndex - 1);
      }
    }
    // We're currently selected on a header
    else if (headerItemIndex > -1) {
      // First, try and find another header
      const nextHeaderIndex = getPreviousSelectableHeaderOrFooter(headerItems!, headerItemIndex);
      if (nextHeaderIndex !== -1) {
        setHeaderItemIndex(nextHeaderIndex);
      } else {
        // select the first suggestion item
        setHeaderItemIndex(-1);
        if (hasSelectableFooters) {
          setFooterItemIndex(getPreviousSelectableHeaderOrFooter(footerItems!, footerItemIndex));
        } else if (suggestionItems && suggestionItems.length > 0) {
          // select the first suggestion item
          setFocusItemIndex(suggestionItems.length - 1);
        }
      }
    }
    // else, we have no items selected, so select the last one available
    else {
      if (hasSelectableFooters) {
        setFooterItemIndex(getPreviousSelectableHeaderOrFooter(footerItems!, footerItemIndex));
      } else if (suggestionItems && suggestionItems.length > 0) {
        // select the last suggestion item
        setFocusItemIndex(suggestionItems.length - 1);
      } else if (hasSelectableHeaders) {
        setHeaderItemIndex(getPreviousSelectableHeaderOrFooter(headerItems!, headerItemIndex));
      }
      // else, we stay in the state with nothing selected
    }
  };

  const getFocusedSuggestion = (): T => {
    return suggestionItems[focusItemIndex];
  };

  const hasSuggestionSelected = (): boolean => {
    return focusItemIndex !== -1 && focusItemIndex < suggestionItems.length;
  };

  const removeSuggestion = (index: number): void => {
    const currentSuggestions = [...suggestionItems];
    const updatedSuggestions = currentSuggestions.splice(index, 1);
    setSuggestionItems(updatedSuggestions);
  };

  const clearPickerSelectedIndex = (): void => {
    setFocusItemIndex(-1);
    setFooterItemIndex(-1);
    setHeaderItemIndex(-1);
  };

  return {
    focusItemIndex: focusItemIndex,
    setFocusItemIndex: setFocusItemIndex,
    suggestionItems: suggestionItems,
    setSuggestionItems: setSuggestionItems,
    footerItemIndex: footerItemIndex,
    setFooterItemIndex: setFooterItemIndex,
    footerItems: footerItems,
    setFooterItems: setFooterItems,
    headerItemIndex: headerItemIndex,
    setHeaderItemIndex: setHeaderItemIndex,
    headerItems: headerItems,
    setHeaderItems: setHeaderItems,
    isSuggestionsShown: isSuggestionsShown,
    showPicker: showPicker,
    selectNextSuggestion: selectNextSuggestion,
    selectPreviousSuggestion: selectPreviousSuggestion,
    getFocusedSuggestion: getFocusedSuggestion,
    hasSuggestionSelected: hasSuggestionSelected,
    removeSuggestion: removeSuggestion,
    clearPickerSelectedIndex: clearPickerSelectedIndex,
    queryString: queryString,
    setQueryString: setQueryString,
  };
};
