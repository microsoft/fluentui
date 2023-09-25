import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
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
  ReactTestUtils.act(() => {
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
    const root = document.createElement('div');
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ITag>>();

    ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} componentRef={picker} />, root);

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'bl';

    ReactTestUtils.Simulate.input(input);
    runAllTimers();

    const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

    expect(suggestions).toBeTruthy();
    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    expect(suggestionOptions.length).toEqual(2);
    ReactTestUtils.Simulate.click(suggestionOptions[0]);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('black');

    ReactDOM.unmountComponentAtNode(root);
  });

  it('can be a controlled component', () => {
    jest.useFakeTimers();
    const root = document.createElement('div');
    document.body.appendChild(root);

    const pickerBeforeUpdate = React.createRef<IBasePicker<ITag>>();
    const pickerAfterUpdate = React.createRef<IBasePicker<ITag>>();

    ReactDOM.render(
      <TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} componentRef={pickerBeforeUpdate} />,
      root,
    );
    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    input.focus();
    input.value = 'bl';
    ReactTestUtils.Simulate.input(input);
    runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    ReactTestUtils.Simulate.click(suggestionOptions[0]);

    const currentPicker = pickerBeforeUpdate.current!.items;
    expect(currentPicker).toHaveLength(0);

    ReactDOM.render(
      <TagPicker
        onResolveSuggestions={onResolveSuggestions}
        selectedItems={[{ key: 'testColor', name: 'testColor' }]}
        componentRef={pickerAfterUpdate}
      />,
      root,
    );

    const updatedPicker = pickerAfterUpdate.current!.items;
    expect(updatedPicker).toHaveLength(1);
    expect(updatedPicker![0].name).toEqual('testColor');

    ReactDOM.unmountComponentAtNode(root);
  });

  it('fires change events correctly for controlled components', done => {
    jest.useFakeTimers();
    const root = document.createElement('div');
    document.body.appendChild(root);
    const onChange = (items: ITag[] | undefined): void => {
      expect(items!.length).toBe(1);
      expect(items![0].name).toBe('black');
      done();
    };

    ReactDOM.render(
      <TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} onChange={onChange} />,
      root,
    );
    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    input.focus();
    input.value = 'bl';
    ReactTestUtils.Simulate.input(input);
    runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    ReactTestUtils.Simulate.click(suggestionOptions[0]);

    ReactDOM.unmountComponentAtNode(root);
  });
});
