import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { create } from 'react-test-renderer';
import { UnifiedPeoplePicker } from './UnifiedPeoplePicker';
import { people, mru } from '@fluentui/example-data';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type {
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '../../../FloatingPeopleSuggestionsComposite';
import type { ISelectedPeopleListProps } from '../../../SelectedItemsList';

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

  it('renders correctly with selected and suggested items', () => {
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

  it('renders correctly with selected and suggested items and callbacks provided', () => {
    selectedPeopleListProps.selectedItems = [people[0]];
    let suggestionList: IFloatingSuggestionItem<IPersonaProps>[] = [];
    const _onInputChange = (filterText: string): void => {
      const allPeople = people;
      const suggestions = allPeople.filter((item: IPersonaProps) => _startsWith(item.text || '', filterText));
      suggestionList = suggestions.map(item => {
        return { item: item, isSelected: false, key: item.key } as IFloatingSuggestionItem<IPersonaProps>;
      });
    };

    function _startsWith(text: string, filterText: string): boolean {
      return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
    }

    floatingPeoplePickerProps.suggestions = suggestionList;

    const wrapper = mount(
      <UnifiedPeoplePicker
        floatingSuggestionProps={floatingPeoplePickerProps}
        selectedItemsListProps={selectedPeopleListProps}
        onInputChange={_onInputChange}
      />,
    );

    const inputElement: InputElementWrapper = wrapper.find('input');
    expect(inputElement).toHaveLength(1);
    inputElement.simulate('input', { target: { value: 'annie' } });

    // still just validating the suggestionlist, as enzyme has a bug for
    // re-render
    expect(suggestionList).toHaveLength(3);
  });
});
