import * as React from 'react';
import { ISuggestionsHeaderFooterProps } from 'office-ui-fabric-react';

export interface IUseFloatingSuggestionItems<T> {
  focusItemIndex: number;
  setFocusItemIndex: React.Dispatch<React.SetStateAction<number>>;
  suggestionItems: T[];
  setSuggestionItems: React.Dispatch<React.SetStateAction<T[]>>;
  footerItemIndex: number;
  setfooterItemIndex: React.Dispatch<React.SetStateAction<number>>;
  footerItems: ISuggestionsHeaderFooterProps[];
  setFooterItems: React.Dispatch<React.SetStateAction<ISuggestionsHeaderFooterProps[]>>;
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
  focusFooterIndex?: number,
  footerSuggestionItems?: ISuggestionsHeaderFooterProps[],
  isSuggestionsVisible?: boolean,
) => {
  const [focusItemIndex, setFocusItemIndex] = React.useState(focusSuggestionIndex || -1);
  const [suggestionItems, setSuggestionItems] = React.useState(floatingSuggestionItems);

  const [footerItemIndex, setFooterItemIndex] = React.useState(focusFooterIndex || -1);
  const [footerItems, setFooterItems] = React.useState(footerSuggestionItems);

  const [isSuggestionsShown, setIsSuggestionsShown] = React.useState(isSuggestionsVisible || false);

  React.useEffect(() => {
    setSuggestionItems(floatingSuggestionItems);
  }, [floatingSuggestionItems]);

  const footerItemsHaveExecute = (): boolean => {
    let haveExecute = false;
    footerItems!.forEach(item => {
      if (item.onExecute !== undefined) {
        haveExecute = true;
      }
    });
    return haveExecute;
  };

  const hasSelectableFooters = footerItems ? footerItemsHaveExecute() : false;

  const selectNextSelectableFooter = () => {
    if (!footerItems) {
      return;
    }
    let nextIndex = -1;
    let i = footerItemIndex + 1;
    while (i < footerItems.length) {
      if (footerItems[i].onExecute && footerItems[i].shouldShow()) {
        nextIndex = i;
        i = footerItems.length;
      }
      i++;
    }
    if (nextIndex === -1) {
      setFooterItemIndex(-1);
      setFocusItemIndex(0);
    } else {
      setFooterItemIndex(nextIndex);
    }
  };

  const selectPreviousSelectableFooter = () => {
    if (!footerItems) {
      return;
    }
    let nextIndex = -1;
    let i = footerItemIndex != -1 ? footerItemIndex - 1 : footerItems.length - 1;
    while (i > -1) {
      if (footerItems[i].onExecute && footerItems[i].shouldShow()) {
        nextIndex = i;
        i = -1;
      }
      i--;
    }
    if (nextIndex === -1) {
      setFooterItemIndex(-1);
      setFocusItemIndex(suggestionItems.length - 1);
    } else {
      setFooterItemIndex(nextIndex);
    }
  };

  const showPicker = (show: boolean) => {
    setFocusItemIndex(-1);
    setFooterItemIndex(-1);
    setIsSuggestionsShown(show);
  };

  const selectNextSuggestion = (): void => {
    if (suggestionItems && suggestionItems.length > 0 && footerItemIndex == -1) {
      if (focusItemIndex === -1) {
        setFocusItemIndex(0);
      } else if (focusItemIndex < suggestionItems.length - 1) {
        setFocusItemIndex(focusItemIndex + 1);
      } else if (focusItemIndex === suggestionItems.length - 1) {
        if (hasSelectableFooters) {
          setFocusItemIndex(-1);
          selectNextSelectableFooter();
        } else {
          setFocusItemIndex(0);
        }
      }
    } else if (footerItemIndex > -1) {
      selectNextSelectableFooter();
    }
  };

  const selectPreviousSuggestion = (): void => {
    if (footerItemIndex > -1) {
      if (footerItemIndex == 0) {
        setFooterItemIndex(-1);
        if (suggestionItems && suggestionItems.length > 0) {
          setFocusItemIndex(suggestionItems.length - 1);
        }
      } else {
        selectPreviousSelectableFooter();
      }
    } else if (suggestionItems && suggestionItems.length > 0) {
      if (focusItemIndex === -1) {
        if (hasSelectableFooters) {
          selectPreviousSelectableFooter();
        } else {
          setFocusItemIndex(suggestionItems.length - 1);
        }
      } else if (focusItemIndex > 0) {
        setFocusItemIndex(focusItemIndex - 1);
      } else if (focusItemIndex === 0) {
        if (hasSelectableFooters) {
          selectPreviousSelectableFooter();
          setFocusItemIndex(-1);
        } else {
          setFocusItemIndex(suggestionItems.length - 1);
        }
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
    footerItemIndex: footerItemIndex,
    setFooterItemIndex: setFooterItemIndex,
    footerItems: footerItems,
    setFooterItems: setFooterItems,
    isSuggestionsShown: isSuggestionsShown,
    showPicker: showPicker,
    selectNextSuggestion: selectNextSuggestion,
    selectPreviousSuggestion: selectPreviousSuggestion,
    getFocusedSuggestion: getFocusedSuggestion,
    hasSuggestionSelected: hasSuggestionSelected,
    removeSuggestion: removeSuggestion,
  };
};
