import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../../Utilities';
import { CommandButton } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { ISuggestionItemProps, ISuggestionsProps } from './Suggestions.Props';
import styles from './Suggestions.scss';

export class SuggestionsItem<T> extends React.Component<ISuggestionItemProps<T>, {}> {
  public render() {
    let {
      suggestionModel,
      RenderSuggestion,
      onClick,
      className,
      removeItem
    } = this.props;
    return (
      <div>
        <CommandButton
          onClick={ onClick }
          className={ css(
            'ms-Suggestions-item',
            styles.suggestionsItem,
            {
              ['is-suggested ' + styles.suggestionsItemIsSuggested]: suggestionModel.selected
            },
            className
          ) }
        >
          <RenderSuggestion { ...suggestionModel.item } />
        </CommandButton>
        <CommandButton
          onClick={ removeItem }
        >
          X
        </CommandButton>
      </div>
    );
  }
}

export class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, {}> {

  protected _searchForMoreButton: CommandButton;
  protected _selectedElement: HTMLDivElement;
  private SuggestionsItemOfProperType = SuggestionsItem as new (props: ISuggestionItemProps<T>) => SuggestionsItem<T>;

  constructor(suggestionsProps: ISuggestionsProps<T>) {
    super(suggestionsProps);
    this._getMoreResults = this._getMoreResults.bind(this);
  }

  public componentDidUpdate() {
    this.scrollSelected();
  }

  public render() {
    let {
      suggestionsHeaderText,
      searchForMoreText,
      className,
      moreSuggestionsAvailable,
      noResultsFoundText,
      suggestions,
      isLoading,
      loadingText,
      onRenderNoResultFound,
    } = this.props;

    let noResults: () => JSX.Element = () => {
      return noResultsFoundText ?
        <div className={ css('ms-Suggestions-none', styles.suggestionsNone) }>
          { noResultsFoundText }
        </div> : null;
    };

    return (
      <div className={ css(
        'ms-Suggestions',
        className ? className : '',
        styles.root) }>
        { suggestionsHeaderText ?
          (<div className={ css('ms-Suggestions-title', styles.suggestionsTitle) }>
            { suggestionsHeaderText }
          </div>) : (null) }
        { isLoading && (
          <Spinner
            className={ css('ms-Suggestions-spinner', styles.suggestionsSpinner) }
            label={ loadingText }
          />) }
        { (!suggestions || !suggestions.length) && !isLoading ?
          (onRenderNoResultFound ? onRenderNoResultFound(null, noResults) : noResults()) :
          this._renderSuggestions()
        }
        { searchForMoreText && moreSuggestionsAvailable ?
          (<CommandButton
            onClick={ this._getMoreResults.bind(this) }
            className={ css('ms-SearchMore-button', styles.searchMoreButton) }
            icon={ 'Search' }
            ref={ this._resolveRef('_searchForMoreButton') } >
            { searchForMoreText }
          </CommandButton>) : (null)
        }
      </div>
    );
  }

  public focusSearchForMoreButton() {
    if (this._searchForMoreButton) {
      this._searchForMoreButton.focus();
    }
  }

  // TODO get the element to scroll into view properly regardless of direction.
  public scrollSelected() {
    if (this._selectedElement) {
      this._selectedElement.scrollIntoView(false);
    }
  }

  private _renderSuggestions(): JSX.Element {
    let {
      suggestions,
      onRenderSuggestion,
      suggestionsItemClassName } = this.props;
    let TypedSuggestionsItem = this.SuggestionsItemOfProperType;

    return (
      <div
        className={ css('ms-Suggestions-container', styles.suggestionsContainer) }
        id='suggestion-list'
        role='menu'>
        { suggestions.map((suggestion, index) =>
          <div ref={ this._resolveRef(suggestion.selected ? '_selectedElement' : '') }
            key={ index }
            id={ 'sug-' + index }
            role='menuitem'>
            <TypedSuggestionsItem
              suggestionModel={ suggestion }
              RenderSuggestion={ onRenderSuggestion }
              onClick={ (ev: React.MouseEvent<HTMLElement>) => this.props.onSuggestionClick(ev, suggestion.item, index) }
              className={ suggestionsItemClassName }
              removeItem={ (ev: React.MouseEvent<HTMLElement>) => this.props.onSuggestionRemove(ev, suggestion.item, index) }
            />
          </div>) }
      </div>);
  }

  private _getMoreResults() {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();
    }
  }

}