import * as React from 'react';
import { Button, ButtonType } from '../../Button';
import { css } from '../../utilities/css';
import { ISuggestionItem } from './Suggestions';
import './SuggestionElement.scss'

export interface ISuggestionElementProps<T> extends React.Props<any> {
  onRenderSuggestion: (props: any, index: number) => JSX.Element;
  onSuggestionClick: (ev: React.MouseEvent, index: number) => void;
  suggestions: ISuggestionItem<T>[];
  suggestionsHeaderText?: string;
  searchForMoreText?: string;
  onGetMoreResults?: () => void;
  className?: string;
}


export class SuggestionElement<T> extends React.Component<ISuggestionElementProps<T>, {}> {

  static defaultProps = {
    searchForMoreText: 'Search For More',
    canSearchForMore: false
  };

  public refs: {
    [key: string]: React.ReactInstance;
    searchForMoreButton: Button;
    selectedElement: HTMLDivElement;
  };

  constructor(props) {
    super(props);
    let displayAll: boolean = props.suggestionLimit ? false : true;
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
      this.refs.selectedElement.scrollIntoView();
    }
  }

  private _renderSuggestions(): JSX.Element[] {
    let { suggestions, searchForMoreText } = this.props;
    if (!suggestions.length) {
      return [<div className='ms-Suggestions-None'> None </div>];
    }
    let suggestionItems: JSX.Element[] = [];
    for (let index: number = 0; index <= suggestions.length - 1; index++) {
      suggestionItems.push(
        <div ref={ suggestions[index].isSelected ? 'selectedElement' : '' }
          key={index}>
          <Button
            key={index}
            onClick={ (ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
            className={ css('ms-Suggestions-Item', { 'is-suggested': suggestions[index].isSelected }) }
            >
            { this.props.onRenderSuggestion(suggestions[index].item, index) }
          </Button>
        </div>
      );
    }
    return suggestionItems;
  }

  private _getMoreResults() {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();
    }
  }

}
