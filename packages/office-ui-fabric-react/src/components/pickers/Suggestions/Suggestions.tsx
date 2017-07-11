import * as React from 'react';
import {
  BaseComponent,
  css,
  assign
} from '../../../Utilities';
import { CommandButton, IconButton, IButton } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { ISuggestionItemProps, ISuggestionsProps } from './Suggestions.Props';
import * as stylesImport from './Suggestions.scss';
const styles: any = stylesImport;

export class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
  public render() {
    let {
      suggestionModel,
      RenderSuggestion,
      onClick,
      className,
      onRemoveItem,
      showRemoveButton,
      id
    } = this.props;
    let itemProps = assign({}, suggestionModel.item, { onRemoveItem });
    return (
      <div
        className={ css(
          'ms-Suggestions-item',
          styles.suggestionsItem,
          {
            ['is-suggested ' + styles.suggestionsItemIsSuggested]: suggestionModel.selected
          },
          className
        ) }
      >
        <CommandButton
          onClick={ onClick }
          className={ css('ms-Suggestions-itemButton', styles.itemButton) }
        >
          { RenderSuggestion(suggestionModel.item, this.props) }
        </CommandButton>
        { this.props.showRemoveButton ? (
          <IconButton
            iconProps={ { iconName: 'Cancel' } }
            title='Remove'
            ariaLabel='Remove'
            onClick={ onRemoveItem }
            className={ css('ms-Suggestions-closeButton', styles.closeButton) }
          />) : (null)
        }
      </div>
    );
  }
}

export class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, {}> {

  protected _searchForMoreButton: IButton;
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
      mostRecentlyUsedHeaderText,
      searchForMoreText,
      className,
      moreSuggestionsAvailable,
      noResultsFoundText,
      suggestions,
      isLoading,
      isSearching,
      loadingText,
      onRenderNoResultFound,
      searchingText,
      isMostRecentlyUsedVisible,
      resultsMaximumNumber,
      resultsFooterFull,
      resultsFooter,
      isResultsFooterVisible,
      showRemoveButtons,
    } = this.props;

    let noResults: () => JSX.Element = () => {
      return noResultsFoundText ?
        <div className={ css('ms-Suggestions-none', styles.suggestionsNone) }>
          { noResultsFoundText }
        </div> : null;
    };

    let headerText = isMostRecentlyUsedVisible && mostRecentlyUsedHeaderText ? mostRecentlyUsedHeaderText : null;
    let footerTitle = (suggestions.length >= resultsMaximumNumber) ? resultsFooterFull : resultsFooter;
    return (
      <div className={ css(
        'ms-Suggestions',
        className ? className : '',
        styles.root) }>
        { headerText ?
          (<div className={ css('ms-Suggestions-title', styles.suggestionsTitle) }>
            { headerText }
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
        { searchForMoreText && moreSuggestionsAvailable && (
          <CommandButton
            componentRef={ this._resolveRef('_searchForMoreButton') }
            className={ css('ms-SearchMore-button', styles.searchMoreButton) }
            iconProps={ { iconName: 'Search' } }
            onClick={ this._getMoreResults.bind(this) }
          >
            { searchForMoreText }
          </CommandButton>
        ) }
        { isSearching ?
          (<Spinner
            className={ css('ms-Suggestions-spinner', styles.suggestionsSpinner) }
            label={ searchingText }
          />) : (null)
        }
        {
          !moreSuggestionsAvailable && !isMostRecentlyUsedVisible && !isSearching ?
            (<div className={ css('ms-Suggestions-title', styles.suggestionsTitle) }>
              { footerTitle(this.props) }
            </div>) : (null)
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
      suggestionsItemClassName,
      resultsMaximumNumber,
      showRemoveButtons } = this.props;
    let TypedSuggestionsItem = this.SuggestionsItemOfProperType;

    if (resultsMaximumNumber) {
      suggestions = suggestions.slice(0, resultsMaximumNumber);
    }

    return (
      <div
        className={ css('ms-Suggestions-container', styles.suggestionsContainer) }
        id='suggestion-list'
        role='menu'>
        { suggestions.map((suggestion, index) =>
          <div ref={ this._resolveRef(suggestion.selected ? '_selectedElement' : '') }
            // tslint:disable-next-line:no-string-literal
            key={ (suggestion.item as any)['key'] ? (suggestion.item as any)['key'] : index }
            id={ 'sug-' + index }
            role='menuitem'>
            <TypedSuggestionsItem
              id={ 'sug-item' + index }
              suggestionModel={ suggestion }
              RenderSuggestion={ onRenderSuggestion }
              onClick={ (ev: React.MouseEvent<HTMLElement>) => { this.props.onSuggestionClick(ev, suggestion.item, index); } }
              className={ suggestionsItemClassName }
              showRemoveButton={ showRemoveButtons }
              onRemoveItem={ (ev: React.MouseEvent<HTMLElement>) => {
                this.props.onSuggestionRemove(ev, suggestion.item, index);
                ev.stopPropagation();
              }
              }
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