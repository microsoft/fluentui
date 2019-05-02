import { autobind } from '../../../Utilities';
import { ISuggestionModel } from '../../../Pickers';

export class SuggestionsStore<T> {
  public suggestions: ISuggestionModel<T>[];
  private getAriaLabel?: (item: T) => string;

  constructor(getAriaLabel?: (item: T) => string) {
    this.suggestions = [];
    this.getAriaLabel = getAriaLabel;
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

  @autobind
  private _isSuggestionModel(value: ISuggestionModel<T> | T): value is ISuggestionModel<T> {
    return (<ISuggestionModel<T>>value).item !== undefined;
  }

  @autobind
  private _ensureSuggestionModel(suggestion: ISuggestionModel<T> | T): ISuggestionModel<T> {
    if (this._isSuggestionModel(suggestion)) {
      return suggestion;
    } else {
      return {
        item: suggestion,
        selected: false,
        // tslint:disable-next-line:no-any
        ariaLabel: this.getAriaLabel !== undefined ? this.getAriaLabel() : (<any>suggestion).name || (<any>suggestion).primaryText
      };
    }
  }
}
