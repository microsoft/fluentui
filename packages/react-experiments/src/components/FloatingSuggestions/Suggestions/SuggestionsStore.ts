import type { ISuggestionModel } from '@fluentui/react/lib/Pickers';

export class SuggestionsStore<T> {
  public suggestions: ISuggestionModel<T>[];

  constructor() {
    this.suggestions = [];
  }

  public updateSuggestions(newSuggestions: T[]): void {
    if (newSuggestions && newSuggestions.length > 0) {
      this.suggestions = this.convertSuggestionsToSuggestionItems(newSuggestions);
    } else {
      this.suggestions = [];
    }
  }

  public getSuggestions(): ISuggestionModel<T>[] {
    return this.suggestions;
  }

  public getSuggestionAtIndex(index: number): ISuggestionModel<T> {
    return this.suggestions[index];
  }

  public removeSuggestion(index: number): void {
    this.suggestions.splice(index, 1);
  }

  public convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[] {
    return Array.isArray(suggestions) ? suggestions.map(this._ensureSuggestionModel) : [];
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
        ariaLabel: (<any>suggestion).name || (<any>suggestion).primaryText,
      } as ISuggestionModel<T>;
    }
  };
}
