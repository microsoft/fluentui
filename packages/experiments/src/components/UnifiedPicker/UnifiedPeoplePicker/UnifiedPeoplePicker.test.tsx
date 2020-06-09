import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { create } from 'react-test-renderer';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { UnifiedPeoplePicker } from './UnifiedPeoplePicker';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '@uifabric/experiments/lib/FloatingPeopleSuggestionsComposite';
import { ISelectedPeopleListProps } from '@uifabric/experiments/lib/SelectedItemsList';
import { people, mru } from '@uifabric/example-data';

type InputElementWrapper = ReactWrapper<React.InputHTMLAttributes<any>, any>;

const _onSuggestionRemoved = jest.fn();
const _onSuggestionSelected = jest.fn();
const _onItemsRemoved = jest.fn();
const _getItemsCopyText = jest.fn();

const floatingPeoplePickerProps = {
  suggestions: [],
  isSuggestionsVisible: false,
  targetElement: null,
  onSuggestionSelected: _onSuggestionSelected,
  onRemoveSuggestion: _onSuggestionRemoved,
  suggestionsHeaderText: 'People suggestions',
  noResultsFoundText: 'No suggestions',
  onFloatingSuggestionsDismiss: undefined,
  showSuggestionRemoveButton: true,
} as IFloatingPeopleSuggestionsProps;

const selectedPeopleListProps = {
  removeButtonAriaLabel: 'Remove',
  selectedItems: [],
  onItemsRemoved: _onItemsRemoved,
  getItemCopyText: _getItemsCopyText,
} as ISelectedPeopleListProps<IPersonaProps>;

describe('UnifiedPeoplePicker', () => {
  it('renders correctly with no items', () => {
    const component = create(
      <UnifiedPeoplePicker
        floatingSuggestionProps={floatingPeoplePickerProps}
        selectedItemsListProps={selectedPeopleListProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders BaseExtendedPicker correctly with selected and suggested items', () => {
    floatingPeoplePickerProps.suggestions = [
      {
        key: '1',
        id: '1',
        displayText: 'Suggestion 1',
        item: mru[0],
        isSelected: true,
        showRemoveButton: true,
      },
    ];

    selectedPeopleListProps.selectedItems = [people[0]];
    const component = create(
      <UnifiedPeoplePicker
        floatingSuggestionProps={floatingPeoplePickerProps}
        selectedItemsListProps={selectedPeopleListProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
