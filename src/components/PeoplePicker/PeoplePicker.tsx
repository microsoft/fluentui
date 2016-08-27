import * as React from 'react';
import { IPeoplePickerProps, PeoplePickerType } from './PeoplePicker.Props';
import {
  Persona,
  PersonaSize,
  IPersonaProps,
  PersonaPresence
} from '../../Persona';
import {
  Spinner,
  SpinnerType
} from '../../Spinner';
import { format } from '../../utilities/string';
import { FocusZone } from '../../FocusZone';
import { css } from '../../utilities/css';
import { KeyCodes } from '../../utilities/KeyCodes';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { elementContains } from '../../utilities/DomUtils';
import './PeoplePicker.scss';

export interface IPeoplePickerState {
  isActive?: boolean;
  isSearching?: boolean;
  searchTextValue?: string;
  highlightedSearchResultIndex?: number;
  selectedPersonas?: IPersonaProps[];
}

const INVALID_INDEX = -1;

export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
  public static defaultProps: IPeoplePickerProps = {
    type: PeoplePickerType.normal,
    isConnected: true,
    canSearchMore: true
  };

  // @TODO cleanup - unify naming scheme here
  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
    _searchBox: HTMLElement;
    searchField: HTMLInputElement;
    pickerResults: HTMLElement;
    pickerResultGroups: HTMLElement;
    selectedSearchResult: HTMLElement;
    focusZone: HTMLElement;
  };

  private _events: EventGroup;
  private _suggestionsCount: number = 0;
  private _highlightedSearchResult: Object;
  private _focusedPersonaIndex: number = INVALID_INDEX;

  constructor(props: IPeoplePickerProps) {
    super(props);
    this._events = new EventGroup(this);
    this._activatePeoplePicker = this._activatePeoplePicker.bind(this);
    this._dismissPeoplePicker = this._dismissPeoplePicker.bind(this);
    this._addPersonaToSelectedList = this._addPersonaToSelectedList.bind(this);
    this._searchForMoreResults = this._searchForMoreResults.bind(this);
    this._onSearchFieldTextChanged = this._onSearchFieldTextChanged.bind(this);
    this._onSearchFieldKeyDown = this._onSearchFieldKeyDown.bind(this);
    this._onFocusCapture = this._onFocusCapture.bind(this);
    this._removeSelectedPersona = this._removeSelectedPersona.bind(this);
    this._onSelectedPersonaFocus = this._onSelectedPersonaFocus.bind(this);
    this._onSearchBoxKeyDown = this._onSearchBoxKeyDown.bind(this);
    const selectedPersonas: IPersonaProps[] = props.initialItems ? props.initialItems : [];
    this.state = {
      isActive: false,
      isSearching: false,
      searchTextValue: '',
      highlightedSearchResultIndex: INVALID_INDEX,
      selectedPersonas: selectedPersonas
    };
  }

  public componentDidMount() {
    this._events.on(window, 'focus', this._onFocusCapture, true);
    this._events.on(window, 'click', this._onClickCapture, true);
    this._events.on(window, 'touchstart', this._onClickCapture, true);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentDidUpdate() {
    this._setScollPosition();
    let { suggestions } = this.props;

    if (this.state.isActive && this._suggestionsCount !== suggestions.length) {
      this._setSelectedSearchResultIndex(0);
    }
    this._suggestionsCount = suggestions.length;

    // if the selected persona is out of range after an update, it means the user deleted it
    // and we need to set focus on the last one (which isn't handled by the FocusZone).
    // Unless there are no more personas, then set focus on the input field.
    const selectedPersonaCount: number = this.state.selectedPersonas.length;
    if (this._focusedPersonaIndex !== INVALID_INDEX && this._focusedPersonaIndex >= selectedPersonaCount) {
      if (selectedPersonaCount > 0) {
        this._focusedPersonaIndex = selectedPersonaCount - 1;
        (this.refs['persona' + this._focusedPersonaIndex] as HTMLElement).focus();
      } else {
        this._focusedPersonaIndex = INVALID_INDEX;
        this.refs.searchField.focus();
      }
    }
  }

  public render() {
    let { type } = this.props;
    let searchField = this._renderSearchField();
    let searchResults = type === PeoplePickerType.memberList ? this._renderSearchResultsForMemberList() : this._renderSearchResults();

    // Render the selected personas.
    // There are two layouts to choose from, based on the Persona type.
    let selectedPersonas = type === PeoplePickerType.memberList ? null : this._renderSelectedPersonas();
    let memberList = type === PeoplePickerType.memberList ? this._renderSelectedPersonasAsMemberList() : null;

    let className = css( 'ms-PeoplePicker', {
      'is-active': this.state.isActive,
      'ms-PeoplePicker--compact': type === PeoplePickerType.compact,
      'ms-PeoplePicker--membersList': type === PeoplePickerType.memberList,
    });

    return (
      <div
        className={ className }
        ref='root'
        key='root'
      >
        <div className='ms-PeoplePicker-searchBox' ref={ (searchBox) => this.refs._searchBox = searchBox } onKeyDown={ this._onSearchBoxKeyDown }>
          <FocusZone
            onActiveElementChanged={ this._onSelectedPersonaFocus }
            ref={ (focusZone) => this.refs.focusZone = focusZone }
          >
            { selectedPersonas }
            { searchField }
          </FocusZone>
        </div>
        { searchResults }
        { memberList }
      </div>
    );
  }

  private _onSearchBoxKeyDown(ev: React.KeyboardEvent) {
    switch (ev.which) {
      // remove focused persona
      case KeyCodes.backspace:
      case KeyCodes.del:
        if (this._focusedPersonaIndex !== INVALID_INDEX) {
          this._removeSelectedPersona( this._focusedPersonaIndex );
          ev.stopPropagation();
          ev.preventDefault();
        }
    }
  }

  /**
   *
   */
  private _onSelectedPersonaFocus(element: HTMLElement, ev: React.FocusEvent) {
    // store a reference to this element
    // in keydown handler, if there's a focused persona, we want to delete it on certain key press events
    let index = element.getAttribute('data-selection-index');
    if (index) {
      this._focusedPersonaIndex = Number(index);
    }
  }

  /**
   * Handles closing the people picker whenever focus is lost
   */
  private _onFocusCapture(ev: Event) {
    // onBlur, relatedTarget refers to the element that got focus
    let target: HTMLElement = ev.target as HTMLElement;
    if (!elementContains(this.refs.root, target)) {
      this._dismissPeoplePicker();
    }
  }

  /**
   * Handles closing the people picker whenever focus is lost through mouse.
   */
  private _onClickCapture(ev: React.MouseEvent) {
    if (!this.refs.searchField.contains(ev.target as HTMLElement)
      && !this.refs.pickerResults.contains(ev.target as HTMLElement) ) {
      this._dismissPeoplePicker();
    }
  }

  /**
   * Click handler for when the user clicks on the Search For Results button.
   */
  private _searchForMoreResults(event) {
    let { onSearchForMoreResults } = this.props;
    this.setState({
      'isSearching': true
    });
    event.preventDefault();
    event.stopPropagation();
    if (typeof onSearchForMoreResults !== 'undefined') {
      onSearchForMoreResults(this.refs.searchField.value);
    }
  }

  /**
   * Opens the people picker dropdown.
   */
  private _activatePeoplePicker() {
    this.setState({
      'isActive': true,
      'highlightedSearchResultIndex': INVALID_INDEX,
    });
    this._highlightedSearchResult = undefined;
  }

  /**
   * Closes the people picker dropdown.
   */
  private _dismissPeoplePicker() {
    this.setState({
      'isActive': false,
      'isSearching': false,
      'highlightedSearchResultIndex': INVALID_INDEX,
    });
    this._highlightedSearchResult = undefined;
  }

  /**
   *
   */
  private _removeSuggestedPersona(index, personaInfo) {
    let { onRemoveSuggestion } = this.props;
    if (onRemoveSuggestion) {
      onRemoveSuggestion(index, personaInfo);
    }
  }

  /**
   * Selects the persona, dismisses the people picker, and clears out the search field.
   */
  private _addPersonaToSelectedList(personaInfo) {
    const { selectedPersonas } = this.state;
    const { onItemAdded } = this.props;
    if (onItemAdded) {
      onItemAdded(personaInfo);
    }

    selectedPersonas.push(personaInfo);
    this._dismissPeoplePicker();
    this.refs.searchField.value = '';
    this.setState({
      searchTextValue: '',
      selectedPersonas: selectedPersonas
    });
    this.refs.searchField.focus();
    this._onSearchFieldTextChanged();
  }

  /**
   * Creates a new persona based on what the user has typed (non search result persona)
   */
  private _addManualPersonaToSelectedList() {
      let newPersonaName = this.state.searchTextValue;
      if (newPersonaName.length > 0) {
        let personaInfo = {
          imageInitials: newPersonaName.charAt(0).toUpperCase(),
          primaryText: newPersonaName,
          secondaryText: newPersonaName
        };
        this._addPersonaToSelectedList(personaInfo);
      }
  }

  /**
   * Handles keyboard inputs for the PeoplePicker.
   */
  private _onSearchFieldKeyDown(ev: React.KeyboardEvent) {
    let { type } = this.props;
    const { isActive, highlightedSearchResultIndex, selectedPersonas } = this.state;

    switch (ev.which) {

      // Enter behavior:
      // - Adds the highlighted persona from the search results (autocomplete)
      // - creates a new persona from the user's input (not from the search results)
      case KeyCodes.enter:
        if (isActive && highlightedSearchResultIndex !== INVALID_INDEX) {
            this._addPersonaToSelectedList(this._highlightedSearchResult);
        } else {
            this._addManualPersonaToSelectedList();
        }
        break;

      // Escape behavior:
      // - closes the people picker if it is open
      case KeyCodes.escape:
        if (isActive) {
          this._dismissPeoplePicker();
        }
        break;

      // Backspace behavior:
      // - closes the people picker if it is open
      // - sets focus to the last selected persona if people picker is closed
      // - removes the focused persona
      case KeyCodes.backspace:
        // allow normal event handling when there is text entered
        if (this.refs.searchField.value.length !== 0) {
          return; // continue propagation
        }

        if (isActive) {
          this._dismissPeoplePicker();
        } else if (selectedPersonas.length > 0 && type !== PeoplePickerType.memberList) {
          let index = selectedPersonas.length - 1;
          (this.refs['persona' + index] as HTMLElement).focus();
        }
        break;

      // Up behavior:
      // - Moves the focus through the people picker dropdown if it is open
      // - Blurs out of the search field so that the Focus Zone sets focus on a selected personas
      case KeyCodes.up:
        if (isActive && highlightedSearchResultIndex !== INVALID_INDEX) {
          this._setSelectedSearchResultIndex(highlightedSearchResultIndex - 1);
        } else {
          return; // continue propagation
        }
        break;

      // Down behavior:
      // - Activates the people picker if it is not open
      // - Moves the focus through the people picker dropdown if it is open
      case KeyCodes.down:
        if (isActive) {
          this._setSelectedSearchResultIndex(highlightedSearchResultIndex + 1);
        } else {
          this._activatePeoplePicker();
          this._setSelectedSearchResultIndex(0);
        }
        break;

      // Left behavior:
      // - Default cursor behavior if there is any text entered
      // - Blurs out of the search field so that the Focus Zone sets focus on a selected personas
      case KeyCodes.left:
        if (this.refs.searchField.value.length !== 0) {
          ev.stopPropagation();
        }
        return; // continue propagation

      // Tab behavior:
      // - Adds the highlighted persona from the search results (autocomplete)
      // - Shift-tab out of the FocusZone
      case KeyCodes.tab:
        // allow default behavior for shift tab
        if (ev.shiftKey) {
          return;
        }
        if (isActive && highlightedSearchResultIndex !== INVALID_INDEX) {
          this._addPersonaToSelectedList(this._highlightedSearchResult);
        } else {
          return; // continue propagation
        }
        break;

      // Semicolon and comma behavior:
      // - creates a new persona from the user's input (not from the search results)
      case KeyCodes.semicolon:
      case KeyCodes.comma:
        this._addManualPersonaToSelectedList();
        break;

      // Default keyboard behavior
      // - If any key is pressed on the search field input, activate the people picker
      // and set the first search result as selected.
      default:
        if (!isActive) {
          this._activatePeoplePicker();
          // this._setSelectedSearchResultIndex(0);
        }
        return; // continue propagation
    }

    // Only stop propagation if the event was handles and we didn't return
    ev.stopPropagation();
    ev.preventDefault();
  }

  /**
   * Sets which persona in the search results is currently selected/highlighted.
   */
  private _setSelectedSearchResultIndex(index: number) {
    let { highlightedSearchResultIndex } = this.state;
    let { suggestions } = this.props;

    if (suggestions.length > 0) {
      // Cap index to stay in bounds of available search results
      index = Math.max(0, Math.min(suggestions.length - 1, index));
    } else {
      index = INVALID_INDEX;
    }
    if (index !== highlightedSearchResultIndex) {
      // Set the selected option.
      this.setState({
        highlightedSearchResultIndex: index
      });
    }
  }

  /**
   * Handles changes in the input text box value, so we can notify the host
   * of the search value change.
   */
  private _onSearchFieldTextChanged() {
    let { onSearchFieldChanged } = this.props;
    let textValue = this.refs.searchField.value;
    this.setState({
      searchTextValue: textValue
    });
    if (typeof onSearchFieldChanged !== 'undefined') {
      onSearchFieldChanged(textValue);
    }
  }

  /**
   * Handles keeping the currently selected persona in view.
   * If there's no search result selected, then reset the scroll to 0.
   */
  private _setScollPosition() {
    const selectedSearchResult = this.refs.selectedSearchResult;
    let newTop = 0;
    if (selectedSearchResult) {
      const selectedResultTop = selectedSearchResult.offsetTop;
      const menuItemHeight = selectedSearchResult.clientHeight;
      const currentTop = this.refs.pickerResultGroups.scrollTop;
      const totalHeight = this.refs.pickerResultGroups.clientHeight;
      newTop = currentTop;

      // check to scroll down
      let amountCutOffDown = (currentTop + totalHeight) - (selectedResultTop + menuItemHeight);
      if (amountCutOffDown < 0) {
        newTop = currentTop - amountCutOffDown;
      }

      // check to scroll up
      let amountCutOffUp = selectedResultTop - menuItemHeight;
      if (amountCutOffUp < currentTop ) {
        newTop = amountCutOffUp;
      }
    }
    // set the new scroll
    this.refs.pickerResultGroups.scrollTop = newTop;
  }

  /**
   * Removes one of the selected personas
   */
  private _removeSelectedPersona(index) {
    const { selectedPersonas } = this.state;
    const { onItemRemoved } = this.props;
    if (onItemRemoved) {
      onItemRemoved(selectedPersonas[index]);
    }

    selectedPersonas.splice( index, 1 );
    this.setState({
      selectedPersonas: selectedPersonas
    });
  }

  /**
   * Renders a list of personas using the list of selected personas, for the Member List variant.
   */
  private _renderSelectedPersonasAsMemberList() {
    const { selectedPersonas } = this.state;
    const { addedMemberCountFormatText } = this.props;
    let count = selectedPersonas.length;
    let className = css('ms-PeoplePicker-selected', {
      'is-active': count > 0
    });
    let id = 0;

    return <div className={ className }>
      { addedMemberCountFormatText ?
        <div className='ms-PeoplePicker-selectedHeader'>
          <span className='ms-PeoplePicker-selectedCount'>
            { format(addedMemberCountFormatText, count) }
          </span>
        </div> : <div className='ms-PeoplePicker-memberListTopMargin' />  }

      <ul className='ms-PeoplePicker-selectedPeople'>
        <FocusZone>
          { selectedPersonas.map( (child) => {
              return (
                <li className='ms-PeoplePicker-selectedPerson' key={id++}>
                  <Persona
                    { ...child }
                    size={ PersonaSize.small }
                    presence={ child.presence ? child.presence : PersonaPresence.online }
                  />
                  <button className='ms-PeoplePicker-resultAction' onClick={ () => {
                      this._removeSelectedPersona( selectedPersonas.indexOf(child) );
                  }}>
                    <i className='ms-Icon ms-Icon--Cancel'></i>
                  </button>
                </li>);
            })
          }
        </FocusZone>
      </ul>
    </div>;
  }

  /**
   * Renders a list of personas using the list of selected personas. Uses the default layout
   * of displaying the personas in the search box.
   */
  private _renderSelectedPersonas() {
    let id = 0;
    const { selectedPersonas } = this.state;
    return selectedPersonas.map( (child) => {
      let key = id++;
      return (
        <div className='ms-PeoplePicker-persona' ref={ 'persona' + key } key={key} data-selection-index={key} data-is-focusable={true} tabIndex={-1}>
          <div className='ms-PeoplePicker-personaContent'>
            <Persona
              { ...child }
              size={ PersonaSize.extraSmall }
              presence={ child.presence ? child.presence : PersonaPresence.online }
            />
            <button className='ms-PeoplePicker-personaRemove' tabIndex={-1} data-is-focusable={false} onClick={ () => {
                this._removeSelectedPersona( selectedPersonas.indexOf(child) );
              } }>
              <i className='ms-Icon ms-Icon--Clear'></i>
            </button>
          </div>
        </div>);
    });
  }

  /**
   * Renders the search field, which is the input element inside the searchbox.
   */
  private _renderSearchField() {
    return (
      <input
        className='ms-PeoplePicker-searchField'
        type='text'
        ref='searchField' key='searchField'
        data-is-focusable={ true }
        onFocus={ () => {this._focusedPersonaIndex = INVALID_INDEX;}}
        onChange={ this._onSearchFieldTextChanged }
        onKeyDown={ this._onSearchFieldKeyDown }
      />
    );
  }

  /**
   * Renders the popup search results
   */
  private _renderSearchResults() {
    let { suggestions,
      searchCategoryName,
      noResultsText,
      type,
      isConnected,
      primarySearchText,
      secondarySearchText,
      disconnectedText,
      canSearchMore
    } = this.props;
    let { isSearching } = this.state;

    // Generate a result group section for each item in the array of suggestions
    let resultItemId = 0;
    let resultGroupId = 0;
    let searchResultItems = [];
    suggestions.forEach( (persona: IPersonaProps) => {
      searchResultItems.push(this._renderSearchResultItem( persona, resultItemId++ ));
    });
    let searchResults = (
        <div
          className='ms-PeoplePicker-resultGroup'
          key={resultGroupId++}
        >
          <div className='ms-PeoplePicker-resultGroupTitle'>{ suggestions.length > 0 ? searchCategoryName : noResultsText }</div>
          <ul className='ms-PeoplePicker-resultList'>
            { searchResultItems }
          </ul>
        </div>
      );

    let searchMoreClassName = css('ms-PeoplePicker-searchMore', {
      'is-searching': isSearching,
      'ms-PeoplePicker-searchMore--disconnected': !isConnected
    });
    let searchMoreButtonClassName = css('ms-PeoplePicker-searchMoreBtn', {
      'ms-PeoplePicker-searchMoreBtn--compact': type === PeoplePickerType.compact
    });
    let searchIconClassName = css('ms-Icon', {
      'ms-Icon--Search': isConnected,
      'ms-Icon--IncidentTriangle': !isConnected
    });
    let searchMore = canSearchMore ? (
      <div className={ searchMoreClassName } onClick={ isConnected ? this._searchForMoreResults : null }>
        <button className={ searchMoreButtonClassName }>
          { isSearching ? <Spinner type={ SpinnerType.large }/> :
            <div className='ms-PeoplePicker-searchMoreIcon'>
              <i className={ searchIconClassName }></i>
            </div>
          }
          { isConnected ? <div className='ms-PeoplePicker-searchMoreSecondary'>{ secondarySearchText }</div> : null }
          <div className='ms-PeoplePicker-searchMorePrimary'>{ isSearching ? 'Searching for ' + this.refs.searchField.value : isConnected ? primarySearchText : disconnectedText }</div>
        </button>
      </div>) : undefined;

    return (
      <div
        className='ms-PeoplePicker-results'
        key='pickerResults' ref={ (pickerResults) => this.refs.pickerResults = pickerResults }
      >
        <div className='ms-PeoplePicker-resultGroups' ref='pickerResultGroups'>
            { searchResults }
        </div>
        { searchMore }
      </div>
    );
  }

  /**
   * Renders the popup search results, for the Member List variant.
   */
  private _renderSearchResultsForMemberList() {
    let { suggestions } = this.props;

    // MemberList variant doesn't show groups
    let resultItemId = 0;
    let searchResultItems = [];
    suggestions.forEach( (persona: IPersonaProps) => {
      searchResultItems.push(this._renderSearchResultItem( persona, resultItemId++ ));
    });
    let searchResults = (
      <div className='ms-PeoplePicker-resultGroup'>
        <ul className='ms-PeoplePicker-resultList'>
          { searchResultItems }
        </ul>
      </div>);

    return (
      <div
        className='ms-PeoplePicker-results'
        key='pickerResults' ref='pickerResults'
      >
        <div className='ms-PeoplePicker-resultGroups' ref='pickerResultGroups'>
            { searchResults }
        </div>
      </div>
    );
  }

  /**
   * Renders a single persona as part of a list to be displayed in the search results.
   */
  private _renderSearchResultItem(personaInfo: IPersonaProps, id: number) {
    let { type } = this.props;
    let isSelected = id === this.state.highlightedSearchResultIndex;
    let buttonClassName = css( 'ms-PeoplePicker-resultBtn', {
      'ms-PeoplePicker-resultBtn--compact': type === PeoplePickerType.compact,
      'ms-PeoplePicker-resultBtn--selected': isSelected
    });
    if (isSelected) {
      this._highlightedSearchResult = personaInfo;
    }
    let personaSize = type === PeoplePickerType.compact ? PersonaSize.extraSmall : PersonaSize.regular;
    return (
      <li
        className='ms-PeoplePicker-result'
        key={id}
        ref={ isSelected ? 'selectedSearchResult' : null }
      >
        <div role='button' className={ buttonClassName }>
          <Persona
            { ...personaInfo }
            presence={ personaInfo.presence ? personaInfo.presence : PersonaPresence.online }
            size={ personaSize }
            onMouseDown={ () => { this._addPersonaToSelectedList(personaInfo); }}
            onClick={ () => { this._addPersonaToSelectedList(personaInfo); }}
          />
          { type !== PeoplePickerType.memberList ?
            <button
              className='ms-PeoplePicker-resultAction'
              tabIndex={-1}
              onClick={ () => { this._removeSuggestedPersona(id, personaInfo); }} >
              <i className='ms-Icon ms-Icon--Clear'></i></button>
            : null }
        </div>
      </li>);
  }
}
