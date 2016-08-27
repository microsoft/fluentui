import * as React from 'react';
import { Button } from '../../Button';
import { css } from '../../utilities/css';
import { ISuggestionItem } from './Suggestions';
import './BasePicker.scss';

export interface ISuggestionElementProps<T> extends React.Props<any> {
  onRenderSuggestion: (props: any, index: number) => JSX.Element;
  onSuggestionClick: (ev: React.MouseEvent, index: number) => void;
  suggestions: ISuggestionItem<T>[];
  headerText?: string;
}

export class SuggestionElement<T> extends React.Component<ISuggestionElementProps<T>, {}> {

  static defaultProps = {
    text: ''
  };

  constructor(props) {
    super(props);
  }

  public render() {
    let { headerText } = this.props;
    let { suggestions } = this.props;

    return (
      <div className='ms-Suggestions'>
        { headerText ?
          (<div className='ms-Suggestions-title'>
            { `Suggestions for "${headerText}"` }
          </div>) : (null) }
        <div>
          { this._renderSuggestions() }
        </div>
      </div>
    );
  }

  private _renderSuggestions(): JSX.Element[] {
    let { suggestions } = this.props;
    if (!suggestions.length) {
      return [<div className='ms-Suggestions-none'>None</div>];
    }
    return this.props.suggestions.map((suggestion: ISuggestionItem<T>, index: number) =>
      <div key={ index }>
        <Button
          onClick={ (ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
          className={ css('ms-Suggestions-item', { 'is-suggested': suggestion.isSelected }) }
          >
          { this.props.onRenderSuggestion(suggestion.item, index) }
        </Button>
      </div >);
  }

}
