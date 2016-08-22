import * as React from 'react';
import {
  PeoplePicker,
  PeoplePickerType,
  IPersonaProps,
  IPeoplePickerItemProps,
  Persona,
  ContextualMenu,
  IContextualMenuItem,
  DirectionalHint,
  PersonaPresence,
  Button,
  ButtonType
} from '../../../../index';

import './PeoplePicker.CustomResult.Example.scss';

export interface IPeoplePickerExampleState {
  suggestions?: Array<IPersonaProps>;
  contextualMenuVisible?: boolean;
  contextualMenuTarget?: HTMLElement;
}

export class PeoplePickerCustomResultExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList = [
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'PV',
      primaryText: 'Peter Venkman',
      secondaryText: 'Ghostbuster',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'PC',
      primaryText: 'Phil Connors',
      secondaryText: 'Reporter',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'CS',
      primaryText: 'Carl Spackler',
      secondaryText: 'Golpher',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'SZ',
      primaryText: 'Steve Zissou',
      secondaryText: 'Oceanographer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'BH',
      primaryText: 'Bob Harris',
      secondaryText: 'Actor',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'BB',
      primaryText: 'Bunny Breckinridge',
      secondaryText: 'Actor',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
  ];

  private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      isDisabled: true,
    },
  ];

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onRemoveSuggestion = this._onRemoveSuggestion.bind(this);
    this.state = {
      suggestions: this._peopleList,
    };
  }

  public render() {
    let { suggestions } = this.state;

    return (
      <PeoplePicker
        suggestions={ suggestions }
        searchCategoryName={ 'Top Results' }
        noResultsText={ 'No Results Available' }
        onSearchFieldChanged={ this._onFilterChanged }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        type={ PeoplePickerType.memberList }
        primarySearchText='Showing top 5 results'
        secondarySearchText='Search Contacts & Directory'
        disconnectedText='We are having trouble connecting to the server.<br>Please try again in a few minutes.'
        onRenderPeoplePickerItem={ this._renderResult.bind(this) }
        />
    );
  }

  private _onFilterChanged(filterText: string) {
    this.setState({
      suggestions: this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) >= 0)
    });
  };

  private _onRemoveSuggestion(index: number, persona: IPersonaProps) {
    let personas = this.state.suggestions;
    personas.splice(index, 1);
    this.setState({
      suggestions: personas
    });
  }

  private _renderResult(peoplePickerItemProps: IPeoplePickerItemProps): JSX.Element {
    let { persona,
      onRemovePersona,
      index
    } = peoplePickerItemProps;

    return (
      <div className='ms-result-content'>
        <Persona
          { ...persona }
          presence={ persona.presence ? persona.presence : PersonaPresence.online }
          className='ms-result-item'
          />
        <Button
          icon={'ellipsis'}
          buttonType={ButtonType.icon} onClick={this.onContextualMenu.bind(this) }
          className='ms-result-item'
          />
        <Button
          icon={'x'}
          buttonType={ButtonType.icon}
          onClick={(ev: any) => onRemovePersona(index, persona) }
          className='ms-result-item'
          />
        { this.state.contextualMenuVisible ? (
          <ContextualMenu
            items={ this.contextualMenuItems }
            shouldFocusOnMount={ true }
            targetElement={ this.state.contextualMenuTarget }
            onDismiss={ this._onCloseContextualMenu.bind(this) }
            directionalHint={DirectionalHint.bottomAutoEdge}/>)
          : null }
      </div>
    );
  }

  private onContextualMenu(ev?: any) {
    let targetElement: HTMLElement = ev.target as HTMLElement;
    this.setState({ contextualMenuVisible: true, contextualMenuTarget: targetElement });
  }

  private _onCloseContextualMenu(ev: Event) {
    this.setState({ contextualMenuVisible: false, contextualMenuTarget: null });
  }
}
