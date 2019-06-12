export type IBaseExampleType = {
  text?: string;
  name?: string;
};

export class ExampleSuggestionsModel<T extends IBaseExampleType> {
  private suggestionsData: T[];

  public constructor(data: T[]) {
    this.suggestionsData = [...data];
  }

  public resolveSuggestions = (filterText: string, currentItems?: T[]): Promise<T[]> => {
    let filteredItems: T[] = [];
    if (filterText) {
      filteredItems = this._filterItemsByText(filterText);
      filteredItems = this._removeDuplicates(filteredItems, currentItems || []);
    }

    return this._convertResultsToPromise(filteredItems);
  };

  public removeSuggestion(item: T) {
    const index = this.suggestionsData.indexOf(item);
    console.log('removing', item, 'at', index);
    if (index !== -1) {
      this.suggestionsData.splice(index, 1);
    }
  }

  private _filterItemsByText(filterText: string): T[] {
    return this.suggestionsData.filter((item: T) => {
      const itemText = item.text || item.name;
      return itemText ? this._doesTextStartWith(itemText, filterText) : false;
    });
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _removeDuplicates(items: T[], possibleDupes: T[]): T[] {
    return items.filter((item: T) => !this._listContainsItem(item, possibleDupes));
  }

  private _listContainsItem(item: T, Items: T[]): boolean {
    if (!Items || !Items.length || Items.length === 0) {
      return false;
    }
    return Items.filter((i: T) => (i.text || i.name) === (item.text || item.name)).length > 0;
  }

  private _convertResultsToPromise(results: T[]): Promise<T[]> {
    return new Promise<T[]>(resolve => setTimeout(() => resolve(results), 150));
  }
}
