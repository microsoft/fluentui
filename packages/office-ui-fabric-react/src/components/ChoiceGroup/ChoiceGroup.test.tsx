/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { ChoiceGroup } from './ChoiceGroup';
import { IChoiceGroupOption } from './ChoiceGroup.Props';

const TEST_OPTIONS: IChoiceGroupOption[] = [
  { key: '1', text: '1', 'data-automation-id': 'auto1' } as IChoiceGroupOption,
  { key: '2', text: '2' },
  { key: '3', text: '3' }
];
const QUERY_SELECTOR: string = '.ms-ChoiceField-input';

describe('ChoiceGroup', () => {

  it('can change options', () => {
    const options: IChoiceGroupOption[] = [
      { key: '1', text: '1' },
      { key: '2', text: '2' },
      { key: '3', text: '3' }
    ];
    let exception;
    let threwException = false;
    let choiceGroup;
    try {
      choiceGroup = ReactTestUtils.renderIntoDocument<ChoiceGroup>(
        <ChoiceGroup
          label='testgroup'
          options={ options }
          required={ true }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(false, 'Choice 1 was true before click');
    expect((choiceOptions[1] as HTMLInputElement).checked).to.be.eq(false, 'Choice 2 was true before click');
    expect((choiceOptions[2] as HTMLInputElement).checked).to.be.eq(false, 'Choice 3 was true before click');

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(true, 'Choice 1 was false after click 1');
    expect((choiceOptions[1] as HTMLInputElement).checked).to.be.eq(false, 'Choice 2 was true after click 1');
    expect((choiceOptions[2] as HTMLInputElement).checked).to.be.eq(false, 'Choice 3 was true after click 1');

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(false, 'Choice 1 was true after click 2');
    expect((choiceOptions[1] as HTMLInputElement).checked).to.be.eq(true, 'Choice 2 was false after click 2');
    expect((choiceOptions[2] as HTMLInputElement).checked).to.be.eq(false, 'Choice 3 was true after click 2');

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(true, 'Choice 1 was false after click 3');
    expect((choiceOptions[1] as HTMLInputElement).checked).to.be.eq(false, 'Choice 2 was true after click 3');
    expect((choiceOptions[2] as HTMLInputElement).checked).to.be.eq(false, 'Choice 3 was true after click 3');
  });

  it('An individual choice option can be disabled', () => {
    const options: IChoiceGroupOption[] = [
      { key: '1', text: '1', disabled: true },
      { key: '2', text: '2' },
      { key: '3', text: '3' }
    ];
    let exception;
    let threwException = false;
    let choiceGroup;
    try {
      choiceGroup = ReactTestUtils.renderIntoDocument<ChoiceGroup>(
        <ChoiceGroup
          label='testgroup'
          options={ options }
          required={ true }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 1 is not disabled');
    expect((choiceOptions[1] as HTMLInputElement).disabled).to.be.eq(false, 'Not disabled option 2 is disabled');
    expect((choiceOptions[2] as HTMLInputElement).disabled).to.be.eq(false, 'Not disabled option 2 is disabled');
  });

  it('renders all choice options as disabled when disabled', () => {
    const options: IChoiceGroupOption[] = [
      { key: '1', text: '1' },
      { key: '2', text: '2' },
      { key: '3', text: '3' }
    ];
    let exception;
    let threwException = false;
    let choiceGroup;
    try {
      choiceGroup = ReactTestUtils.renderIntoDocument<ChoiceGroup>(
        <ChoiceGroup
          label='testgroup'
          options={ options }
          required={ true }
          disabled={ true }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 1 is not disabled');
    expect((choiceOptions[1] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 2 is not disabled');
    expect((choiceOptions[2] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 3 is not disabled');
  });

  it('can act as an uncontrolled component', () => {
    let choiceGroup = ReactTestUtils.renderIntoDocument<ChoiceGroup>(
      <ChoiceGroup
        defaultSelectedKey='1'
        options={ TEST_OPTIONS }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(true, 'Choice 1 was not selected');

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[1] as HTMLInputElement).checked).to.be.eq(true, 'Choice 2 was not selected');
  });

  it('can render as a controlled component', () => {
    let _selectedItem;
    const onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, item: IChoiceGroupOption | undefined): void => {
      _selectedItem = item;
    };

    let choiceGroup = ReactTestUtils.renderIntoDocument<ChoiceGroup>(
      <ChoiceGroup
        selectedKey='1'
        options={ TEST_OPTIONS }
        onChange={ onChange }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(true, 'Choice 1 was not selected');

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[0] as HTMLInputElement).checked).to.be.eq(true, 'Choice 1 was not selected');
    expect((choiceOptions[1] as HTMLInputElement).checked).to.be.eq(false, 'Choice 2 was selected prematurely');

    expect(_selectedItem).to.equal(TEST_OPTIONS[1], 'onChange did not return new item');
  });

  it('extra <input> attributes appear in dom if specified', () => {
    let _selectedItem;
    const onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, item: IChoiceGroupOption | undefined): void => {
      _selectedItem = item;
    };

    const choiceGroup = ReactTestUtils.renderIntoDocument<ChoiceGroup>(
      <ChoiceGroup
        options={ TEST_OPTIONS }
        onChange={ onChange }
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    const choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    const extraAttributeGetter: (index: number) => string | null = (index: number): string | null => {
      const input: HTMLInputElement = choiceOptions[index] as HTMLInputElement;
      return input.getAttribute('data-automation-id');
    };

    expect(extraAttributeGetter(0)).to.be.eq('auto1', 'Specified data attribute did not match');
    expect(extraAttributeGetter(1)).to.be.null;
  });
});
