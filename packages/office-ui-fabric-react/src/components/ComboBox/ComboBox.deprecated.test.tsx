import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import * as WarnUtil from '@uifabric/utilities/lib-commonjs/warn';
import { KeyCodes } from '../../Utilities';

import { ComboBox } from './ComboBox';
import { IComboBox, IComboBoxOption } from './ComboBox.types';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';
import { expectOne, expectMissing } from '../../common/testUtilities';

const DEFAULT_OPTIONS: IComboBoxOption[] = [{ key: '1', text: '1' }, { key: '2', text: '2' }, { key: '3', text: '3' }];

const DEFAULT_OPTIONS2: IComboBoxOption[] = [{ key: '1', text: 'One' }, { key: '2', text: 'Foo' }, { key: '3', text: 'Bar' }];
const DEFAULT_OPTIONS3: IComboBoxOption[] = [
  { key: '0', text: 'Zero', itemType: SelectableOptionMenuItemType.Header },
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' }
];

describe('ComboBox', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    jest.spyOn(WarnUtil, 'warnDeprecations').mockImplementation(() => {
      /** no impl **/
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Renders ComboBox correctly', () => {
    const createNodeMock = (el: React.ReactElement<{}>) => {
      return {
        __events__: {}
      };
    };
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} value={'testValue'} />, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a ComboBox with a Keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a']
    };
    const createNodeMock = (el: React.ReactElement<{}>) => {
      return {
        __events__: {}
      };
    };
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} keytipProps={keytipProps} />, {
      createNodeMock
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Can flip between enabled and disabled.', () => {
    let wrapper = mount(<ComboBox disabled={false} label="testgroup" options={DEFAULT_OPTIONS} />);

    expectMissing(wrapper, '.ms-ComboBox.is-disabled');
    expectOne(wrapper, '[data-is-interactable=true]');

    wrapper = mount(<ComboBox disabled={true} label="testgroup" options={DEFAULT_OPTIONS} />);

    expectOne(wrapper, '.ms-ComboBox.is-disabled');
    expectOne(wrapper, '[data-is-interactable=false]');
  });

  it('Renders no selected item in default case', () => {
    const wrapper = mount(<ComboBox label="testgroup" options={DEFAULT_OPTIONS} />);

    expect(wrapper.find('input[role="combobox"]').text()).toEqual('');
  });

  it('Renders a selected item in uncontrolled case', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any> = comboBoxRoot.find('input');

    expect(inputElement.props().value).toEqual('1');
  });

  it('Renders a selected item in controlled case', () => {
    const wrapper = mount(<ComboBox label="testgroup" selectedKey="1" options={DEFAULT_OPTIONS} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any> = comboBoxRoot.find('input');

    expect(inputElement.props().value).toEqual('1');
  });

  it('New options are not automatically added when allowFreeform on in controlled case', () => {
    let comboBoxRoot;
    let inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any>;
    let comboBoxComponent: any;
    const returnUndefined = (): undefined => {
      return;
    };
    const setRef = (ref: IComboBox): void => {
      comboBoxComponent = ref;
    };

    const wrapper = mount(
      <ComboBox label="testgroup" options={DEFAULT_OPTIONS} allowFreeform={true} onChanged={returnUndefined} componentRef={setRef} />
    );
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('input', { target: { value: 'f' } });
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    expect((comboBoxComponent as React.Component<any, any>).state.currentOptions.length).toEqual(DEFAULT_OPTIONS.length);
  });

  it('New options are automatically added when allowFreeform on in uncontrolled case', () => {
    let comboBoxRoot;
    let inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any>;
    let comboBoxComponent: any;
    const setRef = (ref: IComboBox): void => {
      comboBoxComponent = ref;
    };

    const wrapper = mount(<ComboBox label="testgroup" options={DEFAULT_OPTIONS} allowFreeform={true} componentRef={setRef} />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('input', { target: { value: 'f' } });
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    const currentOptions = (comboBoxComponent as React.Component<any, any>).state.currentOptions;
    expect(currentOptions.length).toEqual(DEFAULT_OPTIONS.length + 1);
    expect(currentOptions[currentOptions.length - 1].text).toEqual('f');
  });

  it('Renders a default value with options', () => {
    const wrapper = mount(<ComboBox label="testgroup" value="1" options={DEFAULT_OPTIONS} />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any> = comboBoxRoot.find('input');

    expect(inputElement.props().value).toEqual('1');
  });

  it('Renders a default value with no options', () => {
    const wrapper = mount(<ComboBox label="testgroup" options={[]} value="1" />);
    const comboBoxRoot = wrapper.find('.ms-ComboBox');
    const inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any> = comboBoxRoot.find('input');

    expect(inputElement.props().value).toEqual('1');
  });

  it('Can change items in uncontrolled case', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

    // Manually assign `offsetParent` and `scrollIntoView` since it doesn't exist without DOM
    const el = document.createElement('div') as Element;
    el.scrollIntoView = () => null;
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', { get: () => el });

    const buttonElement = wrapper.find('button');
    buttonElement.simulate('click');
    const secondItemElement: Element = wrapper.getDOMNode().ownerDocument.querySelector('.ms-ComboBox-option[data-index="1"]')!;

    ReactTestUtils.Simulate.click(secondItemElement);

    wrapper.update();

    const inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any> = wrapper.find('input');
    expect(inputElement.props().value).toEqual('2');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    const wrapper = mount(
      <ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />
    );

    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    const wrapper = mount(
      <ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />
    );

    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    const wrapper = mount(
      <ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />
    );
    wrapper.find('input').simulate('input', { target: { value: 'f' } });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('f');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    const wrapper = mount(
      <ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />
    );
    wrapper.find('input').simulate('keydown', { which: 'f' });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can change selected option with keyboard', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Foo');
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Bar');
  });

  it('Can change selected option with keyboard, looping from bottom to top', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="3" options={DEFAULT_OPTIONS2} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS3} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.up });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('Bar');
  });

  it('Cannot insert text while disabled', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.a });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Cannot change selected option with keyboard while disabled', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.down });
    wrapper.update();
    expect(wrapper.find('input').props().value).toEqual('One');
  });

  it('Cannot expand the menu when clicking on the input while disabled', () => {
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    wrapper.find('input').simulate('click');
    expect(wrapper.find('.is-opened').length).toEqual(0);
  });

  it('Cannot expand the menu when clicking on the button while disabled', () => {
    let comboBoxRoot;
    let buttonElement;
    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    buttonElement = comboBoxRoot.find('button');
    buttonElement.simulate('click');
    expect(comboBoxRoot.find('.is-opened').length).toEqual(0);
  });

  it('Call onMenuOpened when clicking on the button', () => {
    let comboBoxRoot;
    let buttonElement;
    const returnUndefined = jest.fn();

    const wrapper = mount(<ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={returnUndefined} />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    buttonElement = comboBoxRoot.find('button');
    buttonElement.simulate('click');
    expect(returnUndefined.mock.calls.length).toBe(1);
  });

  it('Call onMenuOpened when touch start on the input', () => {
    let comboBoxRoot;
    let inputElement;
    const returnUndefined = jest.fn();

    const wrapper = mount(
      <ComboBox label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={returnUndefined} allowFreeform={true} />
    );
    comboBoxRoot = wrapper.find('.ms-ComboBox');

    inputElement = comboBoxRoot.find('input');

    // in a normal scenario, when we do a touchstart we would also cause a
    // click event to fire. This doesn't happen in the simulator so we're
    // manually adding this in.
    inputElement.simulate('touchstart');
    inputElement.simulate('click');

    expect(wrapper.find('.is-open').length).toEqual(1);
  });

  it('Can type a complete option with autocomplete and allowFreeform on and submit it', () => {
    let updatedOption;
    let updatedIndex;
    let executionCount = 0;
    const initialOption = { key: '1', text: 'Text' };

    let comboBoxRoot;
    let inputElement: ReactWrapper<React.InputHTMLAttributes<any>, any>;
    const wrapper = mount(
      <ComboBox
        label="testgroup"
        options={[initialOption]}
        autoComplete="on"
        allowFreeform={true}
        // tslint:disable-next-line:jsx-no-lambda
        onChanged={(option?: IComboBoxOption, index?: number) => {
          updatedOption = option;
          updatedIndex = index;
          executionCount++;
        }}
      />
    );
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('input', { target: { value: 't' } });
    inputElement.simulate('input', { target: { value: 'e' } });
    inputElement.simulate('input', { target: { value: 'x' } });
    inputElement.simulate('input', { target: { value: 't' } });
    inputElement.simulate('keydown', { which: KeyCodes.enter });
    expect(executionCount).toEqual(1);
    expect(updatedOption).toEqual(initialOption);
    expect(updatedIndex).toEqual(0);

    wrapper.update();
    expect(wrapper.find('.ms-ComboBox input').props().value).toEqual('Text');
  });

  it('merges callout classNames', () => {
    ReactTestUtils.renderIntoDocument<ComboBox>(<ComboBox options={DEFAULT_OPTIONS} calloutProps={{ className: 'foo' }} />);

    setTimeout(() => {
      const callout = document.querySelector('.ms-Callout') as HTMLElement;
      expect(callout).toBeDefined();
      expect(callout.classList.contains('ms-ComboBox-callout')).toBeTruthy();
      expect(callout.classList.contains('foo')).toBeTruthy();
    }, 0);
  });
});
