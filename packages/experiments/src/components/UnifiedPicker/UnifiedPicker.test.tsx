import * as React from 'react';
import { UnifiedPicker } from './UnifiedPicker';
import { mount, ReactWrapper } from 'enzyme';
import { ISelectedItemProps, ISelectedItemsListProps } from '../SelectedItemsList/SelectedItemsList.types';
import { IBaseFloatingSuggestionsProps, BaseFloatingSuggestions } from '../FloatingSuggestionsComposite';
import { create } from 'react-test-renderer';
import { SelectedItemsList } from '../SelectedItemsList';

export interface ISimple {
  key: string;
  name: string;
}
type InputElementWrapper = ReactWrapper<React.InputHTMLAttributes<any>, any>;

function onResolveSuggestions(text: string): ISimple[] {
  return [
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
  ]
    .filter((tag: string) => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map((item: string) => ({ key: item, name: item }));
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

let floatingPickerProps = ({
  onResolveSuggestions: onResolveSuggestions,
  onRenderSuggestionsItem: basicSuggestionRenderer,
  isSuggestionVisible: true,
  suggestions: [],
  targetElement: null,
} as unknown) as IBaseFloatingSuggestionsProps<ISimple>;

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

  it('renders BaseExtendedPicker correctly with selected and suggested items', () => {
    floatingPickerProps = ({
      onResolveSuggestions: onResolveSuggestions,
      onRenderSuggestionsItem: basicSuggestionRenderer,
      isSuggestionVisible: true,
      suggestions: [
        {
          name: 'yellow',
          key: 'yellow',
        },
      ],
      targetElement: null,
    } as unknown) as IBaseFloatingSuggestionsProps<ISimple>;

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
    floatingPickerProps = ({
      onResolveSuggestions: onResolveSuggestions,
      onRenderSuggestionsItem: basicSuggestionRenderer,
      isSuggestionVisible: true,
      suggestions: [
        {
          name: 'yellow',
          key: 'yellow',
        },
      ],
      targetElement: null,
    } as unknown) as IBaseFloatingSuggestionsProps<ISimple>;

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
    const _onInputChange = jest.fn();
    const wrapper = mount(
      <UnifiedPicker
        floatingSuggestionProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingSuggestions={basicRenderFloatingPicker}
        onRenderSelectedItems={basicRenderSelectedItemsList}
        onInputChange={_onInputChange}
      />,
    );
    expect(wrapper.find('.ms-BaseExtendedPicker')).toHaveLength(1);
    expect(wrapper.find('.ms-FloatingSuggestions')).toHaveLength(1);
    const inputElement: InputElementWrapper = wrapper.find('input');
    inputElement.simulate('input', { target: { value: 'bl' } });
    wrapper.update();
    expect(_onInputChange).toBeCalledTimes(1);
  });
});
