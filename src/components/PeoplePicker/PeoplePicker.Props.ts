import * as React from 'react';
import { PeoplePicker } from './PeoplePicker';
import { IPersonaProps } from '../Persona/Persona.Props';
import { IPeoplePickerItemProps } from './PeoplePickerItemProps';

export interface IPeoplePickerProps extends React.Props<PeoplePicker> {
  /**
  * The list of people to choose from.
  */
  suggestions?: Array<IPersonaProps>;

  /**
   * A list of items that are already selected when the picker is rendered for the
   * first time. Used in edit form mode. In new form mode it should be empty.
   */
  initialItems?: Array<IPersonaProps>;

  /**
   * The search category name that appears just above the search results.
   * Not displayed in the MemberList variant.
   */
  searchCategoryName?: string;

  /**
   * The no results text that appears when no results are available.
   * Not displayed in the MemberList variant.
   */
  noResultsText?: string;

  /**
  * The type of PeoplePickerType to display.
  * @default PeoplePickerType.normal
  */
  type?: PeoplePickerType;

  /**
   * Whether there is a connection to the server.
   * @default true
   */
  isConnected?: boolean;

  /**
   * Whether to show the search more button at the bottom of the picker.
   * @default true
   */
  canSearchMore?: boolean;

  /**
   * Text to display in the section where the user clicks to search for more results.
   */
  primarySearchText?: string;

  /**
   * Text to display in the section where the user clicks to search for more results.
   */
  secondarySearchText?: string;

  /**
   * Text to display in the section where the user clicks to search for more results, used whenever isConnected is false.
   */
  disconnectedText?: string;

  /**
   * The format for the text that should display the number of members added so far in the picker.
   * Should support singular/plural
   */
  addedMemberCountFormatText?: string;

  /**
   * Callback for the onChanged event.
   */
  onSearchFieldChanged?: (newValue: any) => void;

  /**
   * Callback for when the user wants to search for more than the results displayed.
   */
  onSearchForMoreResults?: (searchString: string) => void;

  /**
   * Callback for when the user wants to remove a suggested result
   */
  onRemoveSuggestion?: (index: number, persona: IPersonaProps) => void;

  /**
   * This gets called when an item is added to the currently selected items
   */
  onItemAdded?: (item: IPersonaProps) => void;

  /**
   * This gets called when an item is removed from the currently selected items
   */
  onItemRemoved?: (item: IPersonaProps) => void;

  renderSelectedItem?: (result: IPeoplePickerItemProps) => JSX.Element;

  renderSearchItem?: (result: IPeoplePickerItemProps) => JSX.Element;
}

export enum PeoplePickerType {
  /**
   * Standard People Picker.
   */
  normal,
  /**
   * Compact layout. It uses small personas when displaying search results.
   */
  compact,
  /**
   * MemberList layout. The selected people show up below the search box.
   */
  memberList,
}