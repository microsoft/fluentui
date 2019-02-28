import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { KeyCodes } from '../../Utilities';

import { ComboBox, IComboBoxState } from './ComboBox';
import { IComboBox, IComboBoxOption, IComboBoxProps } from './ComboBox.types';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';
import { expectOne, expectMissing, renderIntoDocument } from '../../common/testUtilities';

const DEFAULT_OPTIONS: IComboBoxOption[] = [{ key: '1', text: '1' }, { key: '2', text: '2' }, { key: '3', text: '3' }];

const DEFAULT_OPTIONS2: IComboBoxOption[] = [{ key: '1', text: 'One' }, { key: '2', text: 'Foo' }, { key: '3', text: 'Bar' }];
const DEFAULT_OPTIONS3: IComboBoxOption[] = [
  { key: '0', text: 'Zero', itemType: SelectableOptionMenuItemType.Header },
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' }
];

const returnUndefined = () => undefined;

type InputElementWrapper = ReactWrapper<React.InputHTMLAttributes<any>, any>;

let wrapper: ReactWrapper<IComboBoxProps, IComboBoxState, ComboBox> | undefined;
let domNode: HTMLElement | undefined;

const createNodeMock = (el: React.ReactElement<{}>) => {
  return {
    __events__: {}
  };
};

describe.only('ComboBox', () => {
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

  it('Renders correctly', () => {
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} text={'testValue'} />, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a Keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a']
    };
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} keytipProps={keytipProps} />, {
      createNodeMock
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
    const options: IComboBoxOption[] = [{ key: 0, text: 'zero' }, { key: 1, text: 'one' }];
    wrapper = mount(<ComboBox selectedKey={0} options={options} />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('zero');
  });

  it('changes to a selected key change the input', () => {
    const options: IComboBoxOption[] = [{ key: 0, text: 'zero' }, { key: 1, text: 'one' }];
    wrapper = mount(<ComboBox selectedKey={0} options={options} />);

    expect(wrapper.find('input').props().value).toEqual('zero');

    wrapper.setProps({ selectedKey: 1 });

    expect(wrapper.find('input').props().value).toEqual('one');
  });

  it('changes to a selected item on key change', () => {
    const options: IComboBoxOption[] = [{ key: 0, text: 'zero' }, { key: 1, text: 'one' }];
    wrapper = mount(<ComboBox selectedKey={0} options={options} />);

    expect(wrapper.find('input').props().value).toEqual('zero');

    wrapper.setProps({ selectedKey: null });

    // \u200B is a zero width space.
    // See https://github.com/OfficeDev/office-ui-fabric-react/blob/d4e9b6d28b25a3e123b2d47c0a03f18113fbee60/packages/office-ui-fabric-react/src/components/ComboBox/ComboBox.tsx#L481.
    expect(wrapper.find('input').props().value).toEqual('\u200B');
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
    wrapper = mount(<ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} onChange={returnUndefined} componentRef={componentRef} />);

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

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />);

    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />);

    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />);
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('f');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />);
    wrapper.find('input').simulate('keydown', { which: 'f' });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can insert an empty string in uncontrolled case with autoComplete and allowFreeform on', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />);
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete on and allowFreeform off', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />);

    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can insert an empty string in uncontrolled case with autoComplete off and allowFreeform on', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />);
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete and allowFreeform off', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />);
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  // jeremy

  it('Can insert an empty string after removing a pending value in uncontrolled case with autoComplete and allowFreeform on', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />);

    (wrapper.find('input').instance() as any).value = 'f';
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Cannot insert an empty string after removing a pending value in uncontrolled case with autoComplete on and allowFreeform off', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />);

    (wrapper.find('input').instance() as any).value = 'f';
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert an empty string after removing a pending value in uncontrolled case with autoComplete off and allowFreeform on', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />);

    (wrapper.find('input').instance() as any).value = 'f';
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('Cannot insert an empty string after removing a pending value in uncontrolled case with autoComplete and allowFreeform off', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />);
    (wrapper.find('input').instance() as any).value = 'f';
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    (wrapper.find('input').instance() as any).value = '';
    wrapper.find('input').simulate('input', { target: { value: '' } });
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

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

  it('Call onMenuOpened when touch start on the input', () => {
    wrapper = mount(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={returnUndefined} allowFreeform={true} />);
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
      <ComboBox options={DEFAULT_OPTIONS} defaultSelectedKey="1" allowFreeform={true} onPendingValueChanged={pendingValueChangedHandler} />
    );
    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    inputElement.simulate('input', { target: { value: 'f' } });
    inputElement.simulate('keydown', { which: KeyCodes.down });
    inputElement.simulate('keydown', { which: KeyCodes.up });
    expect(indexSeen).toContain(0);
    expect(indexSeen).toContain(1);
  });

  it('Can type a complete option with autocomplete and allowFreeform on and submit it', () => {
    let updatedOption;
    let updatedIndex;
    const onChange = jest.fn((event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => {
      updatedOption = option;
      updatedIndex = index;
    });
    const initialOption = { key: '1', text: 'Text' };

    wrapper = mount(
      <ComboBox
        options={[initialOption]}
        autoComplete="on"
        allowFreeform={true}
        // tslint:disable-next-line:jsx-no-lambda
        onChange={onChange}
      />
    );
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
    domNode = renderIntoDocument(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} calloutProps={{ className: 'foo' }} />);

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
        // tslint:disable-next-line:jsx-no-lambda
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />
    );

    const input = wrapper.find('input');
    (input.instance() as any).value = '';
    input.simulate('input', { target: { value: '' } });
    input.simulate('keydown', { which: KeyCodes.enter });
    wrapper.update();

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
    ReactTestUtils.Simulate.change(buttons[1]);
    ReactTestUtils.Simulate.change(buttons[2]);

    expect((comboBoxRef.current as ComboBox).state.selectedIndices).toEqual([0, 1, 2]);
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
});
