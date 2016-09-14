import * as React from 'react';
import { Button, ButtonType } from '../../Button';
import { css } from '../../../utilities/css';
import { ISuggestionItemProps, ISuggestionProps } from './Suggestion.Props';
import { ISuggestionModel } from './SuggestionController';
import './Suggestion.scss';

export class SuggestionItem<T> extends React.Component<ISuggestionItemProps<T>, {}> {
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
        className={ css('ms-Suggestion-item', { 'is-suggested': suggestionModel.isSelected }, className ) }
        >
        <RenderSuggestion {...suggestionModel.item}/>
      </Button>
    );
  }
}

export class Suggestion<T> extends React.Component<ISuggestionProps<T>, {}> {
  public refs: {
    [key: string]: React.ReactInstance;
    searchForMoreButton: Button;
    selectedElement: HTMLDivElement;
  };
  private SuggestionItemOfProperType = SuggestionItem as new (props: ISuggestionItemProps<T>) => SuggestionItem<T>;

  constructor(suggestionProps) {
    super(suggestionProps);
    this._getMoreResults = this._getMoreResults.bind(this);
  }

  public render() {
    let { suggestionsHeaderText, searchForMoreText, className } = this.props;

    return (
      <div className={ css('ms-Suggestion', className ? className : '') }>
        { suggestionsHeaderText ?
          (<div className='ms-Suggestion-title'>
            { suggestionsHeaderText }
          </div>) : (null) }
        <div className='ms-Suggestion-container'>
          { this._renderSuggestions() }
        </div>
        { searchForMoreText ?
          (<Button
            onClick={ this._getMoreResults.bind(this) }
            className={ 'ms-SearchMore-button' }
            buttonType={ ButtonType.icon }
            icon={ 'Search' }
            ref='searchForMoreButton' >
            { searchForMoreText }
          </Button>) : (null)
        }
      </div>
    );
  }

  public focusSearchForMoreButton() {
    if (this.refs.searchForMoreButton) {
      this.refs.searchForMoreButton.focus();
    }
  }

  public scrollSelected() {
    if (this.refs.selectedElement) {
      this.refs.selectedElement.scrollIntoView(false);
    }
  }

  private _renderSuggestions(): JSX.Element[] {
    let { suggestions, onRenderSuggestion, noResultsFoundText } = this.props;

    if (!suggestions || !suggestions.length) {
      return [<div className='ms-Suggestion-none'> { noResultsFoundText ? noResultsFoundText : ' ' } </div>];
    }

    let suggestionItems: JSX.Element[] = [];
    let TypedSuggestionItem = this.SuggestionItemOfProperType;

    for (let index: number = 0; index <= suggestions.length - 1; index++) {
      let suggestionItem: ISuggestionModel<T> = suggestions[index];
      suggestionItems.push(
        <div ref={ suggestionItem.isSelected ? 'selectedElement' : '' }
          key={ index }
          id={ 'sug-' + index }>
          <TypedSuggestionItem
            suggestionModel={ suggestionItem }
            RenderSuggestion={ onRenderSuggestion }
            onClick={(ev: React.MouseEvent) => this.props.onSuggestionClick(ev, suggestionItem.item, index) }
            className={ this.props.suggestionItemClassName }
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