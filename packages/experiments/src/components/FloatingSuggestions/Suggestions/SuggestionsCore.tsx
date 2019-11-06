import * as React from 'react';
import { BaseComponent, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISuggestionModel } from 'office-ui-fabric-react/lib/Pickers';
import { SuggestionsItem } from './SuggestionsItem';
import { ISuggestionsCoreProps } from './Suggestions.types';
import * as stylesImport from './SuggestionsCore.scss';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

/**
 * true if the input is an object with a 'key' property that is a number or a string
 * (e.g. is a valid react key).
 */
function hasKey<T>(i: T): i is T & { key: string | number } {
  if (!(i instanceof Object) || !(i as Object).hasOwnProperty('key')) {
    return false;
  }
  const keyType = typeof (i as T & { key: any }).key;
  return keyType === 'string' || keyType === 'number';
}

/**
 * Class when used with SuggestionsStore, renders a basic suggestions control
 */
export class SuggestionsCore<T> extends BaseComponent<ISuggestionsCoreProps<T>, {}> {
  public currentIndex: number;
  public currentSuggestion: ISuggestionModel<T> | undefined;
  protected _selectedElement: HTMLDivElement;

  constructor(suggestionsProps: ISuggestionsCoreProps<T>) {
    super(suggestionsProps);
    this.currentIndex = -1;
  }

  /**
   * Increments the selected suggestion index
   */
  public nextSuggestion(): boolean {
    const { suggestions } = this.props;

    if (suggestions && suggestions.length > 0) {
      if (this.currentIndex === -1) {
        this.setSelectedSuggestion(0);
        return true;
      } else if (this.currentIndex < suggestions.length - 1) {
        this.setSelectedSuggestion(this.currentIndex + 1);
        return true;
      } else if (this.props.shouldLoopSelection && this.currentIndex === suggestions.length - 1) {
        this.setSelectedSuggestion(0);
        return true;
      }
    }

    return false;
  }

  /**
   * Decrements the selected suggestion index
   */
  public previousSuggestion(): boolean {
    const { suggestions } = this.props;

    if (suggestions && suggestions.length > 0) {
      if (this.currentIndex === -1) {
        this.setSelectedSuggestion(suggestions.length - 1);
        return true;
      } else if (this.currentIndex > 0) {
        this.setSelectedSuggestion(this.currentIndex - 1);
        return true;
      } else if (this.props.shouldLoopSelection && this.currentIndex === 0) {
        this.setSelectedSuggestion(suggestions.length - 1);
        return true;
      }
    }

    return false;
  }

  public get selectedElement(): HTMLDivElement | undefined {
    return this._selectedElement;
  }

  public getCurrentItem(): ISuggestionModel<T> {
    return this.props.suggestions[this.currentIndex];
  }

  public getSuggestionAtIndex(index: number): ISuggestionModel<T> {
    return this.props.suggestions[index];
  }

  public hasSuggestionSelected(): boolean {
    return this.currentIndex !== -1 && this.currentIndex < this.props.suggestions.length;
  }

  public removeSuggestion(index: number): void {
    this.props.suggestions.splice(index, 1);
  }

  public deselectAllSuggestions(): void {
    if (this.currentIndex > -1 && this.props.suggestions[this.currentIndex]) {
      this.props.suggestions[this.currentIndex].selected = false;
      this.currentIndex = -1;
      this.forceUpdate();
    }
  }

  public setSelectedSuggestion(index: number): void {
    const { suggestions } = this.props;

    if (index > suggestions.length - 1 || index < 0) {
      this.currentIndex = 0;
      this.currentSuggestion!.selected = false;
      this.currentSuggestion = suggestions[0];
      this.currentSuggestion.selected = true;
    } else {
      if (this.currentIndex > -1 && suggestions[this.currentIndex]) {
        suggestions[this.currentIndex].selected = false;
      }
      suggestions[index].selected = true;
      this.currentIndex = index;
      this.currentSuggestion = suggestions[index];
    }

    this.forceUpdate();
  }

  public componentDidUpdate(): void {
    this.scrollSelected();
  }

  public render(): JSX.Element {
    const {
      onRenderSuggestion,
      suggestionsItemClassName,
      resultsMaximumNumber,
      showRemoveButtons,
      suggestionsContainerAriaLabel
    } = this.props;
    let { suggestions } = this.props;

    if (resultsMaximumNumber) {
      suggestions = suggestions.slice(0, resultsMaximumNumber);
    }

    return (
      <div
        className={css('ms-Suggestions-container', styles.suggestionsContainer)}
        id="suggestion-list"
        role="list"
        aria-label={suggestionsContainerAriaLabel}
      >
        {suggestions.map((suggestion: ISuggestionModel<T>, index: number) => (
          <div
            ref={this._resolveRef(suggestion.selected || index === this.currentIndex ? '_selectedElement' : '')}
            key={hasKey(suggestion.item) ? suggestion.item.key : index}
            id={'sug-' + index}
            role="listitem"
            aria-label={suggestion.ariaLabel}
          >
            <SuggestionsItem
              id={'sug-item' + index}
              suggestionModel={suggestion}
              onRenderSuggestion={onRenderSuggestion}
              onClick={this._onClickTypedSuggestionsItem(suggestion.item, index)}
              className={suggestionsItemClassName}
              showRemoveButton={showRemoveButtons}
              onRemoveItem={this._onRemoveTypedSuggestionsItem(suggestion.item, index)}
              isSelectedOverride={index === this.currentIndex}
            />
          </div>
        ))}
      </div>
    );
  }

  // TODO get the element to scroll into view properly regardless of direction.
  public scrollSelected(): void {
    if (this._selectedElement && this._selectedElement.scrollIntoView !== undefined) {
      this._selectedElement.scrollIntoView(false);
    }
  }

  private _onClickTypedSuggestionsItem = (item: T, index: number): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      this.props.onSuggestionClick(ev, item, index);
    };
  };

  private _onRemoveTypedSuggestionsItem = (item: T, index: number): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      const onSuggestionRemove = this.props.onSuggestionRemove!;
      onSuggestionRemove(ev, item, index);
      ev.stopPropagation();
    };
  };
}
