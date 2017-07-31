/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import { KeyCodes } from '../../Utilities';
let { expect } = chai;

import { ComboBox } from './ComboBox';
import { IComboBoxOption } from './ComboBox.Props';

const DEFAULT_OPTIONS: IComboBoxOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' }
];

const DEFAULT_OPTIONS2: IComboBoxOption[] = [
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' }
];

describe('ComboBox', () => {

  it('Can flip between enabled and disabled.', () => {
    let wrapper = mount(
      <ComboBox
        disabled={ false }
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');

    expect(comboBoxRoot.find('.ms-ComboBox.is-disabled').length).equals(0, `shouldn't be disabled`);
    expect(comboBoxRoot.find('[data-is-interactable=true]').length).equals(1, 'data-is-interactable="true"');

    wrapper = mount(
      <ComboBox
        disabled={ true }
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');

    expect(comboBoxRoot.find('.ms-ComboBox.is-disabled').length).equals(1, `should be disabled`);
    expect(comboBoxRoot.find('[data-is-interactable=false]').length).equals(1, 'data-is-interactable="false"');
  });

  it('Renders no selected item in default case', () => {

    let wrapper = mount(
      <ComboBox
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('[role="combobox"]');

    expect(inputElement.text()).equals('');
  });

  it('Renders a selected item in uncontrolled case', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Renders a selected item in controlled case', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        selectedKey='1'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Renders a default value with options', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        value='1'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Renders a default value with no options', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        options={ [] }
        value='1'
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Can change items in uncontrolled case', () => {
    let comboBoxRoot;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    let buttonElement = comboBoxRoot.find('button');
    buttonElement.simulate('click');
    let secondItemElement = wrapper.getDOMNode().ownerDocument.querySelector('.ms-ComboBox-option[data-index="1"]');
    ReactTestUtils.Simulate.click(secondItemElement);
    let inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('2');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        autoComplete='on'
        allowFreeform={ true }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('change', { target: { value: 'f' } });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        autoComplete='on'
        allowFreeform={ false }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('change', { target: { value: 'f' } });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        autoComplete='off'
        allowFreeform={ true }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('change', { target: { value: 'f' } });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('f');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        autoComplete='off'
        allowFreeform={ false }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: 'f' });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('One');
  });

  it('Can change selected option with keyboard', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.down });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('Foo');
  });

  it('Cannot insert text while disabled', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        disabled={ true }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.a });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('One');
  });

  it('Cannot change selected option with keyboard while disabled', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        disabled={ true }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('keydown', { which: KeyCodes.down });
    inputElement = comboBoxRoot.find('input');
    expect(inputElement.props().value).equals('One');
  });

  it('Cannot expand the menu when clicking on the input while disabled', () => {
    let comboBoxRoot;
    let inputElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        disabled={ true }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    inputElement = comboBoxRoot.find('input');
    inputElement.simulate('click');
    expect(comboBoxRoot.find('.is-opened').length).equals(0, `shouldn't be opened`);
  });

  it('Cannot expand the menu when clicking on the button while disabled', () => {
    let comboBoxRoot;
    let buttonElement;
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS2 }
        disabled={ true }
      />);
    comboBoxRoot = wrapper.find('.ms-ComboBox');
    buttonElement = comboBoxRoot.find('button');
    buttonElement.simulate('click');
    expect(comboBoxRoot.find('.is-opened').length).equals(0, `shouldn't be opened`);
  });
});
