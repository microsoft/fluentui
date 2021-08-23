import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { KeyCodes, resetIds } from '../../Utilities';

import { ComboBox, IComboBoxState } from './ComboBox';
import { IComboBox, IComboBoxOption, IComboBoxProps } from './ComboBox.types';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';
import { expectOne, expectMissing, renderIntoDocument } from '../../common/testUtilities';

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

type InputElementWrapper = ReactWrapper<React.InputHTMLAttributes<any>, any>;

let wrapper: ReactWrapper<IComboBoxProps, IComboBoxState, ComboBox> | undefined;
let domNode: HTMLElement | undefined;

const createNodeMock = (el: React.ReactElement<{}>) => {
  return {
    __events__: {},
  };
};

describe('ComboBox', () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
    if (domNode) {
      try {
        ReactDOM.unmountComponentAtNode(domNode.parentElement!);
        domNode.parentElement!.removeChild(domNode);
      } catch (ex) {
        // ignore
      }
      domNode = undefined;
    }
  });

  beforeEach(() => {
    resetIds();
  });

  it('Renders correctly', () => {
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} text={'testValue'} />, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a Keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a'],
    };
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} keytipProps={keytipProps} />, {
      createNodeMock,
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Can flip between enabled and disabled.', () => {
    wrapper = mount(<ComboBox disabled={false} options={DEFAULT_OPTIONS} />);

    expectMissing(wrapper, '.ms-ComboBox.is-disabled');
    expectOne(wrapper, '[data-is-interactable=true]');

    wrapper.setProps({ disabled: true });

    expectOne(wrapper, '.ms-ComboBox.is-disabled');
    expectOne(wrapper, '[data-is-interactable=false]');
  });

  it('Renders no selected item in default case', () => {
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} />);

    expect(wrapper.find('input[role="combobox"]').text()).toEqual('');
  });

  it('Renders a selected item in uncontrolled case', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement: InputElementWrapper = comboBoxRoot.find('input');

    expect(inputElement.props().value).toEqual('1');
  });

  it('Renders a selected item in controlled case', () => {
    wrapper = mount(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement: InputElementWrapper = comboBoxRoot.find('input');

    expect(inputElement.props().value).toEqual('1');
  });

  it('Renders a selected item with zero key', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    wrapper = mount(<ComboBox selectedKey={0} options={options} />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('zero');
  });

  it('changes to a selected key change the input', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    wrapper = mount(<ComboBox selectedKey={0} options={options} />);

    expect(wrapper.find('input').props().value).toEqual('zero');

    wrapper.setProps({ selectedKey: 1 });

    expect(wrapper.find('input').props().value).toEqual('one');
  });

  it('changes to a selected item on key change', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    wrapper = mount(<ComboBox selectedKey={0} options={options} />);

    expect(wrapper.find('input').props().value).toEqual('zero');

    wrapper.setProps({ selectedKey: null });

    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Renders a placeholder', () => {
    const placeholder = 'Select an option';
    wrapper = mount(<ComboBox placeholder={placeholder} options={DEFAULT_OPTIONS} />);

    const inputElement = wrapper.find('.ms-ComboBox input').getDOMNode() as HTMLInputElement;
    expect(inputElement.placeholder).toEqual(placeholder);
    expect(inputElement.value).toEqual('');
  });

  it('Does not automatically add new options when allowFreeform is on in controlled case', () => {
    const componentRef = React.createRef<any>();
    wrapper = mount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        allowFreeform={true}
        onChange={returnUndefined}
        componentRef={componentRef}
      />,
    );

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    inputElement.simulate('input', { target: { value: 'f' } });
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    expect((componentRef.current as ComboBox).state.currentOptions.length).toEqual(DEFAULT_OPTIONS.length);
  });

  it('Automatically adds new options when allowFreeform is on in uncontrolled case', () => {
    const componentRef = React.createRef<any>();
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} componentRef={componentRef} />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    inputElement.simulate('input', { target: { value: 'f' } });
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    const currentOptions = (componentRef.current as ComboBox).state.currentOptions;
    expect(currentOptions.length).toEqual(DEFAULT_OPTIONS.length + 1);
    expect(currentOptions[currentOptions.length - 1].text).toEqual('f');
  });

  it('Renders a default value with options', () => {
    wrapper = mount(<ComboBox text="1" options={DEFAULT_OPTIONS} />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('1');
  });

  it('Renders a default value with no options', () => {
    wrapper = mount(<ComboBox options={[]} text="1" />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('1');
  });

  it('Can change items in uncontrolled case', () => {
    domNode = renderIntoDocument(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

    const buttonElement = domNode.querySelector('.ms-ComboBox button')!;
    ReactTestUtils.Simulate.click(buttonElement);

    const secondItemElement = document.querySelector('.ms-ComboBox-option[data-index="1"]')!;
    ReactTestUtils.Simulate.click(secondItemElement);

    const inputElement = domNode.querySelector('.ms-ComboBox input') as HTMLInputElement;
    expect(inputElement.value).toEqual('2');
  });

  it('Does not automatically change items in controlled case', () => {
    domNode = renderIntoDocument(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />);

    const buttonElement = domNode.querySelector('.ms-ComboBox button')!;
    ReactTestUtils.Simulate.click(buttonElement);

    const secondItemElement = document.querySelector('.ms-ComboBox-option[data-index="1"]')!;
    ReactTestUtils.Simulate.click(secondItemElement);

    const inputElement = domNode.querySelector('.ms-ComboBox input') as HTMLInputElement;
    expect(inputElement.value).toEqual('1');
  });

  it('Multiselect does not mutate props', () => {
    domNode = renderIntoDocument(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} multiSelect />);

    const buttonElement = domNode.querySelector('.ms-ComboBox button')!;
    ReactTestUtils.Simulate.click(buttonElement);

    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');
    ReactTestUtils.Simulate.change(buttons[1]);

    expect(!!DEFAULT_OPTIONS[1].selected).toEqual(false);
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />,
    );

    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />,
    );

    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert non latin text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="0" options={RUSSIAN_OPTIONS} autoComplete="on" allowFreeform={false} />,
    );

    wrapper.find('input').simulate('input', { target: { value: 'п' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('папа');
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />,
    );
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('f');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />,
    );
    wrapper.find('input').simulate('keydown', { which: 'f' });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can insert an empty string in uncontrolled case with autoComplete and allowFreeform on', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />,
    );
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete on and allowFreeform off', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />,
    );

    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can insert an empty string in uncontrolled case with autoComplete off and allowFreeform on', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />,
    );
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete and allowFreeform off', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />,
    );
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  // jeremy

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform on',
    () => {
      wrapper = mount(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />,
      );

      (wrapper.find('input').instance() as any).value = 'f';
      wrapper.find('input').simulate('input', { target: { value: 'f' } });
      (wrapper.find('input').instance() as any).value = '';
      wrapper.find('input').simulate('input', { target: { value: '' } });
      wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual('');
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete on and allowFreeform off',
    () => {
      wrapper = mount(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />,
      );

      (wrapper.find('input').instance() as any).value = 'f';
      wrapper.find('input').simulate('input', { target: { value: 'f' } });
      (wrapper.find('input').instance() as any).value = '';
      wrapper.find('input').simulate('input', { target: { value: '' } });
      wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual('Foo');
    },
  );

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete off and allowFreeform on',
    () => {
      wrapper = mount(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />,
      );

      (wrapper.find('input').instance() as any).value = 'f';
      wrapper.find('input').simulate('input', { target: { value: 'f' } });
      (wrapper.find('input').instance() as any).value = '';
      wrapper.find('input').simulate('input', { target: { value: '' } });
      wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual('');
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform off',
    () => {
      wrapper = mount(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />,
      );
      (wrapper.find('input').instance() as any).value = 'f';
      wrapper.find('input').simulate('input', { target: { value: 'f' } });
      (wrapper.find('input').instance() as any).value = '';
      wrapper.find('input').simulate('input', { target: { value: '' } });
      wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual('One');
    },
  );

  it('Can change selected option with keyboard', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Bar');
  });

  it('Can change selected option with keyboard, looping from bottom to top', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="3" options={DEFAULT_OPTIONS2} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Bar');
  });

  it('Cannot insert text while disabled', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.a });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Cannot change selected option with keyboard while disabled', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Cannot expand the menu when clicking on the input while disabled', () => {
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS2} disabled={true} />);
    wrapper.find('input').simulate('click');
    expect(wrapper.find('.is-opened').length).toEqual(0);
  });

  it('Cannot expand the menu when clicking on the button while disabled', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const buttonElement = wrapper.find('button');
    buttonElement.simulate('click');
    expect(comboBoxRoot.find('.is-opened').length).toEqual(0);
  });

  it('Call onMenuOpened when clicking on the button', () => {
    const onMenuOpenMock = jest.fn();

    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const buttonElement = comboBoxRoot.find('button');
    buttonElement.simulate('click');
    expect(onMenuOpenMock.mock.calls.length).toBe(1);
  });

  it('Opens on focus when openOnKeyboardFocus is true', () => {
    const onMenuOpenMock = jest.fn();

    wrapper = mount(
      <ComboBox defaultSelectedKey="1" openOnKeyboardFocus options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />,
    );
    const comboBoxRoot = wrapper.find('.ms-ComboBox-Input').find('input');
    comboBoxRoot.simulate('focus');
    comboBoxRoot.simulate('keyup');
    expect(onMenuOpenMock.mock.calls.length).toBe(1);
  });

  it('Call onMenuOpened when touch start on the input', () => {
    wrapper = mount(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={returnUndefined} allowFreeform={true} />,
    );
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input');

    // in a normal scenario, when we do a touchstart we would also cause a
    // click event to fire. This doesn't happen in the simulator so we're
    // manually adding this in.
    inputElement.simulate('touchstart');
    inputElement.simulate('click');

    expect(wrapper.find('.is-open').length).toEqual(1);
  });

  it('onPendingValueChanged triggers for all indexes', () => {
    const indexSeen: number[] = [];
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      if (index !== undefined) {
        indexSeen.push(index);
      }
    };
    wrapper = mount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        defaultSelectedKey="1"
        allowFreeform={true}
        onPendingValueChanged={pendingValueChangedHandler}
      />,
    );
    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    inputElement.simulate('input', { target: { value: 'f' } });
    inputElement.simulate('keydown', { which: KeyCodes.down });
    inputElement.simulate('keydown', { which: KeyCodes.up });
    expect(indexSeen).toContain(0);
    expect(indexSeen).toContain(1);
  });

  it('onPendingValueChanged is called with an empty string when the input is cleared', () => {
    let changedValue: string | undefined = undefined;
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      changedValue = value;
    };

    const baseNode = document.createElement('div');
    document.body.appendChild(baseNode);

    const component = ReactDOM.render(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} onPendingValueChanged={pendingValueChangedHandler} />,
      baseNode,
    );

    const input = (ReactDOM.findDOMNode((component as unknown) as React.ReactInstance) as Element).querySelector(
      'input',
    ) as HTMLInputElement;
    if (input === null) {
      throw new Error('ComboBox input element is null');
    }

    // Simulate typing one character into the ComboBox input
    input.value = 'a';
    ReactTestUtils.Simulate.input(input);
    expect(changedValue).toEqual('a');

    // Simulate clearing the ComboBox input
    input.value = '';
    ReactTestUtils.Simulate.input(input);
    expect(changedValue).toEqual('');
  });

  it('suggestedDisplayValue is called undefined when the selected input is cleared', () => {
    const componentRef = React.createRef<any>();
    wrapper = mount(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} componentRef={componentRef} />);

    // SelectedKey is still the same
    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('1');

    // SelectedKey is set to null
    wrapper.setProps({ selectedKey: null });
    expect(wrapper.find('input').props().value).toEqual('');

    const suggestedDisplay = (componentRef.current as ComboBox).state.suggestedDisplayValue;
    expect(suggestedDisplay).toEqual(undefined);
  });

  it('Can type a complete option with autocomplete and allowFreeform on and submit it', () => {
    let updatedOption;
    let updatedIndex;
    const onChange = jest.fn((event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => {
      updatedOption = option;
      updatedIndex = index;
    });
    const initialOption = { key: '1', text: 'Text' };

    wrapper = mount(<ComboBox options={[initialOption]} autoComplete="on" allowFreeform={true} onChange={onChange} />);
    const inputElement: InputElementWrapper = wrapper.find('input');
    inputElement.simulate('input', { target: { value: 't' } });
    inputElement.simulate('input', { target: { value: 'e' } });
    inputElement.simulate('input', { target: { value: 'x' } });
    inputElement.simulate('input', { target: { value: 't' } });
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedOption).toEqual(initialOption);
    expect(updatedIndex).toEqual(0);

    wrapper.update();
    expect(wrapper.find('.ms-ComboBox input').props().value).toEqual('Text');
  });

  it('merges callout classNames', () => {
    domNode = renderIntoDocument(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} calloutProps={{ className: 'foo' }} />,
    );

    const buttonElement = domNode.querySelector('.ms-ComboBox button')!;
    ReactTestUtils.Simulate.click(buttonElement);

    const callout = document.querySelector('.ms-Callout')!;
    expect(callout).toBeDefined();
    expect(callout.classList.contains('ms-ComboBox-callout')).toBeTruthy();
    expect(callout.classList.contains('foo')).toBeTruthy();
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText;
    wrapper = mount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform={true}
        text="hikari"
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
    );

    const input = wrapper.find('input');
    (input.instance() as any).value = '';
    input.simulate('input', { target: { value: '' } });
    input.simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();

    expect(updatedText).toEqual('');
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText;
    wrapper = mount(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform={true}
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
    );

    const input = wrapper.find('input');
    (input.instance() as any).value = 'ab';
    input.simulate('input', { target: { value: 'ab' } });
    input.simulate('keydown', { which: KeyCodes.backspace });
    input.simulate('input', { target: { value: 'a' } });
    input.simulate('keydown', { which: KeyCodes.backspace });
    wrapper.update();

    (input.instance() as any).value = '';
    input.simulate('input', { target: { value: '' } });
    wrapper.update();
    expect((input.instance() as any).value).toEqual('');
    input.simulate('keydown', { which: KeyCodes.enter });

    expect(updatedText).toEqual('');
  });

  it('in multiSelect mode, selectedIndices are correct after performing multiple selections using mouse click', () => {
    const comboBoxRef = React.createRef<any>();
    wrapper = mount(<ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />);

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');

    ReactTestUtils.Simulate.change(buttons[0]);
    ReactTestUtils.Simulate.change(buttons[2]);
    ReactTestUtils.Simulate.change(buttons[1]);

    expect((comboBoxRef.current as ComboBox).state.selectedIndices).toEqual([0, 2, 1]);
  });

  it('in multiSelect mode, defaultselected keys produce correct display input', () => {
    const comboBoxRef = React.createRef<any>();
    wrapper = mount(
      <ComboBox
        multiSelect
        options={DEFAULT_OPTIONS}
        componentRef={comboBoxRef}
        selectedKey={[DEFAULT_OPTIONS[0].key as string, DEFAULT_OPTIONS[2].key as string]}
      />,
    );

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');

    ReactTestUtils.Simulate.change(buttons[2]);
    ReactTestUtils.Simulate.change(buttons[0]);
    const compare = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[2]].reduce((previous: string, current: IComboBoxOption) => {
      if (previous !== '') {
        return previous + ', ' + current.text;
      }
      return current.text;
    }, '');

    expect((inputElement.instance() as any).value).toEqual(compare);
  });

  it('in multiSelect mode, input has correct value', () => {
    const comboBoxRef = React.createRef<any>();
    wrapper = mount(<ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />);

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');

    ReactTestUtils.Simulate.change(buttons[0]);
    ReactTestUtils.Simulate.change(buttons[2]);
    const compare = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[2]].reduce((previous: string, current: IComboBoxOption) => {
      if (previous !== '') {
        return previous + ', ' + current.text;
      }
      return current.text;
    }, '');

    expect((inputElement.instance() as any).value).toEqual(compare);
  });

  it('in multiSelect mode, input has correct value when multiSelectDelimiter specified', () => {
    const comboBoxRef = React.createRef<any>();
    wrapper = mount(
      <ComboBox multiSelect multiSelectDelimiter="; " options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />,
    );

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');

    ReactTestUtils.Simulate.change(buttons[0]);
    ReactTestUtils.Simulate.change(buttons[2]);
    const compare = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[2]].reduce((previous: string, current: IComboBoxOption) => {
      if (previous !== '') {
        return previous + '; ' + current.text;
      }
      return current.text;
    }, '');

    expect((inputElement.instance() as any).value).toEqual(compare);
  });

  it('in multiSelect mode, optional onItemClick callback invoked per option select', () => {
    const onItemClickMock = jest.fn();
    wrapper = mount(<ComboBox multiSelect options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');

    ReactTestUtils.Simulate.change(buttons[0]);
    ReactTestUtils.Simulate.change(buttons[1]);
    ReactTestUtils.Simulate.change(buttons[2]);

    expect(onItemClickMock).toHaveBeenCalledTimes(3);
  });

  it('invokes optional onItemClick callback on option select', () => {
    const onItemClickMock = jest.fn();
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    const buttons = document.querySelectorAll('.ms-ComboBox-option');

    (buttons[0] as HTMLInputElement).click();

    expect(onItemClickMock).toHaveBeenCalledTimes(1);
  });

  it('allows adding a custom aria-describedby id to the input', () => {
    const comboBoxRef = React.createRef<any>();
    const customId = 'customAriaDescriptionId';
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} componentRef={comboBoxRef} ariaDescribedBy={customId} />);

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input').getDOMNode();
    const ariaDescribedByAttribute = inputElement.getAttribute('aria-describedby');
    expect(ariaDescribedByAttribute).toMatch(new RegExp('\\b' + customId + '\\b'));
  });

  it('adds aria-required to the DOM when the required prop is set to true', () => {
    const comboBoxRef = React.createRef<any>();
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} componentRef={comboBoxRef} required={true} />);

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input').getDOMNode();
    const ariaRequiredAttribute = inputElement.getAttribute('aria-required');
    expect(ariaRequiredAttribute).toEqual('true');
  });

  it('correctly handles (aria-labelledby) when no label prop is provided', () => {
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} aria-labelledby={'customAriaLabel'} />);
    const inputElement = wrapper.find('input').getDOMNode();

    expect(inputElement.getAttribute('aria-labelledby')).toBeNull();
  });

  it('correctly handles (aria-labelledby) when label prop is provided', () => {
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} label="hello world" aria-labelledby={'customAriaLabel'} />);
    const inputElement = wrapper.find('input').getDOMNode();

    expect(inputElement.getAttribute('aria-labelledby')).toBe('ComboBox0-label');
  });

  it('sets ariaLabel on both the input and the dropdown list', () => {
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} ariaLabel="customAriaLabel" persistMenu />);

    const inputElement = wrapper.find('input').getDOMNode();
    expect(inputElement.getAttribute('aria-label')).toBe('customAriaLabel');
    expect(inputElement.getAttribute('aria-labelledby')).toBeNull();

    const listElement = wrapper.find('.ms-ComboBox-optionsContainer').getDOMNode();
    expect(listElement.getAttribute('aria-label')).toBe('customAriaLabel');
    expect(listElement.getAttribute('aria-labelledby')).toBeNull();
  });

  it('does not add aria-required to the DOM when the required prop is not set', () => {
    const comboBoxRef = React.createRef<any>();
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />);

    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement = comboBoxRoot.find('input').getDOMNode();
    const ariaRequiredAttribute = inputElement.getAttribute('aria-required');
    expect(ariaRequiredAttribute).toBeNull();
  });

  it('test persistMenu, callout should exist before and after opening menu', () => {
    const onMenuOpenMock = jest.fn();
    const onMenuDismissedMock = jest.fn();

    wrapper = mount(
      <ComboBox
        defaultSelectedKey="1"
        persistMenu={true}
        options={DEFAULT_OPTIONS2}
        onMenuOpen={onMenuOpenMock}
        onMenuDismissed={onMenuDismissedMock}
      />,
    );
    const comboBoxRoot = wrapper.find('.ms-ComboBox');

    // Find menu
    const calloutBeforeOpen = document.querySelector('.ms-Callout')!;
    expect(calloutBeforeOpen).toBeDefined();
    expect(calloutBeforeOpen.classList.contains('ms-ComboBox-callout')).toBeTruthy();

    // Open combobox
    const buttonElement = comboBoxRoot.find('button');
    buttonElement.simulate('click');
    expect(onMenuOpenMock.mock.calls.length).toBe(1);

    // Close combobox
    buttonElement.simulate('click');
    expect(onMenuDismissedMock.mock.calls.length).toBe(1);

    // Ensure menu is still there
    const calloutAfterClose = document.querySelector('.ms-Callout')!;
    expect(calloutAfterClose).toBeDefined();
    expect(calloutAfterClose.classList.contains('ms-ComboBox-callout')).toBeTruthy();
  });

  // Adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeFrom is true for multiselect with default selected values
  it('adds currentPendingValue to options and selects if multiSelected with default values', () => {
    const componentRef = React.createRef<any>();
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
      selected: true,
    };
    wrapper = mount(
      <ComboBox
        multiSelect
        options={DEFAULT_OPTIONS}
        defaultSelectedKey={['1', '2', '3']}
        allowFreeform={true}
        componentRef={componentRef}
      />,
    );
    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS], [0, 1, 2]);
    inputElement.simulate('focus');
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS], [0, 1, 2]);
    inputElement.simulate('input', { target: { value: 'ManuallyEnteredValue' } });
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS], [0, 1, 2]);
    inputElement.simulate('blur');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [0, 1, 2, 3]);
  });

  // Adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeForm is true for multiSelect with no default value selected
  it('adds currentPendingValue to options and selects for multiSelect with no default value', () => {
    const componentRef = React.createRef<any>();
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
      selected: true,
    };
    wrapper = mount(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} allowFreeform={true} componentRef={componentRef} />,
    );
    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS], []);
    inputElement.simulate('focus');
    inputElement.simulate('keyup', { which: 10 });
    expect((componentRef.current as ComboBox).state.focusState).toEqual('focused');
    _verifyStateVariables(componentRef, 'focused', [...DEFAULT_OPTIONS], []);
    inputElement.simulate('input', { target: { value: 'ManuallyEnteredValue' } });
    _verifyStateVariables(componentRef, 'focused', [...DEFAULT_OPTIONS], []);
    inputElement.simulate('blur');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [3]);

    inputElement.simulate('focus');
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [3]);
    inputElement.simulate('input', { target: { value: 'ManuallyEnteredValue' } });
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [3]);

    // This should toggle the checkbox off. With multi-select the currentPendingValue is not reset on input change
    // because it would break keyboard accessibility
    wrapper.find('.ms-ComboBox button').simulate('click');
    const buttons = document.querySelectorAll('.ms-ComboBox-option > input');
    ReactTestUtils.Simulate.change(buttons[3]);

    // with 'ManuallyEnteredValue' still in the input, on blur it should toggle the check back to on
    inputElement.simulate('blur');
    _verifyStateVariables(
      componentRef,
      'none',
      [
        ...DEFAULT_OPTIONS,
        {
          ...comboBoxOption,
          selected: true,
        },
      ],
      [3],
    );
  });

  // adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeForm is true for singleSelect
  it('adds currentPendingValue to options and selects for singleSelect', () => {
    const componentRef = React.createRef<any>();
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
    };
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} componentRef={componentRef} />);
    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS], []);
    inputElement.simulate('focus');
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS], []);
    inputElement.simulate('input', { target: { value: 'ManuallyEnteredValue' } });
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS], []);
    inputElement.simulate('blur');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [3]);

    inputElement.simulate('focus');
    _verifyStateVariables(componentRef, 'focusing', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [3]);
    const buttonElement: any = wrapper.find('.ms-ComboBox button')! as any;
    buttonElement.simulate('click');
    const secondItem = document.querySelector('.ms-ComboBox-option[data-index="2"]')!;
    ReactTestUtils.Simulate.click(secondItem);

    inputElement.simulate('blur');
    _verifyStateVariables(componentRef, 'none', [...DEFAULT_OPTIONS, { ...comboBoxOption }], [2]);
  });

  function _verifyStateVariables(
    componentRef: React.RefObject<any>,
    focusState: 'none' | 'focused' | 'focusing',
    currentOptions: IComboBoxOption[],
    selectedIndices?: number[],
  ): void {
    expect((componentRef.current as ComboBox).state.focusState).toEqual(focusState);
    expect((componentRef.current as ComboBox).state.selectedIndices).toEqual(selectedIndices);
    expect((componentRef.current as ComboBox).state.currentOptions).toEqual(currentOptions);
  }
});
