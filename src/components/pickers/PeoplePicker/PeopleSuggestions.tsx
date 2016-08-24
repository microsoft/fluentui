import * as React from 'react';
import { IPickerSuggestionsProps } from '../BasePicker';
import { IPersonaProps, Persona } from '../../Persona';
import { css } from '../../../utilities/css';
import './PeopleSuggestions.scss';

export interface IPeopleSuggestionsProps extends IPickerSuggestionsProps {
  onResolveSuggestions: (text?: string, selectedItems?: IPersonaProps[]) => IPersonaProps[];
  onRenderSuggestion: (props: IPersonaProps, index: number) => JSX.Element;
}

export interface IPeopleSuggestionsState {
  text?: string;
  suggestions?: IPersonaProps[];
  selectedIndex?: number;
};

export class PeopleSuggestions extends React.Component<IPeopleSuggestionsProps, IPeopleSuggestionsState> {

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

  public componentWillReceiveProps(newProps: IPeopleSuggestionsProps) {
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
      <div className='ms-PeopleSuggestions'>
        <div className='ms-PeopleSuggestions-title'>
          { `Suggestions for "${text}"` }
        </div>

        <div>
          { this._renderSuggestions() }
        </div>
      </div>
    );
  }

  private _renderSuggestions(): JSX.Element[] {
    let { suggestions, selectedIndex } = this.state;
    if (!suggestions.length) {
      return [<div className='ms-PeopleSuggestions-none'>None</div>];
    }
    if (this.props.onRenderSuggestion) {
      return this.state.suggestions.map((persona: IPersonaProps, index) =>
        <div key={ persona.key } className={ css('ms-PeopleSuggestions-item', {
          'is-suggested': selectedIndex === index
        }) }>
          {this.props.onRenderSuggestion(persona, index) }
        </div>);
    }
    else {
      return suggestions.map((persona: IPersonaProps, index) => (
        <div key={ persona.key } className={ css('ms-PeopleSuggestions-item', {
          'is-suggested': selectedIndex === index
        }) }><Persona { ...persona } /></div>
      ));
    }
  }

}
