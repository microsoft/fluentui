import type { ISuggestionModel, ITag } from '../../../Pickers';
import type { IPersonaProps } from '../../../Persona';

export type SuggestionsStoreOptions<T> = {
  getAriaLabel?: (item: T) => string;
};

export class SuggestionsStore<T> {
  public suggestions: ISuggestionModel<T>[];
  private getAriaLabel?: (item: T) => string;

  constructor(options?: SuggestionsStoreOptions<T>) {
    this.suggestions = [];
    this.getAriaLabel = options && options.getAriaLabel;
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
      return suggestion;
    } else {
      return {
        item: suggestion,
        selected: false,
        ariaLabel:
          this.getAriaLabel !== undefined
            ? this.getAriaLabel(suggestion)
            : (suggestion as any as ITag).name ||
              (<IPersonaProps>suggestion).text ||
              // eslint-disable-next-line deprecation/deprecation
              (<IPersonaProps>suggestion).primaryText,
      };
    }
  };
}
