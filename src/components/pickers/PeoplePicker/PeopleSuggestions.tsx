import * as React from 'react';
import { IPickerSuggestionsProps } from '../BasePicker';
import { IPersonaProps, Persona } from '../../Persona';
import { css } from '../../../utilities/css';
import { Button } from '../../Button';
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
    this.clickSuggestion = this.clickSuggestion.bind(this);
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

  public clickSuggestion(ev: React.MouseEvent, index: number) {
    if (index !== undefined) {
      this.setState({ selectedIndex: index });
      let { suggestions } = this.state;
      let suggestion = suggestions[index];
      return {
        text: suggestion ? suggestion.name : undefined,
        item: suggestion,
        onNextSuggestion: this.nextSuggestion,
        onPreviousSuggestion: this.previousSuggestion,
        onSuggestionClick: this.clickSuggestion
      };
    }
  }

  private _notifySuggestionAvailable() {
    let { suggestions, selectedIndex } = this.state;
    let suggestion = suggestions[selectedIndex];

    this.props.onSuggestionAvailable({
      text: suggestion ? suggestion.name : undefined,
      item: suggestion,
      onNextSuggestion: this.nextSuggestion,
      onPreviousSuggestion: this.previousSuggestion,
      onSuggestionClick: this.clickSuggestion
    });
  }

  private _renderSuggestions(): JSX.Element[] {
    let { suggestions, selectedIndex } = this.state;
    if (!suggestions.length) {
      return [<div className='ms-PeopleSuggestions-none'>None</div>];
    }
    if (this.props.onRenderSuggestion) {
      return this.state.suggestions.map((persona: IPersonaProps, index: number) =>
        <Button
          key={ persona.key }
          className={ css('ms-PeopleSuggestions-item', { 'is-suggested': selectedIndex === index }) }
          onClick={ (ev: React.MouseEvent) => this.props.onSuggestionClick(ev, index) }
          >
          { this.props.onRenderSuggestion(persona, index) }
        </Button>);
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
