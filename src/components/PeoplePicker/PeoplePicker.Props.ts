import * as React from 'react';
import { PeoplePicker } from './PeoplePicker';
import { IPersonaProps } from '../Persona/Persona.Props';

export interface IPeoplePickerProps extends React.Props<PeoplePicker> {
  /**
  * The list of people to choose from.
  */
  suggestions?: Array<IPersonaProps>;

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