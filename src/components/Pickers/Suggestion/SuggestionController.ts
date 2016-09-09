export interface ISuggestionModel<T> {
  item: T;
  isSelected: boolean;
}

export class SuggestionController<T> {
  public currentIndex: number;
  public currentSuggestion: ISuggestionModel<T>;
  private suggestions: ISuggestionModel<T>[];
  constructor(suggestions: T[]) {
    if (suggestions && suggestions.length > 0) {
      this.suggestions = this._convertSuggestionsToSuggestionItems(suggestions);
      this.currentIndex = 0;
      this.suggestions[0].isSelected = true;
      this.currentSuggestion = this.suggestions[0];
    }
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

  public nextSuggestion(): boolean {
    if (this.currentIndex < (this.suggestions.length - 1)) {
      this.setSelectedSuggestion(this.currentIndex + 1);
      return true;
    } else if (this.currentIndex === (this.suggestions.length - 1)) {
      this.setSelectedSuggestion(0);
      return true;
    }
  }

  public previousSuggestion(): boolean {
    if (this.currentIndex > 0) {
      this.setSelectedSuggestion(this.currentIndex - 1);
      return true;
    } else if (this.currentIndex === 0) {
      this.setSelectedSuggestion(this.suggestions.length - 1);
      return true;
    }
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

  private _convertSuggestionsToSuggestionItems(suggestions: T[]): ISuggestionModel<T>[] {
    let converted: ISuggestionModel<T>[] = [];
    suggestions.forEach((suggestion: T) => converted.push({ item: suggestion, isSelected: false }));
    return converted;
  }

  private setSelectedSuggestion(index: number): void {
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