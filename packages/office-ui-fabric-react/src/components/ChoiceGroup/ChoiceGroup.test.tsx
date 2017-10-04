/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-dom/test-utils';

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
    expect(threwException).toEqual(false);

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);
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
    expect(threwException).toEqual(false);

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).disabled).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).disabled).toEqual(false);
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
    expect(threwException).toEqual(false);

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let choiceOptions = renderedDOM.querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[2] as HTMLInputElement).disabled).toEqual(true);
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

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(true);
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

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);

    expect(_selectedItem).toEqual(TEST_OPTIONS[1]);
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

    expect(extraAttributeGetter(0)).toEqual('auto1');
    expect(extraAttributeGetter(1)).toBeNull();
  });
});
