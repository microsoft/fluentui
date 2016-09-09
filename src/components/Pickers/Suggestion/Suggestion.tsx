import * as React from 'react';
import { Button, ButtonType } from '../../Button';
import { css } from '../../../utilities/css';
import { ISuggestionItemProps, ISuggestionProps } from './Suggestion.Props';
import './Suggestion.scss';

export class SuggestionItem<T> extends React.Component<ISuggestionItemProps<T>, {}> {
  public render() {
    let {
      suggestion,
      RenderSuggestion,
      onClick
    } = this.props;
    return (
      <Button
        onClick={ onClick }
        className={ css('ms-Suggestions-Item', { 'is-suggested': suggestion.isSelected }) }
        >
        <RenderSuggestion {...suggestion.item}/>
      </Button>
    );
  }
}

export class Suggestion<T> extends React.Component<ISuggestionProps<T>, {}> {

  public static defaultProps = {
    searchForMoreText: 'Search For More',
    canSearchForMore: false
  };

  public refs: {
    [key: string]: React.ReactInstance;
    searchForMoreButton: Button;
    selectedElement: HTMLDivElement;
  };

  private SuggestionOfProperType = SuggestionItem as new (props: ISuggestionItemProps<T>) => SuggestionItem<T>;

  constructor(suggestionProps) {
    super(suggestionProps);
    this._getMoreResults = this._getMoreResults.bind(this);
  }

  public render() {
    let { suggestionsHeaderText, searchForMoreText, className } = this.props;

    return (
      <div className={ css('ms-Suggestions', className ? className : '') }>
        { suggestionsHeaderText ?
          (<div className='ms-Suggestions-Title'>
            { suggestionsHeaderText }
          </div>) : (null) }
        <div className='ms-Suggestion-Container'>
          { this._renderSuggestions() }
        </div>
        { searchForMoreText ?
          (<Button
            onClick={ this._getMoreResults.bind(this) }
            className={ 'ms-SearchMore-Button' }
            buttonType={ ButtonType.icon }
            icon={ 'search' }
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
    let { suggestions, onRenderSuggestion } = this.props;

    if (!suggestions.length) {
      return [<div className='ms-Suggestions-None'> None </div>];
    }

    let suggestionItems: JSX.Element[] = [];
    let TypedSuggestion = this.SuggestionOfProperType;

    for (let index: number = 0; index <= suggestions.length - 1; index++) {
      suggestionItems.push(
        <div ref={ suggestions[index].isSelected ? 'selectedElement' : '' }
          key={index}>
          <TypedSuggestion
            suggestion={suggestions[index]}
            RenderSuggestion={ onRenderSuggestion }
            onClick={(ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
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