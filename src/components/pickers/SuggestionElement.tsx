import * as React from 'react';
import { Button, ButtonType } from '../../Button';
import { css } from '../../utilities/css';
import { ISuggestionItem } from './Suggestions';
import './SuggestionElement.scss';

export interface ISuggestionElementProps<T> extends React.Props<any> {
  onRenderSuggestion: (props: any) => JSX.Element;
  onSuggestionClick: (ev: React.MouseEvent, index: number) => void;
  suggestions: ISuggestionItem<T>[];
  suggestionsHeaderText?: string;
  searchForMoreText?: string;
  onGetMoreResults?: () => void;
  className?: string;
}


export interface ISuggestionProps<T> {
  suggestion: ISuggestionItem<T>,
  RenderSuggestion: (item: T) => JSX.Element,
  onClick: (ev: React.MouseEvent) => void
}


export class Suggestion<T> extends React.Component<ISuggestionProps<T>, {}> {
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

export function Example(props: ISuggestionProps<any>) {
  let {
    suggestion,
    RenderSuggestion,
    onClick
  } = props;
  return (
    <Button
      onClick={ onClick }
      className={ css('ms-Suggestions-Item', { 'is-suggested': suggestion.isSelected }) }
      >
      <RenderSuggestion {...suggestion.item}/>
    </Button>
  );
}

export function Example2<T>(props: ISuggestionProps<T>) {
  let {
    suggestion,
    RenderSuggestion,
    onClick
  } = props;
  return (
    <Button
      onClick={ onClick }
      className={ css('ms-Suggestions-Item', { 'is-suggested': suggestion.isSelected }) }
      >
      <RenderSuggestion {...suggestion.item}/>
    </Button>
  );
}

export function renderComposit(func: (props: any[]) => JSX.Element) {
  return func;
}

export class SuggestionElement<T> extends React.Component<ISuggestionElementProps<T>, {}> {
  private SuggestionOfProperType = Suggestion as new (props: ISuggestionProps<T>) => Suggestion<T>;
  private ExampleOfProperType = (props: ISuggestionProps<T>) => Example2<T>(props);
  public static defaultProps = {
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
    let { suggestions } = this.props;
    let RenderSuggestion = this.props.onRenderSuggestion;
    if (!suggestions.length) {
      return [<div className='ms-Suggestions-None'> None </div>];
    }
    let suggestionItems: JSX.Element[] = [];
    let TypedSuggestion = this.SuggestionOfProperType;
    let Ex = this.ExampleOfProperType;
    for (let index: number = 0; index <= suggestions.length - 1; index++) {
      suggestionItems.push(
        <div ref={ suggestions[index].isSelected ? 'selectedElement' : '' }
          key={index}>
          <Ex
            suggestion={suggestions[index]}
            RenderSuggestion={this.props.onRenderSuggestion}
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

// <Example
//   suggestion={suggestions[index]}
//   RenderSuggestion={this.props.onRenderSuggestion}
//   onClick={(ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
//   />

// <Ex
//   suggestion={suggestions[index]}
//   RenderSuggestion={this.props.onRenderSuggestion}
//   onClick={(ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
//   />

// <Button
//   onClick={(ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
//   className={ css('ms-Suggestions-Item', { 'is-suggested': suggestions[index].isSelected }) }
//   >
//   <RenderSuggestion {...suggestions[index].item}/>
// </Button>