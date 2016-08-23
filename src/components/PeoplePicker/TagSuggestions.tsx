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
  text: string;
  suggestions: ITag[];
  currentSuggestion: ITag;
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
      currentSuggestion: undefined
    };
  }

  public componentWillReceiveProps(newProps: ITagSuggestionsProps) {
    if (newProps.text !== this.state.text) {
      let suggestions = newProps.onResolveSuggestions(newProps.text, newProps.items);
      let currentSuggestion = suggestions[0];

      this.setState({
        text: newProps.text,
        suggestions: suggestions,
        currentSuggestion
      });

      if (suggestions.length > 0) {
        newProps.onSuggestionAvailable(suggestions[0].name, suggestions[0]);
      } else {
        newProps.onSuggestionAvailable();
      }
    }
  }

  public render() {
    let { text } = this.props;
    let { suggestions, currentSuggestion } = this.state;

    return (
      <div className='ms-TagSuggestions'>
        <div className='ms-TagSuggestions-title'>
          { `Suggestions for "${text}"` }
        </div>

        <div>

          { suggestions.length ? suggestions.map(tag => (
            <div key={ tag.key } className={ css('ms-TagSuggestions-item', {
              'is-suggested': currentSuggestion === tag
            }) }>{ tag.name }</div>
          )) : (
            <div className='ms-TagSuggestions-none'>None</div>
          ) }
        </div>
      </div>
    );
  }

}
