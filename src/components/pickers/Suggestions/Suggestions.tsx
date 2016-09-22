import * as React from 'react';
import { Button, ButtonType } from '../../Button';
import { css } from '../../../utilities/css';
import { ISuggestionItemProps, ISuggestionsProps } from './Suggestions.Props';
import { ISuggestionModel } from './SuggestionsController';
import { BaseComponent } from '../../../common/BaseComponent';
import './Suggestions.scss';

export class SuggestionsItem<T> extends React.Component<ISuggestionItemProps<T>, {}> {
  public render() {
    let {
      suggestionModel,
      RenderSuggestion,
      onClick,
      className
    } = this.props;
    return (
      <Button
        onClick={ onClick }
        className={ css('ms-Suggestions-item', { 'is-suggested': suggestionModel.isSelected }, className) }
        >
        <RenderSuggestion { ...suggestionModel.item }/>
      </Button>
    );
  }
}

export class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, {}> {

  protected _searchForMoreButton: Button;
  protected _selectedElement: HTMLDivElement;
  private SuggestionsItemOfProperType = SuggestionsItem as new (props: ISuggestionItemProps<T>) => SuggestionsItem<T>;

  constructor(suggestionsProps: ISuggestionsProps<T>) {
    super(suggestionsProps);
    this._getMoreResults = this._getMoreResults.bind(this);
  }

  public render() {
    let {
      suggestionsHeaderText,
      searchForMoreText,
      className,
      moreSuggestionsAvailable
    } = this.props;

    return (
      <div className={ css('ms-Suggestions', className ? className : '') }>
        { suggestionsHeaderText ?
          (<div className='ms-Suggestions-title'>
            { suggestionsHeaderText }
          </div>) : (null) }
        <div className='ms-Suggestions-container' id='suggestion-list' role='menu'>
          { this._renderSuggestions() }
        </div>
        { searchForMoreText && moreSuggestionsAvailable ?
          (<Button
            onClick={ this._getMoreResults.bind(this) }
            className={ 'ms-SearchMore-button' }
            buttonType={ ButtonType.icon }
            icon={ 'Search' }
            ref={ this._resolveRef('_searchForMoreButton') } >
            { searchForMoreText }
          </Button>) : (null)
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

  private _renderSuggestions(): JSX.Element[] {
    let {
      suggestions,
      onRenderSuggestion,
      noResultsFoundText,
      suggestionsItemClassName } = this.props;

    if (!suggestions || !suggestions.length) {
      return [<div className='ms-Suggestions-none'> { noResultsFoundText ? noResultsFoundText : ' ' } </div>];
    }

    let suggestionItems: JSX.Element[] = [];
    let TypedSuggestionsItem = this.SuggestionsItemOfProperType;

    for (let index: number = 0; index <= suggestions.length - 1; index++) {
      let suggestionItem: ISuggestionModel<T> = suggestions[index];
      suggestionItems.push(
        <div ref={ this._resolveRef(suggestionItem.isSelected ? '_selectedElement' : '') }
          key={ index }
          id={ 'sug-' + index }
          role='menuitem'>
          <TypedSuggestionsItem
            suggestionModel={ suggestionItem }
            RenderSuggestion={ onRenderSuggestion }
            onClick={ (ev: React.MouseEvent) => this.props.onSuggestionClick(ev, suggestionItem.item, index) }
            className={ suggestionsItemClassName }
            />
        </div>);
    }

    return suggestionItems;
  }

  private _getMoreResults() {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();
    }
  }

}