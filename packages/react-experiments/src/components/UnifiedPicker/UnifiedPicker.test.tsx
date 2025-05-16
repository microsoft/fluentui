import * as React from 'react';
import { UnifiedPicker } from './UnifiedPicker';
import { BaseFloatingSuggestions } from '../FloatingSuggestionsComposite';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import { SelectedItemsList } from '../SelectedItemsList';
import type { ISelectedItemProps, ISelectedItemsListProps } from '../SelectedItemsList/SelectedItemsList.types';
import type { IBaseFloatingSuggestionsProps } from '../FloatingSuggestionsComposite';
import type { IFloatingSuggestionItem } from '../../FloatingSuggestionsComposite';

export interface ISimple {
  key: string;
  name: string;
}

const basicSuggestionRenderer = (props: ISimple) => {
  return <div key={props.key}> {props.name} </div>;
};

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.item.key}> {props.item.name} </div>;
};

const basicRenderFloatingPicker = (props: IBaseFloatingSuggestionsProps<ISimple>) => {
  return <BaseFloatingSuggestions {...props} />;
};

const basicRenderSelectedItemsList = (props: ISelectedItemsListProps<ISimple>) => {
  return <SelectedItemsList {...props} />;
};

function _startsWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

const allColors = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow',
];

let floatingPickerProps = {
  onRenderSuggestion: basicSuggestionRenderer,
  onRenderSuggestionsItem: basicSuggestionRenderer,
  isSuggestionsVisible: false,
  suggestions: [],
  targetElement: null,
} as unknown as IBaseFloatingSuggestionsProps<ISimple>;

let selectedItemsListProps = {
  onRenderItem: basicItemRenderer,
  selectedItems: [],
} as ISelectedItemsListProps<ISimple>;

describe('UnifiedPicker', () => {
  it('renders correctly with no items', () => {
    const component = create(
      <UnifiedPicker
        floatingSuggestionProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingSuggestions={basicRenderFloatingPicker}
        onRenderSelectedItems={basicRenderSelectedItemsList}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with selected and suggested items', () => {
    floatingPickerProps = {
      onRenderSuggestion: basicSuggestionRenderer,
      onRenderSuggestionsItem: basicSuggestionRenderer,
      isSuggestionsVisible: false,
      suggestions: [
        {
          id: '1',
          displayText: 'Suggestion 1',
          item: { name: 'yellow', key: 'yellow' },
          isSelected: false,
          showRemoveButton: true,
        },
      ],
      targetElement: null,
    } as unknown as IBaseFloatingSuggestionsProps<ISimple>;

    selectedItemsListProps = {
      onRenderItem: basicItemRenderer,
      selectedItems: [
        {
          name: 'red',
          key: 'red',
        },
        {
          name: 'green',
          key: 'green',
        },
      ],
    };
    const component = create(
      <UnifiedPicker
        floatingSuggestionProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingSuggestions={basicRenderFloatingPicker}
        onRenderSelectedItems={basicRenderSelectedItemsList}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('force resolves to the first suggestion', () => {
    floatingPickerProps = {
      onRenderSuggestion: basicSuggestionRenderer,
      targetElement: null,
    } as unknown as IBaseFloatingSuggestionsProps<ISimple>;

    selectedItemsListProps = {
      onRenderItem: basicItemRenderer,
    };

    let suggestionList: IFloatingSuggestionItem<ISimple>[] = [];
    const _onInputChange = (filterText: string): void => {
      const colorSuggestions = allColors.filter((item: string) => _startsWith(item || '', filterText));
      suggestionList = colorSuggestions.map(item => {
        const newItem = {
          key: item,
          name: item,
        };
        return { item: newItem, isSelected: false } as unknown as IFloatingSuggestionItem<ISimple>;
      });
    };
    const wrapper = render(
      <UnifiedPicker
        floatingSuggestionProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingSuggestions={basicRenderFloatingPicker}
        onRenderSelectedItems={basicRenderSelectedItemsList}
        onInputChange={_onInputChange}
      />,
    );
    expect(wrapper.container.querySelectorAll('.ms-BaseExtendedPicker')).toHaveLength(1);
    expect(wrapper.container.querySelectorAll('.ms-FloatingSuggestions')).toHaveLength(1);
    const inputElement = wrapper.container.querySelector('input') as HTMLInputElement;
    fireEvent.input(inputElement, { target: { value: 'bl' } });

    floatingPickerProps = {
      onRenderSuggestion: basicSuggestionRenderer,
      targetElement: null,
      suggestions: suggestionList,
    } as unknown as IBaseFloatingSuggestionsProps<ISimple>;

    // Due to https://github.com/enzymejs/enzyme/issues/2042, enzyme does not re-render when
    // we call update. Will use the array to validate the right results are returned, till this
    // is fixed by enzyme.
    // wrapper.update();
    expect(suggestionList).toHaveLength(2);
    expect(suggestionList[0].item.name).toEqual('black');
    expect(suggestionList[1].item.name).toEqual('blue');
  });
  it('Can hide and show picker', () => {
    floatingPickerProps = {
      onRenderSuggestion: basicSuggestionRenderer,
      targetElement: null,
      suggestions: [
        {
          id: '1',
          displayText: 'Suggestion 1',
          item: { name: 'black', key: 'black' },
          isSelected: false,
          showRemoveButton: true,
        },
        {
          id: '2',
          displayText: 'Suggestion 2',
          item: { name: 'blue', key: 'blue' },
          isSelected: false,
          showRemoveButton: true,
        },
      ],
    } as unknown as IBaseFloatingSuggestionsProps<ISimple>;

    let suggestionList: IFloatingSuggestionItem<ISimple>[] = [];
    const _onInputChange = (filterText: string): void => {
      const colorSuggestions = allColors.filter((item: string) => _startsWith(item || '', filterText));
      suggestionList = colorSuggestions.map(item => {
        const newItem = {
          key: item,
          name: item,
        };
        return { item: newItem, isSelected: false } as unknown as IFloatingSuggestionItem<ISimple>;
      });
    };

    const wrapper = render(
      <UnifiedPicker
        floatingSuggestionProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingSuggestions={basicRenderFloatingPicker}
        onRenderSelectedItems={basicRenderSelectedItemsList}
        onInputChange={_onInputChange}
      />,
    );

    const inputElement = wrapper.container.querySelector('input') as HTMLInputElement;
    expect(inputElement).toBeDefined();
    fireEvent.input(inputElement, { target: { value: 'bl' } });
    expect(wrapper.baseElement.querySelectorAll('.ms-FloatingSuggestionsList-container')).toHaveLength(1);
    expect(suggestionList).toHaveLength(2);
    // Both suggestions are shown, picker is shown
    expect(wrapper.baseElement.querySelectorAll('#FloatingSuggestionsItemId-0')).toHaveLength(1);
    expect(wrapper.baseElement.querySelectorAll('#FloatingSuggestionsItemId-1')).toHaveLength(1);
    expect(wrapper.baseElement.querySelectorAll('.ms-FloatingSuggestions-callout')).toHaveLength(1);

    floatingPickerProps.isSuggestionsVisible = false;
    const secondwrapper = render(
      <UnifiedPicker
        floatingSuggestionProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingSuggestions={basicRenderFloatingPicker}
        onRenderSelectedItems={basicRenderSelectedItemsList}
        onInputChange={_onInputChange}
      />,
    );
    // Hidden suggestion, no picker
    expect(secondwrapper.container.querySelectorAll('#FloatingSuggestionsItemId-0')).toHaveLength(0);
    expect(secondwrapper.container.querySelectorAll('.ms-FloatingSuggestions-callout')).toHaveLength(0);
  });
});
