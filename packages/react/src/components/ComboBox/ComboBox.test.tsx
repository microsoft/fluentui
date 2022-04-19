import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReactWrapper } from 'enzyme';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { safeCreate, safeMount } from '@fluentui/test-utilities';

import { isConformant } from '../../common/isConformant';
import { Autofill } from '../../Autofill';
import { useKeytipRef } from '../../Keytips';
import { SelectableOptionMenuItemType } from '../../SelectableOption';
import { KeyCodes, resetIds } from '../../Utilities';
import { ComboBox } from './ComboBox';
import type { IComboBox, IComboBoxOption } from './ComboBox.types';

const OPTION_SELECTOR = '.ms-ComboBox-option';
const CHECKBOX_OPTION = OPTION_SELECTOR + ' > input';
const BUTTON_OPTION = 'button' + OPTION_SELECTOR;
const OPEN_SELECTOR = '.is-open';

const RENDER_OPTIONS: IComboBoxOption[] = [
  { key: 'header', text: 'Header', itemType: SelectableOptionMenuItemType.Header },
  { key: '1', text: 'Option 1' },
  { key: 'divider', text: '', itemType: SelectableOptionMenuItemType.Divider },
  { key: '2', text: 'Option 2' },
];

const DEFAULT_OPTIONS: IComboBoxOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
];

const DEFAULT_OPTIONS2: IComboBoxOption[] = [
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' },
];
const DEFAULT_OPTIONS3: IComboBoxOption[] = [
  { key: '0', text: 'Zero', itemType: SelectableOptionMenuItemType.Header },
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' },
];

const RUSSIAN_OPTIONS: IComboBoxOption[] = [
  { key: '0', text: 'сестра' },
  { key: '1', text: 'брат' },
  { key: '2', text: 'мама' },
  { key: '3', text: 'папа' },
];

const returnUndefined = () => undefined;

const createNodeMock = (el: React.ReactElement<{}>) => {
  return {
    __events__: {},
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  };
};

describe('ComboBox', () => {
  const createPortal = ReactDOM.createPortal;

  function mockCreatePortal() {
    (ReactDOM as any).createPortal = (node: any) => node;
  }

  beforeAll(() => {
    // Certain later tests mock ReactDOM.createPortal.
    // Since this is the first test to call mount(), we have to mount something with the real
    // version of createPortal first to allow some global setup to run properly (enzyme quirk/bug).
    safeMount(<div />);
  });

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    (ReactDOM as any).createPortal = createPortal;
  });

  isConformant({
    Component: ComboBox,
    displayName: 'ComboBox',
  });

  it('Renders correctly', () => {
    safeCreate(
      <ComboBox options={DEFAULT_OPTIONS} text="testValue" />,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
      { createNodeMock },
    );
  });

  it('Renders correctly when open', () => {
    // Mock createPortal so that the options list ends up inside the wrapper for snapshotting.
    mockCreatePortal();

    const ref = React.createRef<IComboBox>();
    safeMount(<ComboBox options={RENDER_OPTIONS} defaultSelectedKey="2" componentRef={ref} />, wrapper => {
      ref.current!.focus(true);
      wrapper.update();
      // Unlike react-test-renderer's toJSON, snapshots of DOM nodes don't include event handlers
      // and have a few other differences, but it's a decent tradeoff since react-test-renderer
      // doesn't support refs and makes it hard/impossible to open the ComboBox for a snapshot.
      expect(wrapper.getDOMNode()).toMatchSnapshot();
    });
  });

  it('Renders correctly when opened in multi-select mode', () => {
    mockCreatePortal();
    const ref = React.createRef<IComboBox>();
    safeMount(<ComboBox multiSelect options={RENDER_OPTIONS} defaultSelectedKey="2" componentRef={ref} />, wrapper => {
      ref.current!.focus(true);
      wrapper.update();
      expect(wrapper.getDOMNode()).toMatchSnapshot();
    });
  });

  it('renders with a Keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a'],
    };

    const TestComponent: React.FunctionComponent = () => {
      const keytipRef = useKeytipRef<HTMLDivElement>({ keytipProps });
      return <ComboBox ariaDescribedBy="test-foo" options={DEFAULT_OPTIONS} ref={keytipRef} />;
    };

    safeMount(<TestComponent />, wrapper => {
      expect(wrapper.getDOMNode()).toMatchSnapshot();
    });
  });

  it('Can flip between enabled and disabled.', () => {
    safeMount(<ComboBox disabled={false} options={DEFAULT_OPTIONS} />, wrapper => {
      expect(wrapper.find('.ms-ComboBox.is-disabled')).toHaveLength(0);
      expect(wrapper.find('input[data-is-interactable=true]')).toHaveLength(1);

      wrapper.setProps({ disabled: true });

      expect(wrapper.find('.ms-ComboBox.is-disabled')).toHaveLength(1);
      expect(wrapper.find('input[data-is-interactable=false]')).toHaveLength(1);
    });
  });

  it('Renders no selected item in default case', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('');
    });
  });

  it('Renders a selected item in uncontrolled case', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('1');
    });
  });

  it('Renders a selected item in controlled case', () => {
    safeCreate(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('1');
    });
  });

  it('Renders a selected item with zero key', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    safeCreate(<ComboBox selectedKey={0} options={options} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('zero');
    });
  });

  it('changes to a selected key change the input', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    safeMount(<ComboBox selectedKey={0} options={options} />, wrapper => {
      expect(wrapper.find('input').props().value).toEqual('zero');

      wrapper.setProps({ selectedKey: 1 });
      wrapper.update();

      expect(wrapper.find('input').props().value).toEqual('one');
    });
  });

  it('changes to a selected item on key change', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    safeMount(<ComboBox selectedKey={0} options={options} />, wrapper => {
      expect(wrapper.find('input').props().value).toEqual('zero');

      wrapper.setProps({ selectedKey: null });
      wrapper.update();

      expect(wrapper.find('input').props().value).toEqual('');
    });
  });

  it('Applies correct attributes to the selected option', () => {
    safeMount(<ComboBox options={DEFAULT_OPTIONS} defaultSelectedKey="2" />, wrapper => {
      // open combobox to check options list
      wrapper.find('button').simulate('click');

      const options = wrapper.find(BUTTON_OPTION);
      expect(options.at(1).prop('aria-selected')).toEqual('true');
    });
  });

  it('Renders a placeholder', () => {
    const placeholder = 'Select an option';
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} placeholder={placeholder} />, container => {
      const inputElement = container.root.findByType('input');
      expect(inputElement.props.placeholder).toEqual(placeholder);
      expect(inputElement.props.value).toEqual('');
    });
  });

  it('Does not automatically add new options when allowFreeform is on in controlled case', () => {
    safeMount(<ComboBox options={DEFAULT_OPTIONS} allowFreeform onChange={returnUndefined} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('input', { target: { value: 'f' } });
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      // open combobox to check options list
      wrapper.find('button').simulate('click');

      expect(wrapper.find(BUTTON_OPTION)).toHaveLength(DEFAULT_OPTIONS.length);
    });
  });

  it('Automatically adds new options when allowFreeform is on in uncontrolled case', () => {
    safeMount(<ComboBox options={DEFAULT_OPTIONS} allowFreeform />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('input', { target: { value: 'f' } });
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      // open combobox to check options list
      wrapper.find('button').simulate('click');

      const options = wrapper.find(BUTTON_OPTION);
      expect(options.at(options.length - 1).text()).toEqual('f');
    });
  });

  it('Renders a default value with options', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} text="1" />, container => {
      const inputElement = container.root.findByType('input');
      expect(inputElement.props.value).toEqual('1');
    });
  });

  it('Renders a default value with no options', () => {
    safeCreate(<ComboBox options={[]} text="1" />, container => {
      const inputElement = container.root.findByType('input');
      expect(inputElement.props.value).toEqual('1');
    });
  });

  it('Can change items in uncontrolled case', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />, wrapper => {
      // open the menu and click the second item
      wrapper.find('button').simulate('click');
      const option = wrapper.find(BUTTON_OPTION).at(1);
      option.simulate('click');

      // check item is selected
      expect(wrapper.find('input').props().value).toBe('2');
    });
  });

  it('Does not automatically change items in controlled case', () => {
    safeMount(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />, wrapper => {
      // open the menu and click the second item
      wrapper.find('button').simulate('click');
      const option = wrapper.find(BUTTON_OPTION).at(1);
      option.simulate('click');

      // check item is not selected since combobox is controlled
      expect(wrapper.find('input').props().value).toBe('1');
    });
  });

  it('Multiselect does not mutate props', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} multiSelect />, wrapper => {
      // open combobox
      wrapper.find('button').simulate('click');

      // select second option
      let dropdownOption = wrapper.find(CHECKBOX_OPTION).at(1);
      expect(dropdownOption.props().checked).toBeFalsy(); // ensure it's not already selected
      dropdownOption.simulate('change');
      wrapper.update();

      // checkbox selected
      dropdownOption = wrapper.find(CHECKBOX_OPTION).at(1);
      expect(dropdownOption.props().checked).toBeTruthy();
      // option object not mutated
      expect(!!DEFAULT_OPTIONS[1].selected).toBeFalsy();
    });
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform />,
      wrapper => {
        wrapper.find('input').simulate('input', { target: { value: 'f' } });
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe('Foo');
      },
    );
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" />, wrapper => {
      wrapper.find('input').simulate('input', { target: { value: 'f' } });
      wrapper.update();
      expect(wrapper.find('input').props().value).toBe('Foo');
    });
  });

  it('Can insert non latin text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    safeMount(<ComboBox defaultSelectedKey="0" options={RUSSIAN_OPTIONS} autoComplete="on" />, wrapper => {
      wrapper.find('input').simulate('input', { target: { value: 'п' } });
      wrapper.update();
      expect(wrapper.find('input').props().value).toBe('папа');
    });
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform />,
      wrapper => {
        wrapper.find('input').simulate('input', { target: { value: 'f' } });
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe('f');
      },
    );
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: 'f' });
      wrapper.update();
      expect(wrapper.find('input').props().value).toBe('One');
    });
  });

  it('Can insert an empty string in uncontrolled case with autoComplete and allowFreeform on', () => {
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform />,
      wrapper => {
        // Have to manually update the input element beforehand due to issues with Autofill in enzyme
        const input = wrapper.find('input');
        (input.getDOMNode() as HTMLInputElement).value = '';
        input.simulate('input', { target: { value: '' } });
        input.simulate('keydown', { which: KeyCodes.enter });
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe('');
      },
    );
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete on and allowFreeform off', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" />, wrapper => {
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '' } });
      input.simulate('keydown', { which: KeyCodes.enter });
      wrapper.update();
      expect(wrapper.find('input').props().value).toBe('One');
    });
  });

  it('Can insert an empty string in uncontrolled case with autoComplete off and allowFreeform on', () => {
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform />,
      wrapper => {
        // Have to manually update the input element beforehand due to issues with Autofill in enzyme
        const input = wrapper.find('input');
        (input.getDOMNode() as HTMLInputElement).value = '';
        input.simulate('input', { target: { value: '' } });
        input.simulate('keydown', { which: KeyCodes.enter });
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe('');
      },
    );
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete and allowFreeform off', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" />, wrapper => {
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '' } });
      input.simulate('keydown', { which: KeyCodes.enter });
      wrapper.update();
      expect(wrapper.find('input').props().value).toBe('One');
    });
  });

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform on',
    () => {
      safeMount(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform />,
        wrapper => {
          const input = wrapper.find('input');
          input.simulate('input', { target: { value: 'f' } });
          // Have to manually update the input element beforehand due to issues with Autofill in enzyme
          (input.getDOMNode() as HTMLInputElement).value = '';
          input.simulate('input', { target: { value: '' } });
          input.simulate('keydown', { which: KeyCodes.enter });
          wrapper.update();
          expect(wrapper.find('input').props().value).toBe('');
        },
      );
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete on and allowFreeform off',
    () => {
      safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" />, wrapper => {
        const input = wrapper.find('input');
        input.simulate('input', { target: { value: 'f' } });
        input.simulate('input', { target: { value: '' } });
        input.simulate('keydown', { which: KeyCodes.enter });
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe('Foo');
      });
    },
  );

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete off and allowFreeform on',
    () => {
      safeMount(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform />,
        wrapper => {
          const input = wrapper.find('input');
          input.simulate('input', { target: { value: 'f' } });
          // Have to manually update the input element beforehand due to issues with Autofill in enzyme
          (input.getDOMNode() as HTMLInputElement).value = '';
          input.simulate('input', { target: { value: '' } });
          input.simulate('keydown', { which: KeyCodes.enter });
          wrapper.update();
          expect(wrapper.find('input').props().value).toEqual('');
        },
      );
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform off',
    () => {
      safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" />, wrapper => {
        const input = wrapper.find('input');
        input.simulate('input', { target: { value: 'f' } });
        input.simulate('input', { target: { value: '' } });
        input.simulate('keydown', { which: KeyCodes.enter });
        wrapper.update();
        expect(wrapper.find('input').props().value).toEqual('One');
      });
    },
  );

  it('Can change selected option with keyboard', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
      expect(wrapper.find('input').props().value).toEqual('Foo');
    });
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
      expect(wrapper.find('input').props().value).toEqual('Bar');
    });
  });

  it('Can change selected option with keyboard, looping from bottom to top', () => {
    safeMount(<ComboBox defaultSelectedKey="3" options={DEFAULT_OPTIONS2} />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
      expect(wrapper.find('input').props().value).toEqual('One');
    });
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
      expect(wrapper.find('input').props().value).toEqual('Bar');
    });
  });

  it('Changing selected option with keyboard triggers onChange with the correct value', () => {
    const onChange = jest.fn<
      void,
      [React.FormEvent<IComboBox>, IComboBoxOption | undefined, number | undefined, string | undefined]
    >();
    render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    userEvent.tab();
    userEvent.keyboard('{arrowdown}');
    userEvent.tab();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual(DEFAULT_OPTIONS3[2]);
    expect(onChange.mock.calls[0][2]).toEqual(2);
    expect(onChange.mock.calls[0][3]).toEqual(DEFAULT_OPTIONS3[2].text);

    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
      expect(wrapper.find('input').props().value).toEqual('Bar');
    });
  });

  it('Cannot insert text while disabled', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.a });
      expect(wrapper.find('input').props().value).toEqual('One');
    });
  });

  it('Cannot change selected option with keyboard while disabled', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
      expect(wrapper.find('input').props().value).toEqual('One');
    });
  });

  it('Cannot expand the menu when clicking on the input while disabled', () => {
    safeMount(<ComboBox options={DEFAULT_OPTIONS2} disabled />, wrapper => {
      wrapper.find('input').simulate('click');
      expect(wrapper.find(OPEN_SELECTOR).length).toEqual(0);
    });
  });

  it('Cannot expand the menu when clicking on the button while disabled', () => {
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled />, wrapper => {
      wrapper.find('button').simulate('click');
      expect(wrapper.find(OPEN_SELECTOR).length).toEqual(0);
    });
  });

  it('Cannot expand the menu when focused with a button while combobox is disabled', () => {
    const comboBoxRef = React.createRef<any>();
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} componentRef={comboBoxRef} disabled />,
      wrapper => {
        comboBoxRef.current?.focus(true);
        expect(comboBoxRef.current.state.isOpen).toEqual(false);
      },
    );
  });

  it('Calls onMenuOpen when clicking on the button', () => {
    const onMenuOpenMock = jest.fn();
    safeMount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />, wrapper => {
      wrapper.find('button').simulate('click');
      expect(onMenuOpenMock.mock.calls.length).toBe(1);
    });
  });

  it('Opens on focus when openOnKeyboardFocus is true', () => {
    const onMenuOpenMock = jest.fn();
    safeMount(
      <ComboBox defaultSelectedKey="1" openOnKeyboardFocus options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />,
      wrapper => {
        const input = wrapper.find('input');
        input.simulate('focus');
        input.simulate('keyup');
        expect(onMenuOpenMock.mock.calls.length).toBe(1);
      },
    );
  });

  it('Calls onMenuOpen when touch start on the input', () => {
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={returnUndefined} allowFreeform />,
      wrapper => {
        const input = wrapper.find('input');

        // in a normal scenario, when we do a touchstart we would also cause a click event to fire.
        // This doesn't happen in the simulator so we're manually adding this in.
        input.simulate('touchstart');
        input.simulate('click');

        expect(wrapper.find(OPEN_SELECTOR).length).toEqual(1);
      },
    );
  });

  it('onPendingValueChanged triggers for all indexes', () => {
    const indexSeen: number[] = [];
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      if (index !== undefined) {
        indexSeen.push(index);
      }
    };
    safeMount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        defaultSelectedKey="1"
        allowFreeform
        onPendingValueChanged={pendingValueChangedHandler}
      />,
      wrapper => {
        const input = wrapper.find('input');
        input.simulate('input', { target: { value: 'f' } });
        input.simulate('keydown', { which: KeyCodes.down });
        input.simulate('keydown', { which: KeyCodes.up });
        expect(indexSeen).toContain(0);
        expect(indexSeen).toContain(1);
      },
    );
  });

  it('onPendingValueChanged is called with an empty string when the input is cleared', () => {
    let changedValue: string | undefined = undefined;
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      changedValue = value;
    };

    safeMount(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform onPendingValueChanged={pendingValueChangedHandler} />,
      wrapper => {
        // Simulate typing one character into the ComboBox input
        const input = wrapper.find('input');
        input.simulate('input', { target: { value: 'a' } });

        // Simulate clearing the ComboBox input
        // (have to manually update the input element beforehand due to issues with Autofill in enzyme)
        (input.getDOMNode() as HTMLInputElement).value = '';
        input.simulate('input', { target: { value: '' } });
        expect(changedValue).toEqual('');
      },
    );
  });

  it('onInputValueChange is called whenever the input changes', () => {
    let changedValue: string | undefined = undefined;
    const onInputValueChangeHandler = (value: string) => {
      changedValue = value;
    };

    safeMount(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform onInputValueChange={onInputValueChangeHandler} />,
      wrapper => {
        // Simulate typing one character into the ComboBox input
        const input = wrapper.find('input');
        input.simulate('input', { target: { value: 'a' } });
        expect(changedValue).toEqual('a');

        // Simulate clearing the ComboBox input
        // (have to manually update the input element beforehand due to issues with Autofill in enzyme)
        (input.getDOMNode() as HTMLInputElement).value = '';
        input.simulate('input', { target: { value: '' } });
        expect(changedValue).toEqual('');
      },
    );
  });

  it('suggestedDisplayValue is set to undefined when the selected input is cleared', () => {
    safeMount(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />, wrapper => {
      expect(wrapper.find('input').props().value).toEqual('1');

      wrapper.setProps({ selectedKey: null });
      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual('');

      const autofill = wrapper.find(Autofill);
      expect(autofill.props().suggestedDisplayValue).toEqual(undefined);
    });
  });

  it('Can type a complete option with autocomplete and allowFreeform on and submit it', () => {
    const onChange = jest.fn<
      void,
      [React.FormEvent<IComboBox>, IComboBoxOption | undefined, number | undefined, string | undefined]
    >();
    const initialOption = { key: '1', text: 'Text' };

    safeMount(<ComboBox options={[initialOption]} autoComplete="on" allowFreeform onChange={onChange} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('input', { target: { value: 't' } });
      inputElement.simulate('input', { target: { value: 'te' } });
      inputElement.simulate('input', { target: { value: 'tex' } });
      inputElement.simulate('input', { target: { value: 'text' } });
      inputElement.simulate('keydown', { which: KeyCodes.enter });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual(initialOption);
      expect(onChange.mock.calls[0][2]).toEqual(0);
      expect(onChange.mock.calls[0][3]).toEqual(initialOption.text);

      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual('Text');
    });
  });

  it('merges callout classNames', () => {
    safeMount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} calloutProps={{ className: 'foo' }} />,
      wrapper => {
        wrapper.find('button').simulate('click');

        const callout = wrapper.find('.ms-Callout').getDOMNode();
        expect(callout).toBeTruthy();
        expect(callout.classList.contains('ms-ComboBox-callout')).toBeTruthy();
        expect(callout.classList.contains('foo')).toBeTruthy();
      },
    );
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText: string | undefined;
    safeMount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform
        text="hikari"
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
      wrapper => {
        const input = wrapper.find('input');
        // Have to manually update the input element beforehand due to issues with Autofill in enzyme
        (input.getDOMNode() as HTMLInputElement).value = '';
        input.simulate('input', { target: { value: '' } });
        input.simulate('keydown', { which: KeyCodes.enter });
        wrapper.update();

        expect(updatedText).toEqual('');
      },
    );
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText: string | undefined;
    safeMount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
      wrapper => {
        const input = wrapper.find('input');
        input.simulate('input', { target: { value: 'ab' } });
        input.simulate('keydown', { which: KeyCodes.backspace });
        input.simulate('input', { target: { value: 'a' } });
        input.simulate('keydown', { which: KeyCodes.backspace });
        wrapper.update();

        // Have to manually update the input element beforehand due to issues with Autofill in enzyme
        (input.getDOMNode() as HTMLInputElement).value = '';
        input.simulate('input', { target: { value: '' } });
        wrapper.update();
        expect((input.getDOMNode() as HTMLInputElement).value).toEqual('');
        input.simulate('keydown', { which: KeyCodes.enter });

        expect(updatedText).toEqual('');
      },
    );
  });

  it('in multiSelect mode, selectedOptions are correct after performing multiple selections using mouse click', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    safeMount(<ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');
      options.at(1).simulate('change');
      options.at(2).simulate('change');

      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['1', '2', '3']);
    });
  });

  it('in multiSelect mode, defaultSelectedKey produces correct display input', () => {
    const comboBoxRef = React.createRef<any>();
    const keys = [DEFAULT_OPTIONS[0].key as string, DEFAULT_OPTIONS[2].key as string];
    safeMount(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={keys} />,
      wrapper => {
        const inputElement = wrapper.find('input');
        expect(inputElement.props().value).toEqual(keys.join(', '));

        inputElement.simulate('keydown', { which: KeyCodes.enter });

        const options = wrapper.find(CHECKBOX_OPTION);
        options.at(2).simulate('change');
        options.at(0).simulate('change');
        wrapper.update();

        expect((inputElement.getDOMNode() as HTMLInputElement).value).toEqual('');
      },
    );
  });

  it('in multiSelect mode, input has correct value after selecting options', () => {
    safeMount(<ComboBox multiSelect options={DEFAULT_OPTIONS} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });
      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');
      options.at(2).simulate('change');

      const keys = [DEFAULT_OPTIONS[0].key, DEFAULT_OPTIONS[2].key];
      expect((inputElement.getDOMNode() as HTMLInputElement).value).toEqual(keys.join(', '));
    });
  });

  it('in multiSelect mode, input has correct value when multiSelectDelimiter specified', () => {
    const delimiter = '; ';
    safeMount(<ComboBox multiSelect multiSelectDelimiter={delimiter} options={DEFAULT_OPTIONS} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });
      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');
      options.at(2).simulate('change');

      const keys = [DEFAULT_OPTIONS[0].key, DEFAULT_OPTIONS[2].key];
      expect((inputElement.getDOMNode() as HTMLInputElement).value).toEqual(keys.join(delimiter));
    });
  });

  it('in multiSelect mode, optional onItemClick callback invoked per option select', () => {
    const onItemClickMock = jest.fn();
    safeMount(<ComboBox multiSelect options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />, wrapper => {
      wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');
      options.at(1).simulate('change');
      options.at(2).simulate('change');

      expect(onItemClickMock).toHaveBeenCalledTimes(3);
    });
  });

  it('in multiSelect mode, selectAll selects all options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    safeMount(<ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');
      inputElement.simulate('keydown', { which: KeyCodes.escape });

      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '1', '2', '3']);
      expect(wrapper.find('input').props().value).toEqual('1, 2, 3');
    });
  });

  it('in multiSelect mode, selectAll does not select disabled options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    SELECTALL_OPTIONS[1] = { ...SELECTALL_OPTIONS[1], disabled: true };
    safeMount(<ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');

      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '2', '3']);
    });
  });

  it('in multiSelect mode, selectAll does not select heeaders or dividers', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...RENDER_OPTIONS,
    ];
    safeMount(<ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');

      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '1', '2']);
    });
  });

  it('in multiSelect mode, selectAll checked calculation ignores headers, dividers, and disabled options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...RENDER_OPTIONS,
    ];
    SELECTALL_OPTIONS[2] = { ...SELECTALL_OPTIONS[2], disabled: true };
    safeMount(<ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(2).simulate('change');

      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['2', 'selectAll']);
    });
  });

  it('in multiSelect mode, modifying option selection updates selectAll', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    safeMount(<ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(0).simulate('change');
      // un-check one option
      options.at(1).simulate('change');

      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['2', '3']);

      // re-check option
      options.at(1).simulate('change');
      expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['2', '3', '1', 'selectAll']);
    });
  });

  it('in multiSelect mode with mixed selected, selectAll is indeterminate', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    safeMount(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={['2']} />,
      wrapper => {
        const inputElement = wrapper.find('input');
        inputElement.simulate('keydown', { which: KeyCodes.enter });

        const options = wrapper.find(CHECKBOX_OPTION);
        expect(options.at(0).props()['aria-checked']).toEqual('mixed');
      },
    );
  });

  it('in multiSelect mode, checking options sets selectAll to indeterminate', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    safeMount(<ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(1).simulate('change');

      let selectAll = wrapper.find(CHECKBOX_OPTION).at(0);
      expect(selectAll.props()['aria-checked']).toEqual('mixed');

      options.at(2).simulate('change');
      options.at(3).simulate('change');

      selectAll = wrapper.find(CHECKBOX_OPTION).at(0);
      expect(selectAll.props().checked).toEqual(true);
      expect(selectAll.props()['aria-checked']).toBeUndefined();
    });
  });

  it('in multiSelect mode, checking an indeterminate selectAll checks all options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    safeMount(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={['2']} />,
      wrapper => {
        const inputElement = wrapper.find('input');
        inputElement.simulate('keydown', { which: KeyCodes.enter });

        const options = wrapper.find(CHECKBOX_OPTION);
        options.at(0).simulate('change');

        expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '1', '2', '3']);
      },
    );
  });

  it('in single-select mode, selectAll behaves as a normal option', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...RENDER_OPTIONS,
    ];
    safeMount(<ComboBox options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />, wrapper => {
      const inputElement = wrapper.find('input');
      inputElement.simulate('keydown', { which: KeyCodes.enter });

      const options = wrapper.find(BUTTON_OPTION);
      options.at(0).simulate('click');

      expect(wrapper.find('input').props().value).toEqual('Select All');
    });
  });

  it('invokes optional onItemClick callback on option select', () => {
    const onItemClickMock = jest.fn();
    safeMount(<ComboBox options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />, wrapper => {
      wrapper.find('button').simulate('click');

      const option = wrapper.find(BUTTON_OPTION).at(0);
      option.simulate('click');

      expect(onItemClickMock).toHaveBeenCalledTimes(1);
    });
  });

  it('defaults to ariaDescribedBy prop when passing id to input', () => {
    const ariaId = 'customAriaDescriptionId';
    safeMount(
      <ComboBox options={DEFAULT_OPTIONS} ariaDescribedBy={ariaId} aria-describedby="usePropInstead" />,
      wrapper => {
        const inputElement = wrapper.find('input').getDOMNode();
        expect(inputElement.getAttribute('aria-describedby')).toBe(ariaId);
      },
    );
  });

  it('allows adding a custom aria-describedby id to the input via an attribute', () => {
    const ariaId = 'customAriaDescriptionId';
    safeMount(<ComboBox options={DEFAULT_OPTIONS} aria-describedby={ariaId} />, wrapper => {
      const inputElement = wrapper.find('input').getDOMNode();
      expect(inputElement.getAttribute('aria-describedby')).toBe(ariaId);
    });
  });

  it('correctly handles (aria-labelledby) when label is also provided', () => {
    const customId = 'customAriaLabelledById';
    safeMount(<ComboBox options={DEFAULT_OPTIONS} label="hello world" aria-labelledby={customId} />, wrapper => {
      const labelElement = wrapper.find('label').getDOMNode();
      const labelId = labelElement.getAttribute('id');

      const inputElement = wrapper.find('input').getDOMNode();
      expect(inputElement.getAttribute('aria-labelledby')).toBe(customId + ' ' + labelId);
    });
  });

  it('sets ariaLabel on both the input and the dropdown list', () => {
    safeMount(<ComboBox options={RENDER_OPTIONS} ariaLabel="customAriaLabel" persistMenu />, wrapper => {
      const inputElement = wrapper.find('input').getDOMNode();
      expect(inputElement.getAttribute('aria-label')).toBe('customAriaLabel');
      expect(inputElement.getAttribute('aria-labelledby')).toBeNull();

      const listElement = wrapper.find('.ms-ComboBox-optionsContainer').getDOMNode();
      expect(listElement.getAttribute('aria-label')).toBe('customAriaLabel');
      expect(listElement.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  it('adds aria-required to the DOM when the required prop is set to true', () => {
    safeMount(<ComboBox options={DEFAULT_OPTIONS} required />, wrapper => {
      const inputElement = wrapper.find('input').getDOMNode();
      expect(inputElement.getAttribute('aria-required')).toEqual('true');
    });
  });

  it('does not add aria-required to the DOM when the required prop is not set', () => {
    safeMount(<ComboBox options={DEFAULT_OPTIONS} />, wrapper => {
      const inputElement = wrapper.find('input').getDOMNode();
      expect(inputElement.getAttribute('aria-required')).toBeNull();
    });
  });

  it('with persistMenu, callout should exist before and after opening menu', () => {
    const onMenuOpenMock = jest.fn();
    const onMenuDismissedMock = jest.fn();

    safeMount(
      <ComboBox
        defaultSelectedKey="1"
        persistMenu
        options={DEFAULT_OPTIONS2}
        onMenuOpen={onMenuOpenMock}
        onMenuDismissed={onMenuDismissedMock}
      />,
      wrapper => {
        // Find menu
        const calloutBeforeOpen = wrapper.find('.ms-Callout').getDOMNode();
        expect(calloutBeforeOpen).toBeTruthy();
        expect(calloutBeforeOpen.classList.contains('ms-ComboBox-callout')).toBeTruthy();

        // Open combobox
        const buttonElement = wrapper.find('.ms-ComboBox button');
        buttonElement.simulate('click');
        expect(onMenuOpenMock.mock.calls.length).toBe(1);

        // Close combobox
        buttonElement.simulate('click');
        expect(onMenuDismissedMock.mock.calls.length).toBe(1);

        // Ensure menu is still there
        const calloutAfterClose = wrapper.find('.ms-Callout').getDOMNode();
        expect(calloutAfterClose).toBeTruthy();
        expect(calloutAfterClose.classList.contains('ms-ComboBox-callout')).toBeTruthy();
      },
    );
  });

  // Adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeFrom is true for multiselect with default selected values
  it('adds currentPendingValue to options and selects if multiSelected with default values', () => {
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
      selected: true,
    };
    safeMount(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} defaultSelectedKey={['1', '2', '3']} allowFreeform />,
      wrapper => {
        const inputElement = wrapper.find('input');
        _verifyStateVariables(wrapper, 'none', DEFAULT_OPTIONS, [0, 1, 2]);
        inputElement.simulate('focus');
        _verifyStateVariables(wrapper, 'focusing', DEFAULT_OPTIONS, [0, 1, 2]);
        inputElement.simulate('input', { target: { value: comboBoxOption.text } });
        _verifyStateVariables(wrapper, 'focusing', DEFAULT_OPTIONS, [0, 1, 2]);
        inputElement.simulate('blur');
        _verifyStateVariables(wrapper, 'none', [...DEFAULT_OPTIONS, comboBoxOption], [0, 1, 2, 3]);
      },
    );
  });

  // Adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeForm is true for multiSelect with no default value selected
  it('adds currentPendingValue to options and selects for multiSelect with no default value', () => {
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
      selected: true,
    };
    safeMount(<ComboBox multiSelect options={DEFAULT_OPTIONS} allowFreeform />, wrapper => {
      const inputElement = wrapper.find('input');
      _verifyStateVariables(wrapper, 'none', DEFAULT_OPTIONS, []);
      inputElement.simulate('focus');
      inputElement.simulate('keyup', { which: 10 });
      _verifyStateVariables(wrapper, 'focused', DEFAULT_OPTIONS, []);
      inputElement.simulate('input', { target: { value: comboBoxOption.text } });
      _verifyStateVariables(wrapper, 'focused', DEFAULT_OPTIONS, []);
      inputElement.simulate('blur');
      _verifyStateVariables(wrapper, 'none', [...DEFAULT_OPTIONS, comboBoxOption], [3]);

      inputElement.simulate('focus');
      _verifyStateVariables(wrapper, 'focusing', [...DEFAULT_OPTIONS, comboBoxOption], [3]);
      inputElement.simulate('input', { target: { value: comboBoxOption.text } });
      _verifyStateVariables(wrapper, 'focusing', [...DEFAULT_OPTIONS, comboBoxOption], [3]);

      // This should toggle the checkbox off. With multi-select the currentPendingValue is not reset on input change
      // because it would break keyboard accessibility
      wrapper.find('.ms-ComboBox button').simulate('click');
      const options = wrapper.find(CHECKBOX_OPTION);
      options.at(3).simulate('change');

      // with 'ManuallyEnteredValue' still in the input, on blur it should toggle the check back to on
      inputElement.simulate('blur');
      _verifyStateVariables(wrapper, 'none', [...DEFAULT_OPTIONS, { ...comboBoxOption, selected: true }], [3]);
    });
  });

  // adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeForm is true for singleSelect
  it('adds currentPendingValue to options and selects for singleSelect', () => {
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
    };
    safeMount(<ComboBox options={DEFAULT_OPTIONS} allowFreeform />, wrapper => {
      const inputElement = wrapper.find('input');
      _verifyStateVariables(wrapper, 'none', DEFAULT_OPTIONS, []);
      inputElement.simulate('focus');
      _verifyStateVariables(wrapper, 'focusing', DEFAULT_OPTIONS, []);
      inputElement.simulate('input', { target: { value: comboBoxOption.text } });
      _verifyStateVariables(wrapper, 'focusing', DEFAULT_OPTIONS, []);
      inputElement.simulate('blur');
      _verifyStateVariables(wrapper, 'none', [...DEFAULT_OPTIONS, comboBoxOption], [3]);

      inputElement.simulate('focus');
      _verifyStateVariables(wrapper, 'focusing', [...DEFAULT_OPTIONS, comboBoxOption], [3]);
      wrapper.find('.ms-ComboBox button').simulate('click');
      const options = wrapper.find(BUTTON_OPTION);
      options.at(2).simulate('click');

      inputElement.simulate('blur');
      _verifyStateVariables(wrapper, 'none', [...DEFAULT_OPTIONS, comboBoxOption], [2]);
    });
  });

  function _verifyStateVariables(
    wrapper: ReactWrapper,
    focusState: 'none' | 'focused' | 'focusing',
    currentOptions: IComboBoxOption[],
    selectedIndices?: number[],
  ): void {
    // Once ComboBox is fully converted, we'll need to find another way to test this,
    // but for the time being we can use hacks to get these values from the internal class
    // (enzyme "selectors" support finding components by name)
    const comboBoxInternal = wrapper.find('ComboBoxInternal').instance() as any;
    expect(comboBoxInternal.state.focusState).toEqual(focusState);
    expect(comboBoxInternal.props.hoisted.currentOptions).toEqual(currentOptions);
    // This one could be tested using IComboBox.selectedOptions instead
    expect(comboBoxInternal.props.hoisted.selectedIndices).toEqual(selectedIndices);
  }
});
