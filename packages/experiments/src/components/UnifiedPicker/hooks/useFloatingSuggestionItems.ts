import * as React from 'react';

export interface IUseFloatingSuggestionItems<T> {
  focusItemIndex: number;
  setFocusItemIndex: React.Dispatch<React.SetStateAction<number>>;
  suggestionItems: T[];
  setSuggestionItems: React.Dispatch<React.SetStateAction<T[]>>;
  isSuggestionsShown: boolean;
  showPicker: (show: boolean) => void;
  selectNextSuggestion: () => void;
  selectPreviousSuggestion: () => void;
  getFocusedSuggestion: () => T;
  hasSuggestionSelected: () => void;
  removeSuggestion: (index: number) => void;
}

export const useFloatingSuggestionItems = <T extends {}>(
  floatingSuggestionItems: T[],
  focusSuggestionIndex?: number,
  isSuggestionsVisible?: boolean,
) => {
  const [focusItemIndex, setFocusItemIndex] = React.useState(focusSuggestionIndex || -1);
  const [suggestionItems, setSuggestionItems] = React.useState(floatingSuggestionItems);
  const [isSuggestionsShown, setIsSuggestionsShown] = React.useState(isSuggestionsVisible || false);

  React.useEffect(() => {
    setSuggestionItems(floatingSuggestionItems);
  }, [floatingSuggestionItems]);

  const showPicker = (show: boolean) => {
    setFocusItemIndex(-1);
    setIsSuggestionsShown(show);
  };

  const selectNextSuggestion = (): void => {
    if (suggestionItems && suggestionItems.length > 0) {
      if (focusItemIndex === -1) {
        setFocusItemIndex(0);
      } else if (focusItemIndex < suggestionItems.length - 1) {
        setFocusItemIndex(focusItemIndex + 1);
      } else if (focusItemIndex === suggestionItems.length - 1) {
        setFocusItemIndex(0);
      }
    }
    if (suggestionItems.length > focusItemIndex + 1) {
      setFocusItemIndex(focusItemIndex + 1);
    }
  };

  const selectPreviousSuggestion = (): void => {
    if (suggestionItems && suggestionItems.length > 0) {
      if (focusItemIndex === -1) {
        setFocusItemIndex(suggestionItems.length - 1);
      } else if (focusItemIndex > 0) {
        setFocusItemIndex(focusItemIndex - 1);
      } else if (focusItemIndex === 0) {
        setFocusItemIndex(suggestionItems.length - 1);
      }
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

  return {
    focusItemIndex: focusItemIndex,
    setFocusItemIndex: setFocusItemIndex,
    suggestionItems: suggestionItems,
    setSuggestionItems: setSuggestionItems,
    isSuggestionsShown: isSuggestionsShown,
    showPicker: showPicker,
    selectNextSuggestion: selectNextSuggestion,
    selectPreviousSuggestion: selectPreviousSuggestion,
    getFocusedSuggestion: getFocusedSuggestion,
    hasSuggestionSelected: hasSuggestionSelected,
    removeSuggestion: removeSuggestion,
  };
};
