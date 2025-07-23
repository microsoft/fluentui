import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';
import { resetIds, KeyCodes } from '@fluentui/utilities';

import { ValidationState } from './BasePicker.types';
import { BasePicker } from './BasePicker';
import { isConformant } from '../../common/isConformant';
import type { IBasePickerProps, IBasePicker } from './BasePicker.types';
import type { IPickerItemProps } from './PickerItem.types';

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
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    document.body.textContent = '';

    // reset any jest timers
    if ((setTimeout as any).mock) {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    }
  });

  const BasePickerWithType = BasePicker as new (props: IBasePickerProps<ISimple>) => BasePicker<
    ISimple,
    IBasePickerProps<ISimple>
  >;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const onRenderItem = (props: IPickerItemProps<ISimple>): JSX.Element => (
    <div key={props.item.name}>{basicRenderer(props)}</div>
  );

  const runAllTimers = () =>
    act(() => {
      jest.runAllTimers();
    });

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
    // Problem: Ref doesn't match DOM node and returns null.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-has-root-ref', 'component-handles-ref', 'has-top-level-file'],
  });

  it('renders inline callout', () => {
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
          pickerCalloutProps={{ doNotLayer: true, id: 'test' }}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'b';
      fireEvent.input(input);
    });
    runAllTimers();

    const calloutParent = document.getElementById('test')?.closest('.ms-BasePicker');
    expect(calloutParent).toBeTruthy();
  });

  it('can provide custom renderers', () => {
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ISimple>>();
    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'bl';
      fireEvent.input(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(2);

    act(() => {
      fireEvent.click(suggestionOptions[0]);
    });

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('black');
  });

  it('can select generic items.', () => {
    jest.useFakeTimers();

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

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
          createGenericItem={createGenericItem}
          onValidateInput={onValidateInput}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'asdff';
      fireEvent.input(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(0);

    act(() => {
      fireEvent.keyDown(input, { which: KeyCodes.enter, keyCode: KeyCodes.enter });
    });

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('asdff');
  });

  it('has force suggestions button', () => {
    jest.useFakeTimers();

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

    act(() => {
      render(
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
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'asdff';
      fireEvent.input(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    const forceButton = document.querySelectorAll('[data-automationid=sug-forceResolve]');
    expect(forceButton.length).toEqual(1);

    act(() => {
      fireEvent.click(forceButton[0]);
    });

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].name).toEqual('asdff');
  });

  it('will not render input when items reach itemLimit', () => {
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={1}
          componentRef={picker}
        />,
      );
    });

    let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'bl';
      fireEvent.input(input);
    });
    runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

    act(() => {
      fireEvent.click(suggestionOptions[0]);
    });

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);

    input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    expect(input).toBeNull();
  });

  it('will still render with itemLimit set to 0', () => {
    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={0}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    expect(input).toBeNull();
  });

  it('can be set with selectedItems and a lower itemLimit', () => {
    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
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
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    expect(input).toBeNull();

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(2);
  });

  it('can render MRU when input is focused', () => {
    const resolveSuggestions = () => onResolveSuggestions('');

    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          onEmptyInputFocus={resolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    act(() => {
      fireEvent.focus(input);
    });

    expect(getSuggestions(document)).toBeTruthy();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(15);

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(0);
  });

  it('Closes menu when escape is pressed', () => {
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    act(() => {
      input.focus();
      input.value = 'asdff';
      fireEvent.input(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    act(() => {
      fireEvent.keyDown(input, { which: 27 });
    });

    expect(getSuggestions(document)).toBeFalsy();
  });

  it('Opens menu on click when suggestions have been dismissed', () => {
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'asdff';
      fireEvent.input(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    act(() => {
      fireEvent.keyDown(input, { which: 27 });
    });

    expect(getSuggestions(document)).toBeFalsy();

    act(() => {
      fireEvent.click(input, { button: 0 });
    });

    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();
  });

  it('Opens menu when input refocused after search has happened', () => {
    expect(getSuggestions(document)).toBeFalsy();
    jest.useFakeTimers();

    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <div>
          <BasePickerWithType
            onResolveSuggestions={onResolveSuggestions}
            onRenderItem={onRenderItem}
            onRenderSuggestionsItem={basicSuggestionRenderer}
            componentRef={picker}
          />
          <button id="toFocus">focus me</button>
        </div>,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'bl';
      fireEvent.input(input);
    });
    // For some reason with act() this has to be run twice to make the callout dismiss callback
    // actually be called?
    runAllTimers();
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    act(() => {
      (document.querySelector('#toFocus') as any).focus();
    });

    // Implicit test to ensure suggestions are dismissed when focus lost
    expect(getSuggestions(document)).toBeFalsy();

    runAllTimers();

    act(() => {
      fireEvent.focus(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();
  });

  // TODO: This test should be ported to Cypress due to not working in React 17
  xit('Opens calls onResolveSuggestions if it currently doesnt have suggestions', () => {
    jest.useFakeTimers();

    const resolveMock = jest.fn(onResolveSuggestions);
    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={resolveMock}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
          inputProps={{ defaultVisibleValue: 'bl' }}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    act(() => {
      fireEvent.focus(input);
    });
    runAllTimers();

    expect(resolveMock).toHaveBeenCalledTimes(1);

    // This isn't working because document.activeElement isn't being updated to the input,
    // and BasePicker._getShowSuggestions checks for that.
    expect(getSuggestions(document)).toBeTruthy();
  });

  it('navigates to search for more button', () => {
    jest.useFakeTimers();

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

    act(() => {
      render(
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
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'b';
      fireEvent.input(input);
    });
    runAllTimers();

    expect(getSuggestions(document)).toBeTruthy();

    const moreButton = document.querySelector('[data-automationid=sug-searchForMore]') as HTMLElement;
    expect(moreButton).toBeTruthy();

    act(() => {
      fireEvent.keyDown(input, { which: KeyCodes.up, keyCode: KeyCodes.up });
    });

    expect(moreButton.id).toEqual('sug-selectedAction');
    expect(input.getAttribute('aria-activedescendant')).toEqual('sug-selectedAction');
  });

  it('focuses the input when the focus method is called', () => {
    const picker = React.createRef<IBasePicker<ISimple>>();

    act(() => {
      render(
        <BasePickerWithType
          componentRef={picker}
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

    act(() => {
      picker.current?.focus();
    });

    expect(document.activeElement).toBe(input);
  });

  it('focuses the last selected item after removing input', () => {
    jest.useFakeTimers();

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const onRenderFocusableItem = (props: IPickerItemProps<ISimple>): JSX.Element => (
      <div key={props.item.name} data-selection-index={props.index}>
        <button>{basicRenderer(props)}</button>
      </div>
    );

    act(() => {
      render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderFocusableItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={1}
        />,
      );
    });

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'bl';
      fireEvent.input(input);
    });
    runAllTimers();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    act(() => {
      fireEvent.click(suggestionOptions[0]);
    });

    const selectedItem = document.querySelector('[data-selection-index] > button');

    expect(document.activeElement).toBe(selectedItem);
  });

  it('focuses the next selected item after removing a selection', () => {
    jest.useFakeTimers();

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const onRenderFocusableItem = (props: IPickerItemProps<ISimple>): JSX.Element => {
      return (
        <div key={props.item.name} data-selection-index={props.index}>
          <button onClick={props.onRemoveItem}>{basicRenderer(props)}</button>
        </div>
      );
    };

    act(() => {
      render(
        <BasePickerWithType
          defaultSelectedItems={[
            { key: '1', name: 'blue' },
            { key: '2', name: 'black' },
          ]}
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderFocusableItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />,
      );
    });

    const selectedEls = document.querySelectorAll('[data-selection-index] > button');

    act(() => {
      (selectedEls[0] as HTMLButtonElement).focus();
      fireEvent.click(selectedEls[0]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.activeElement).toBe(selectedEls[1]);
  });
});
