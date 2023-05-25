import type { ISuggestionModel } from './Suggestions.types';

/**
 * {@docCategory Pickers}
 */
export class SuggestionsController<T> {
  public currentIndex: number;
  public currentSuggestion: ISuggestionModel<T> | undefined;
  public suggestions: ISuggestionModel<T>[];

  constructor() {
    this.suggestions = [];
    this.currentIndex = -1;
  }

  public updateSuggestions(newSuggestions: T[], selectedIndex?: number, maxCount?: number): void {
    if (newSuggestions && newSuggestions.length > 0) {
      if (maxCount && newSuggestions.length > maxCount) {
        const startIndex = selectedIndex && selectedIndex > maxCount ? selectedIndex + 1 - maxCount : 0;
        newSuggestions = newSuggestions.slice(startIndex, startIndex + maxCount - 1);
      }
      this.suggestions = this.convertSuggestionsToSuggestionItems(newSuggestions);
      this.currentIndex = selectedIndex ? selectedIndex : 0;
      if (selectedIndex! === -1) {
        this.currentSuggestion = undefined;
      } else if (selectedIndex !== undefined) {
        this.suggestions[selectedIndex].selected = true;
        this.currentSuggestion = this.suggestions[selectedIndex];
      }
    } else {
      this.suggestions = [];
      this.currentIndex = -1;
      this.currentSuggestion = undefined;
    }
  }

  /**
   * Increments the suggestion index and gets the next suggestion in the list.
   */
  public nextSuggestion(): boolean {
    if (this.suggestions && this.suggestions.length) {
      if (this.currentIndex < this.suggestions.length - 1) {
        this.setSelectedSuggestion(this.currentIndex + 1);
        return true;
      } else if (this.currentIndex === this.suggestions.length - 1) {
        this.setSelectedSuggestion(0);
        return true;
      }
    }

    return false;
  }

  /**
   * Decrements the suggestion index and gets the previous suggestion in the list.
   */
  public previousSuggestion(): boolean {
    if (this.suggestions && this.suggestions.length) {
      if (this.currentIndex > 0) {
        this.setSelectedSuggestion(this.currentIndex - 1);
        return true;
      } else if (this.currentIndex === 0) {
        this.setSelectedSuggestion(this.suggestions.length - 1);
        return true;
      }
    }

    return false;
  }

  public getSuggestions(): ISuggestionModel<T>[] {
    return this.suggestions;
  }

  public getCurrentItem(): ISuggestionModel<T> {
    return this.currentSuggestion!;
  }

  public getSuggestionAtIndex(index: number): ISuggestionModel<T> {
    return this.suggestions[index];
  }

  public hasSelectedSuggestion(): boolean {
    return this.currentSuggestion ? true : false;
  }

  public removeSuggestion(index: number): void {
    this.suggestions.splice(index, 1);
  }

  public createGenericSuggestion(itemToConvert: ISuggestionModel<T> | T) {
    const itemToAdd = this.convertSuggestionsToSuggestionItems([itemToConvert])[0];
    this.currentSuggestion = itemToAdd;
  }

  public convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[] {
    return Array.isArray(suggestions) ? suggestions.map(this._ensureSuggestionModel) : [];
  }

  public deselectAllSuggestions(): void {
    if (this.currentIndex > -1) {
      this.suggestions[this.currentIndex].selected = false;
      this.currentIndex = -1;
    }
  }

  public setSelectedSuggestion(index: number): void {
    if (index > this.suggestions.length - 1 || index < 0) {
      this.currentIndex = 0;
      this.currentSuggestion!.selected = false;
      this.currentSuggestion = this.suggestions[0];
      this.currentSuggestion.selected = true;
    } else {
      if (this.currentIndex > -1) {
        this.suggestions[this.currentIndex].selected = false;
      }
      this.suggestions[index].selected = true;
      this.currentIndex = index;
      this.currentSuggestion = this.suggestions[index];
    }
  }

  private _isSuggestionModel = (value: ISuggestionModel<T> | T): value is ISuggestionModel<T> => {
    return (<ISuggestionModel<T>>value).item !== undefined;
  };

  private _ensureSuggestionModel = (suggestion: ISuggestionModel<T> | T): ISuggestionModel<T> => {
    if (this._isSuggestionModel(suggestion)) {
      return suggestion as ISuggestionModel<T>;
    } else {
      return {
        item: suggestion,
        selected: false,
        ariaLabel: (<any>suggestion).ariaLabel,
      } as ISuggestionModel<T>;
    }
  };
}
