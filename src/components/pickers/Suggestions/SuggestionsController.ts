export interface ISuggestionModel<T> {
  item: T;
  isSelected: boolean;
}

export class SuggestionsController<T> {
  public currentIndex: number;
  public currentSuggestion: ISuggestionModel<T>;
  private suggestions: ISuggestionModel<T>[];
  constructor() {
    this.suggestions = [];
    this.currentIndex = -1;
  }

  public updateSuggestions(newSuggestions: T[]) {
    if (newSuggestions && newSuggestions.length > 0) {
      this.suggestions = this._convertSuggestionsToSuggestionItems(newSuggestions);
      this.currentIndex = 0;
      this.suggestions[0].isSelected = true;
      this.currentSuggestion = this.suggestions[0];
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
      if (this.currentIndex < (this.suggestions.length - 1)) {
        this._setSelectedSuggestion(this.currentIndex + 1);
        return true;
      } else if (this.currentIndex === (this.suggestions.length - 1)) {
        this._setSelectedSuggestion(0);
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
        this._setSelectedSuggestion(this.currentIndex - 1);
        return true;
      } else if (this.currentIndex === 0) {
        this._setSelectedSuggestion(this.suggestions.length - 1);
        return true;
      }
    }

    return false;
  }

  public getSuggestions(): ISuggestionModel<T>[] {
    return this.suggestions;
  }

  public getCurrentItem(): ISuggestionModel<T> {
    return this.currentSuggestion;
  }

  public getSuggestionAtIndex(index: number): ISuggestionModel<T> {
    return this.suggestions[index];
  }

  public hasSelectedSuggestion(): boolean {
    return this.currentSuggestion ? true : false;
  }

  private _convertSuggestionsToSuggestionItems(suggestions: any[]): ISuggestionModel<T>[] {
    let converted: ISuggestionModel<T>[] = [];
    suggestions.forEach((suggestion: any) => converted.push({ item: suggestion, isSelected: false }));
    return converted;
  }

  private _setSelectedSuggestion(index: number): void {
    if (index > this.suggestions.length - 1 || index < 0) {
      this.currentIndex = 0;
      this.currentSuggestion.isSelected = false;
      this.currentSuggestion = this.suggestions[0];
      this.currentSuggestion.isSelected = true;
    } else {
      if (this.currentIndex > -1) {
        this.suggestions[this.currentIndex].isSelected = false;
      }
      this.suggestions[index].isSelected = true;
      this.currentIndex = index;
      this.currentSuggestion = this.suggestions[index];
    }
  }
}