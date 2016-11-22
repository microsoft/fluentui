/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { ChoiceGroup } from './ChoiceGroup';
import { IChoiceGroupOption } from './ChoiceGroup.props';

describe('ChoiceGroup', () => {

  it('Can change options.', () => {
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
    let choiceOptions = renderedDOM.querySelectorAll('.ms-ChoiceField-input');

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
    let choiceOptions = renderedDOM.querySelectorAll('.ms-ChoiceField-input');

    expect((choiceOptions[0] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 1 is not disabled');
    expect((choiceOptions[1] as HTMLInputElement).disabled).to.be.eq(false, 'Not disabled option 2 is disabled');
    expect((choiceOptions[2] as HTMLInputElement).disabled).to.be.eq(false, 'Not disabled option 2 is disabled');
  });

  it('When choicegroup is disabled all choice options are disabled', () => {
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
    let choiceOptions = renderedDOM.querySelectorAll('.ms-ChoiceField-input');

    expect((choiceOptions[0] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 1 is not disabled');
    expect((choiceOptions[1] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 2 is not disabled');
    expect((choiceOptions[2] as HTMLInputElement).disabled).to.be.eq(true, 'Disabled option 3 is not disabled');
  });

});
