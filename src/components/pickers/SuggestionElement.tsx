import * as React from 'react';
import { Button, ButtonType } from '../../Button';
import { css } from '../../utilities/css';
import { ISuggestionItem } from './Suggestions';
import './SuggestionElement.scss'

export interface ISuggestionElementProps<T> extends React.Props<any> {
  onRenderSuggestion: (props: any, index: number) => JSX.Element;
  onSuggestionClick: (ev: React.MouseEvent, index: number) => void;
  suggestions: ISuggestionItem<T>[];
  headerText?: string;
  suggestionLimit?: number;
  searchForMoreText?: string;
  onGetMoreResults?: () => void;
}

export interface ISuggestionElementState {
  displayAll?: boolean;
}

export class SuggestionElement<T> extends React.Component<ISuggestionElementProps<T>, ISuggestionElementState> {

  static defaultProps = {
    searchForMoreText: 'Search For More'
  };

  constructor(props) {
    super(props);
    let displayAll: boolean = props.suggestionLimit ? false : true;
    this.state = { displayAll: displayAll };
    this._getMoreResults = this._getMoreResults.bind(this);
  }

  public render() {
    let { headerText, searchForMoreText } = this.props;
    let { displayAll } = this.state;

    return (
      <div className='ms-Suggestions'>
        { headerText ?
          (<div className='ms-Suggestions-title'>
            { `Suggestions for "${headerText}"` }
          </div>) : (null) }
        <div>
          { this._renderSuggestions() }
        </div>
        { searchForMoreText && !displayAll ?
          (<Button
            onClick={ this._getMoreResults.bind(this) }
            className={ 'ms-SearchMore-Button' }
            buttonType={ ButtonType.icon }
            icon={ 'search' }>
            { searchForMoreText }
          </Button>) : (null)
        }
      </div>
    );
  }

  private _renderSuggestions(): JSX.Element[] {
    let { suggestions, suggestionLimit, searchForMoreText } = this.props;
    if (!suggestions.length) {
      return [<div className='ms-Suggestions-none'> None </div>];
    }
    let suggestionItems: JSX.Element[] = [];
    let limit: number = this.state.displayAll || (suggestionLimit && suggestionLimit > suggestions.length) ? suggestions.length : suggestionLimit;
    for (let index: number = 0; index <= limit - 1; index++) {
      suggestionItems.push(<div key={ index }>
        <Button
          onClick={ (ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
          className={ css('ms-Suggestions-item', { 'is-suggested': suggestions[index].isSelected }) }
          >
          { this.props.onRenderSuggestion(suggestions[index].item, index) }
        </Button>
      </div >);
    }
    return suggestionItems;
  }

  private _getMoreResults() {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();
    }
    this.setState({ displayAll: true });
  }

}
