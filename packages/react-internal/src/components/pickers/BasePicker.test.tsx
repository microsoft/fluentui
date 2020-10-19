import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { IBasePickerProps, IBasePicker, ValidationState } from './BasePicker.types';
import { BasePicker } from './BasePicker';
import { IPickerItemProps } from './PickerItem.types';
import { resetIds, KeyCodes } from '@uifabric/utilities';
import { isConformant } from '../../common/isConformant';

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
    .filter(tag => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map(item => ({ key: item, name: item }));
}

export interface ISimple {
  key: string;
  name: string;
}

const basicRenderer = (props: IPickerItemProps<ISimple>) => {
  return <div> {props.item.name} </div>;
};

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> {props.name} </div>;
};

const getSuggestions = (root: HTMLElement | Document) => {
  return document.querySelector<HTMLElement>('.ms-Suggestions');
};

describe('BasePicker', () => {
  let root: HTMLDivElement;
  beforeEach(() => {
    root = document.createElement('div');
    resetIds();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
    document.body.textContent = '';
  });

  const BasePickerWithType = BasePicker as new (props: IBasePickerProps<ISimple>) => BasePicker<
    ISimple,
    IBasePickerProps<ISimple>
  >;
  const onRenderItem = (props: IPickerItemProps<ISimple>): JSX.Element => (
    <div key={props.item.name}>{basicRenderer(props)}</div>
  );

  it('renders correctly', () => {
    const component = renderer.create(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with inputProps supply classnames correctly', () => {
    const component = renderer.create(
      <BasePickerWithType
        inputProps={{
          placeholder: 'Bitte einen Benutzer angeben...',
          id: 'pckSelectedUser',
          className: 'testclass ',
        }}
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: BasePicker,
    displayName: 'BasePicker',
    disabledTests: ['has-top-level-file'],
  });

  it('can provide custom renderers', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'bl';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeDefined();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(2);
    ReactTestUtils.Simulate.click(suggestionOptions[0]);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('black');
  });

  it('can select generic items.', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();
    const onValidateInput = () => {
      return ValidationState.valid;
    };

    const createGenericItem = (str: string): ISimple => {
      return {
        key: str,
        name: str,
      };
    };

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
        createGenericItem={createGenericItem}
        onValidateInput={onValidateInput}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'asdff';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeDefined();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(0);
    ReactTestUtils.Simulate.keyDown(input, { which: KeyCodes.enter });

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('asdff');
  });

  it('has force suggestions button', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();
    const onValidateInput = () => {
      return ValidationState.valid;
    };

    const createGenericItem = (str: string): ISimple => {
      return {
        key: str,
        name: str,
      };
    };

    const showForceSuggestionsText = () => true;

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
        createGenericItem={createGenericItem}
        onValidateInput={onValidateInput}
        pickerSuggestionsProps={{
          showForceResolve: showForceSuggestionsText,
          forceResolveText: 'Force',
        }}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'asdff';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeDefined();

    const forceButton = document.querySelectorAll('[data-automationid=sug-forceResolve]');
    expect(forceButton.length).toEqual(1);
    ReactTestUtils.Simulate.click(forceButton[0]);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('asdff');
  });

  it('will not render input when items reach itemLimit', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        itemLimit={1}
        componentRef={picker}
      />,
      root,
    );

    let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'bl';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    ReactTestUtils.Simulate.click(suggestionOptions[0]);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);

    input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    expect(input).toBeNull();
  });

  it('will still render with itemLimit set to 0', () => {
    document.body.appendChild(root);

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        itemLimit={0}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    expect(input).toBeNull();
  });

  it('can be set with selectedItems and a lower itemLimit', () => {
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        selectedItems={[
          { key: '1', name: 'blue' },
          { key: '2', name: 'black' },
        ]}
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        itemLimit={0}
        componentRef={picker}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    expect(input).toBeNull();

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(2);
  });

  it('can render MRU when input is focused', () => {
    const resolveSuggestions = () => onResolveSuggestions('');
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onEmptyInputFocus={resolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();

    expect(getSuggestions(document)).toBeDefined();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(15);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(0);
  });

  it('Closes menu when escape is pressed', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'asdff';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    ReactTestUtils.Simulate.keyDown(input, { which: 27 });

    expect(getSuggestions(document)).toBeFalsy();
  });

  it('Opens menu on click when suggestions have been dismissed', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'asdff';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    ReactTestUtils.Simulate.keyDown(input, { which: 27 });

    expect(getSuggestions(document)).toBeFalsy();
    ReactTestUtils.Simulate.click(input, { button: 0 });

    jest.runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();
  });

  it('Opens menu when input refocused after search has happened', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <div>
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />
        <button id="toFocus">focus me</button>
      </div>,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'bl';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    (document.querySelector('#toFocus') as any).focus();

    // Implicit test to ensure suggestions are dismissed when focus lost
    expect(getSuggestions(document)).toBeFalsy();

    jest.runAllTimers();
    input.focus();
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();
  });

  it('Opens calls onResolveSuggestions if it currently doesnt have suggestions', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    let count = 0;
    const resolveCounter = (val: string) => {
      count++;
      return onResolveSuggestions(val);
    };
    const picker = React.createRef<IBasePicker<ISimple>>();

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={resolveCounter}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
        inputProps={{ defaultVisibleValue: 'bl' }}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    jest.runAllTimers();

    expect(count).toEqual(1);

    expect(getSuggestions(document)).toBeTruthy();
  });

  it('navigates to search for more button', () => {
    jest.useFakeTimers();
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<ISimple>>();
    const onValidateInput = () => {
      return ValidationState.valid;
    };

    const createGenericItem = (str: string): ISimple => {
      return {
        key: str,
        name: str,
      };
    };

    ReactDOM.render(
      <BasePickerWithType
        onResolveSuggestions={onResolveSuggestions}
        onRenderItem={onRenderItem}
        onRenderSuggestionsItem={basicSuggestionRenderer}
        componentRef={picker}
        createGenericItem={createGenericItem}
        onValidateInput={onValidateInput}
        pickerSuggestionsProps={{
          searchForMoreText: 'More Options',
        }}
      />,
      root,
    );

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'b';
    ReactTestUtils.Simulate.input(input);
    jest.runAllTimers();

    expect(getSuggestions(document)).toBeDefined();

    const moreButton = document.querySelector('[data-automationid=sug-searchForMore]') as HTMLElement;
    expect(moreButton).toBeTruthy();
    ReactTestUtils.Simulate.keyDown(input, { which: KeyCodes.up });

    expect(moreButton.id).toEqual('sug-selectedAction');
    expect(input.getAttribute('aria-activedescendant')).toEqual('sug-selectedAction');
  });
});
