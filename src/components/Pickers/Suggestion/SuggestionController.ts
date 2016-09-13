export interface ISuggestionModel {
  item: any;
  isSelected: boolean;
}

export class SuggestionController {
  public currentIndex: number;
  public currentSuggestion: ISuggestionModel;
  private suggestions: ISuggestionModel[];
  constructor() {
      this.suggestions = [];
      this.currentIndex = -1;
  }

  public updateSuggestions(newSuggestions: any[]) {
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

  public getSuggestions(): ISuggestionModel[] {
    return this.suggestions;
  }

  public getCurrentItem(): ISuggestionModel {
    return this.currentSuggestion;
  }

  public getSuggestionAtIndex(index: number): ISuggestionModel {
    return this.suggestions[index];
  }

  public hasSelectedSuggestion(): boolean {
    return this.currentSuggestion ? true : false;
  }

  private _convertSuggestionsToSuggestionItems(suggestions: any[]): ISuggestionModel[] {
    let converted: ISuggestionModel[] = [];
    suggestions.forEach((suggestion: any) => converted.push({ item: suggestion, isSelected: false }));
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