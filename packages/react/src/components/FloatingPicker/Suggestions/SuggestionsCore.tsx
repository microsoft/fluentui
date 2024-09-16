import * as React from 'react';
import { initializeComponentRef, css } from '../../../Utilities';
import { SuggestionsItem } from '../../../Pickers';
import * as stylesImport from './SuggestionsCore.scss';
import type { ISuggestionItemProps, ISuggestionModel } from '../../../Pickers';
import type { ISuggestionsCoreProps } from './Suggestions.types';

const styles: any = stylesImport;

/**
 * Class when used with SuggestionsStore, renders a basic suggestions control
 */
export class SuggestionsCore<T extends {}> extends React.Component<ISuggestionsCoreProps<T>, {}> {
  public currentIndex: number;
  public currentSuggestion: ISuggestionModel<T> | undefined;
  protected _selectedElement = React.createRef<HTMLDivElement>();
  private SuggestionsItemOfProperType: new (props: ISuggestionItemProps<T>) => SuggestionsItem<T> = SuggestionsItem;

  constructor(suggestionsProps: ISuggestionsCoreProps<T>) {
    super(suggestionsProps);

    initializeComponentRef(this);
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
    return this._selectedElement.current || undefined;
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
      suggestionsContainerAriaLabel,
    } = this.props;
    const TypedSuggestionsItem = this.SuggestionsItemOfProperType;
    let { suggestions } = this.props;

    if (resultsMaximumNumber) {
      suggestions = suggestions.slice(0, resultsMaximumNumber);
    }

    return (
      <div
        className={css('ms-Suggestions-container', styles.suggestionsContainer)}
        id="suggestion-list"
        role="listbox"
        aria-label={suggestionsContainerAriaLabel}
      >
        {suggestions.map((suggestion: ISuggestionModel<T>, index: number) => (
          <div
            ref={suggestion.selected || index === this.currentIndex ? this._selectedElement : undefined}
            key={(suggestion.item as any).key ? (suggestion.item as any).key : index}
            id={'sug-' + index}
          >
            <TypedSuggestionsItem
              id={'sug-item' + index}
              suggestionModel={suggestion}
              RenderSuggestion={onRenderSuggestion as any}
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
    if (this._selectedElement.current?.scrollIntoView !== undefined) {
      this._selectedElement.current.scrollIntoView(false);
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
