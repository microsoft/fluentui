import * as React from 'react';
import { IPickerSuggestionsProps } from './BasePicker';
import { ITag } from './TagPicker';
import { TagItem } from './TagItem';
import { css } from '../../utilities/css';
import './TagSuggestions.scss';

export interface ITagSuggestionsProps extends IPickerSuggestionsProps {
  onResolveSuggestions: (text?: string, selectedItems?: ITag[]) => ITag[];
}

export interface ITagSuggestionsState {
  text?: string;
  suggestions?: ITag[];
  selectedIndex?: number;
};

export class TagSuggestions extends React.Component<ITagSuggestionsProps, ITagSuggestionsState> {

  static defaultProps = {
    text: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      text: undefined,
      suggestions: props.onResolveSuggestions(props.text, props.items),
      selectedIndex: -1
    };

    this.nextSuggestion = this.nextSuggestion.bind(this);
    this.previousSuggestion = this.previousSuggestion.bind(this);
  }

  public componentWillReceiveProps(newProps: ITagSuggestionsProps) {
    if (newProps.text !== this.state.text) {
      let suggestions = newProps.onResolveSuggestions(newProps.text, newProps.items);
      let currentSuggestion = suggestions[0];

      this.setState({
        text: newProps.text,
        suggestions: suggestions,
        selectedIndex: suggestions.length > 0 ? 0 : -1
      }, this._notifySuggestionAvailable);
    }
  }

  public nextSuggestion(): boolean {
    let { selectedIndex, suggestions } = this.state;

    if (selectedIndex < (suggestions.length - 1)) {
      this.setState({ selectedIndex: selectedIndex + 1 }, this._notifySuggestionAvailable);
      return true;
    }
  }

  public previousSuggestion(): boolean {
    let { selectedIndex, suggestions } = this.state;

    if (selectedIndex > 0) {
      this.setState({ selectedIndex: selectedIndex - 1 }, this._notifySuggestionAvailable);
      return true;
    }
  }

  private _notifySuggestionAvailable() {
    let { suggestions, selectedIndex } = this.state;
    let suggestion = suggestions[selectedIndex];

    this.props.onSuggestionAvailable({
      text: suggestion ? suggestion.name : undefined,
      item: suggestion,
      onNextSuggestion: this.nextSuggestion,
      onPreviousSuggestion: this.previousSuggestion
    });

  }
  public render() {
    let { text } = this.props;
    let { suggestions, selectedIndex } = this.state;

    return (
      <div className='ms-TagSuggestions'>
        <div className='ms-TagSuggestions-title'>
          { `Suggestions for "${text}"` }
        </div>

        <div>
          { suggestions.length ? suggestions.map((tag, index) => (
            <div key={ tag.key } className={ css('ms-TagSuggestions-item', {
              'is-suggested': selectedIndex === index
            }) }>{ tag.name }</div>
          )) : (
            <div className='ms-TagSuggestions-none'>None</div>
          ) }
        </div>
      </div>
    );
  }

}
