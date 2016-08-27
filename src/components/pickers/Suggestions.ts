export interface ISuggestionItem<T> {
  item: T;
  isSelected: boolean;
}

export class Suggestions<T> {
  public currentIndex: number;
  public currentSuggestion: ISuggestionItem<T>;
  private suggestions: ISuggestionItem<T>[];
  constructor(suggestions: T[]) {
    this.suggestions = this._convertSuggestionsToSuggestionItems(suggestions);
  }

  public updateSuggestions(newSuggestions: T[]) {
    this.suggestions = this._convertSuggestionsToSuggestionItems(newSuggestions);
    this.currentIndex = -1;
    this.currentSuggestion = undefined;
  }

  public nextSuggestion(): boolean {
    if (this.currentIndex < (this.suggestions.length - 1)) {
      this.setSelectedSuggestion(this.currentIndex + 1);
      return true;
    }
  }

  public previousSuggestion(): boolean {
    if (this.currentIndex > 0) {
      this.setSelectedSuggestion(this.currentIndex - 1);
      return true;
    }
  }

  public getSuggestions(): ISuggestionItem<T>[] {
    return this.suggestions;
  }

  public getCurrentItem(): ISuggestionItem<T> {
    return this.currentSuggestion;
  }

  public getSuggestionAtIndex(index: number): ISuggestionItem<T> {
    return this.suggestions[index];
  }

  public hasSelectedSuggestion(): boolean {
    return this.currentSuggestion ? true : false;
  }

  private _convertSuggestionsToSuggestionItems(suggestions: T[]): ISuggestionItem<T>[] {
    let converted: ISuggestionItem<T>[] = [];
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