import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import * as renderer from 'react-test-renderer';

import { TagPicker } from './TagPicker';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../../common/isConformant';
import type { ITag } from './TagPicker.types';
import type { IBasePicker } from '../BasePicker.types';

function onResolveSuggestions(text: string): ITag[] {
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
    .filter(tag => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map(item => ({ key: item, name: item }));
}

const runAllTimers = () =>
  act(() => {
    jest.runAllTimers();
  });

describe('TagPicker', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <TagPicker onResolveSuggestions={onResolveSuggestions} defaultSelectedItems={onResolveSuggestions('black')} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders picker with selected item correctly', () => {
    const component = renderer.create(
      <TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[{ key: 'test', name: 'text' }]} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: TagPicker,
    displayName: 'TagPicker',
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['has-top-level-file', 'component-has-root-ref', 'component-handles-ref'],
  });

  it('can search for and select tags', () => {
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ITag>>();

    render(<TagPicker onResolveSuggestions={onResolveSuggestions} componentRef={picker} />);

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
    });
    input.value = 'bl';

    fireEvent.input(input);

    runAllTimers();

    const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

    expect(suggestions).toBeTruthy();
    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    expect(suggestionOptions.length).toEqual(2);
    fireEvent.click(suggestionOptions[0]);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('black');
  });

  it('can be a controlled component', () => {
    jest.useFakeTimers();

    const pickerBeforeUpdate = React.createRef<IBasePicker<ITag>>();
    const pickerAfterUpdate = React.createRef<IBasePicker<ITag>>();

    const { rerender } = render(
      <TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} componentRef={pickerBeforeUpdate} />,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    act(() => {
      input.focus();
    });
    input.value = 'bl';
    fireEvent.input(input);
    runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    fireEvent.click(suggestionOptions[0]);

    const currentPicker = pickerBeforeUpdate.current!.items;
    expect(currentPicker).toHaveLength(0);

    rerender(
      <TagPicker
        onResolveSuggestions={onResolveSuggestions}
        selectedItems={[{ key: 'testColor', name: 'testColor' }]}
        componentRef={pickerAfterUpdate}
      />,
    );

    const updatedPicker = pickerAfterUpdate.current!.items;
    expect(updatedPicker).toHaveLength(1);
    expect(updatedPicker![0].name).toEqual('testColor');
  });

  it('fires change events correctly for controlled components', () => {
    jest.useFakeTimers();

    const onChange = jest.fn((items: ITag[] | undefined): void => {
      expect(items!.length).toBe(1);
      expect(items![0].name).toBe('black');
    });

    render(<TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} onChange={onChange} />);

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    act(() => {
      input.focus();
    });
    input.value = 'bl';
    fireEvent.input(input);
    runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    fireEvent.click(suggestionOptions[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
